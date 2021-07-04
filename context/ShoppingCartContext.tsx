import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const ShoppingCartContext = createContext(undefined);
interface IState {
  shoppingCart: {
    image: string;
    amount: number;
    title: string;
    price: number;
  }[];
}

interface ITotalPriceAndAmount{
  totalprice:number,
  totaAmount:number,
}

export const ShoppingCartWrapper = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState<IState["shoppingCart"]>([]);
  const [totalPriceAndAmount,setTotalPriceAndAmount]=useState<ITotalPriceAndAmount>({totalprice:0,totaAmount:0});
  
  useEffect(() => {
    let amount:number=0;
    const totalPriceResult:number = shoppingCart.reduce((acc, currentValue) => {
      amount+=currentValue.amount;
      return acc + currentValue.price * currentValue.amount;
    }, 0);

    setTotalPriceAndAmount({totalprice:totalPriceResult,totaAmount:amount})
  }, [shoppingCart]);

  
  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCart, setShoppingCart,totalPriceAndAmount }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};
