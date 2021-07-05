import Checkout from "../components/pagescontainers/Checkout";
import { useShoppingCartContext } from "../context/ShoppingCartContext";

const CheckOut = () => {
  const ShoppingCartContext = useShoppingCartContext();
  const products = ShoppingCartContext.shoppingCart;

  const onCheckout = async (personalInfo) => {
    const result = {
      personalInfo,
      products,
    };
    const response = await fetch("api/add-order", {
      method: "POST",
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };
  return <Checkout onCheckout={(personalInfo) => onCheckout(personalInfo)} />;
};

export default CheckOut;
