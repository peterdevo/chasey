import classes from "./TotalPrice.module.scss"

interface IProps{
  totalPrice:number
}
const TotalPrice = ({totalPrice}:IProps) => {
  return (
    <div className={classes.totalPrice}>
      <div>Total Price:</div>
      <div>{totalPrice}$</div>
    </div>
  );
};

export default TotalPrice