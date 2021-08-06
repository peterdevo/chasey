import classes from "./ErrorMessage.module.scss";
const ErrorMessage = ({ message }) => {
  return <div className={classes.errorMessage}>{message}</div>;
};

export default ErrorMessage;
