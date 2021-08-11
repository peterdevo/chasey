import Checkout from "../../components/pagescontainers/Checkout";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import User from "../../models/UserDetail";
import dbConnect from "../../utils/config";
import { checkoutOrderSchema } from "../../validationSchemas/checkoutOrder";
import SuccessMessage from "../../components/reused/SuccessMessage";
import { RiArrowGoBackLine } from "react-icons/ri";

const CheckOut = ({ userData }) => {
  const ShoppingCartContext = useShoppingCartContext();
  const products = ShoppingCartContext.shoppingCart;
  const [errorMessage, setErrorMessage] = useState("");
  const [isSucess, setIsSuccess] = useState(false);
  const route = useRouter();
  const onCheckout = async (personalInfo) => {
    try {
      const postData = async () => {
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
        };

        await checkoutOrderSchema.validate(order);

        const response = await fetch("/api/add-order", {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "Application/json",
          },
        });

        return response.json();
      };

      const data = await postData();

      if (data.errors) {
        setErrorMessage(data.errors[0]);
      } else {
        setIsSuccess(true);
        ShoppingCartContext.setShoppingCart([]);
        ShoppingCartContext.setTotalPriceAndAmount({
          totalprice: 0,
          totaAmount: 0,
        });
      }
    } catch (error) {
      setErrorMessage(error.errors[0]);
    }
  };
  return (
    <div>
      {isSucess && (
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
              <RiArrowGoBackLine size={20} style={{marginRight:"5px"}} /> Back Home
            </div>
          </div>
        </SuccessMessage>
      )}
      <Checkout
        errorMessage={errorMessage}
        userData={userData}
        onCheckout={(personalInfo) => onCheckout(personalInfo)}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let response = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
  };

  if (context.params.id !== "guest") {
    dbConnect();
    response = await User.findById(context.params.id);
  }

  return {
    props: {
      userData: {
        userId: response._id.toString(),
        email: response.email,
        name: response.firstName,
        phone: response.phone,
        city: response.address.street,
        street: response.address.city,
        zipCode: response.address.zipCode,
      },
    },
    revalidate: 2,
  };
};

export default CheckOut;
