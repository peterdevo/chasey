import OrderCard from "../reused/OrderCard";
import Header from "../containers/Header";
import TotalPrice from "../reused/TotalPrice";
import PersonalInfoForm from "../containers/PersonalInfoForm";
import classes from "./Checkout.module.scss";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";

const header = {
  includeRegistered: false,
  path: "/",
};

const CheckOut = ({onCheckout}) => {
  const shoppingCartContext = useShoppingCartContext();

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

  const handleCheckout = (personalInformation): void => {
    onCheckout(personalInformation)
  };
  return (
    <div className={classes.checkout}>
      <Header header={header} />
      <div className={classes.checkoutBody}>
        <h2>My order</h2>
        {display()}
        <div>
          <TotalPrice
            totalPrice={shoppingCartContext.totalPriceAndAmount.totalprice}
          />
          <PersonalInfoForm
            checkoutOrder={(personInformation) =>
              handleCheckout(personInformation)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
