import classes from "./SuccessMessage.module.scss";

const SuccessMessage = ({ children }) => {
  return (
    <div className={classes.successMessage}>
      <div className={classes.message}>
       <h4> Successful...</h4><br></br>
        <div>
        {children}
        </div>
      </div>
    </div>
  );
};
export default SuccessMessage;
