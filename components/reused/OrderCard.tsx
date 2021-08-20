import Button from "./Button";
import classses from "./OrderCard.module.scss"
import { OrderType } from "../../typesVariants/Types";

interface IProps{
  order:OrderType,
  cardSize:string,
  handleDelete:()=>void
}

const OrderCard = ({order,cardSize,handleDelete}:IProps) => {
  const checkCardSize=cardSize==="small"?classses.orderCard:classses.resizable
  return (
    <div className={checkCardSize}>
      <img src={order.image} alt="image" width={60} height={60}/>
      <div>{order.amount}</div>
      <div>{order.title}</div>
      <div>{order.price}$</div>
      <Button buttonStyle={"delete"} onClick={handleDelete} >Delete</Button>
    </div>
  );
};

export default OrderCard;
