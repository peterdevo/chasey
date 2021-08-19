import classes from "./CompletedMessage.module.scss"
import {ImCancelCircle} from "react-icons/im"
const CompletedMessage = ({message,Onhide}) => {
  return <div className={classes.updatedMessage} >
      <p>{message}</p>
      <ImCancelCircle onClick={Onhide} size={25} style={{cursor:"pointer"}}/>

  </div>;
};

export default CompletedMessage;
