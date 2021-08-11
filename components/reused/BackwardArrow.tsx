import { IoIosArrowRoundBack } from "react-icons/io";
import classes from "./BackwardArrow.module.scss";
const BackwardArrow=({route})=>{
    return (
        <div className={classes.backwardlogo}>
        <IoIosArrowRoundBack
          size={20}
          className={classes.backward}
          color="gray"
          onClick={route}
        />
      
      </div>
    )
}
export default BackwardArrow