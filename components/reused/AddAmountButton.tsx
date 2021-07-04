import classes from "./AddAmountButton.module.scss";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";

interface IProps{
  amount:number,
  handleAdd:()=>void,
  handleMinus:()=>void

}
const AddAmountButton = ({ amount,handleAdd,handleMinus }:IProps) => {
  return (
    <div className={classes.addAmountButton}>
      <BiMinus size={22} color="#00A551" style={{ cursor: "pointer" }} onClick={handleMinus} />
      {amount}
      <BsPlus size={22} color="#00A551" style={{ cursor: "pointer" }} onClick={handleAdd} />
    </div>
  );
};

export default AddAmountButton;
