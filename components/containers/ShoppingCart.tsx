import classes from "../containers/ShoppingCart.module.scss";
import { useRouter } from "next/router";
import OrderCard from "../reused/OrderCard";
import Button from "../reused/Button";
import TotalPrice from "../reused/TotalPrice";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { v4 as uuidv4 } from 'uuid';

interface IProps{
  isVisible:boolean
  name:string
}
const ShoppingCart = ({ isVisible,name}:IProps) => {
  const route = useRouter();

  const navigateToCheckout = (): void => {
    route.push("/checkout-page");
  };
  const handleDelete = (index: number): void => {
   console.log(index)
    const result=shoppingCartContext.shoppingCart.filter((order,i:number)=>index!==i)
    shoppingCartContext.setShoppingCart([...result])
  };

  const shoppingCartContext = useShoppingCartContext();

  const displayOrderCart = (): JSX.Element => {
    return shoppingCartContext.shoppingCart.map((order,index:number) => (
      <OrderCard
        key={uuidv4()}
        order={order}
        cardSize={"small"}
        handleDelete={() => handleDelete(index)}
      />
    ));
  };

  return (
    <div
      className={
        isVisible ? classes.shoppingCart : classes.invisibleShoppingCart
      }
    >
      <div className={classes.profile}>
        <div className={classes.profileFrame}>
          <img
            src="https://source.unsplash.com/2LowviVHZ-E/200x200"
            width={50}
            height={50}
          />
        </div>
        <div>{name}</div>
      </div>
      <div className={classes.orderSection}>
        <h2>My order</h2>
        {displayOrderCart()}
      </div>
      <div className={classes.shipping}>
        <div>Diliver 30-45 mins</div>
        <div>5$</div>
      </div>
      <TotalPrice
        totalPrice={shoppingCartContext.totalPriceAndAmount.totalprice}
      />
      <div className={classes.checkOut}>
        <Button buttonStyle={"confirm"} onClick={navigateToCheckout}>
          Check out
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
