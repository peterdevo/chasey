import OrderCard from "../reused/OrderCard";
import Header from "../containers/Header";
import { RiArrowGoBackLine } from "react-icons/ri";
import TotalPrice from "../reused/TotalPrice";
import PersonalInfoForm from "../containers/PersonalInfoForm";
import { checkoutOrderSchema } from "../../validationSchemas/checkoutOrder";
import { useState } from "react";
import classes from "./Checkout.module.scss";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import SuccessMessage from "../reused/SuccessMessage";
import { useRouter } from "next/router";
import Loader from "../reused/Loader";

const header = {
  includeRegistered: false,
  path: "/",
};

const CheckOut = ({ userData }) => {
  const shoppingCartContext = useShoppingCartContext();
  const products = shoppingCartContext.shoppingCart;
  const [errorMessage, setErrorMessage] = useState("");
  const [isSucess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const handleDelete = (index: number): void => {
    const result = shoppingCartContext.shoppingCart.filter(
      (order, i: number) => i !== index
    );
    shoppingCartContext.setShoppingCart([...result]);
  };

  const display = (): JSX.Element => {
    return shoppingCartContext.shoppingCart.map((order, index: number) => (
      <OrderCard
        key={order.id}
        order={order}
        cardSize={"resizable"}
        handleDelete={() => handleDelete(index)}
      />
    ));
  };

  const submitPayment = async () => {
    const sessionResponse = await fetch("/api/checkout-session", {
      method: "POST",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const { clientSecret } = await sessionResponse.json();

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      return setErrorMessage(payload.error.message);
    }
    setIsLoading(true);
    return true;
  };

  const submitOrder = async (personalInfo) => {
    const order = {
      personalInfo: {
        name: personalInfo.name,
        email: personalInfo.email,
        phone: personalInfo.phone,
        address: {
          city: personalInfo.city,
          street: personalInfo.street,
          zipCode: personalInfo.zipCode,
        },
        userId: personalInfo.userId,
      },
      products,
      totalPaid:shoppingCartContext.totalPriceAndAmount.totalprice
    };

    const validatedOrder = await checkoutOrderSchema.validate(order);

    const isPaid = await submitPayment();

    if (isPaid) {
      const response = await fetch("/api/add-order", {
        method: "POST",
        body: JSON.stringify(validatedOrder),
        headers: {
          "Content-Type": "Application/json",
        },
      });

      return response.json();
    }
  };

  const handleCheckout = async (personalInformation) => {
   
    try {
      const data = await submitOrder(personalInformation);
      if (data) {
        if (data.errors) {
          setErrorMessage(data.errors[0]);
        } else {
          setIsLoading(false);
          setIsSuccess(true);
          shoppingCartContext.setShoppingCart([]);
          shoppingCartContext.setTotalPriceAndAmount({
            totalprice: 0,
            totaAmount: 0,
          });
        }
      }
    } catch (err) {
      setErrorMessage(err.errors[0]);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {isSucess ? (
        <SuccessMessage>
          <div>
            <div>Thank you for your order!</div>
            <div
              style={{
                marginTop: "10px",
                color: "black",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => route.push("/")}
            >
              <RiArrowGoBackLine size={20} style={{ marginRight: "5px" }} />{" "}
              Back Home
            </div>
          </div>
        </SuccessMessage>
      ) : (
        <div className={classes.checkout}>
          <Header header={header} />
          <div className={classes.checkoutBody}>
            <h2>My orders</h2>
            {display()}
            <div>
              <TotalPrice
                totalPrice={shoppingCartContext.totalPriceAndAmount.totalprice}
              />
              <PersonalInfoForm
                errorMessage={errorMessage}
                userData={userData}
                checkoutOrder={(personInformation) =>
                  handleCheckout(personInformation)
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOut;
