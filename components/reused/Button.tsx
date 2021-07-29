import classes from "./Button.module.scss";

interface Iprops{
  children:any,
  type?:"button" | "submit" | "reset",
  onClick?:(e)=>void,
  buttonStyle:any
}
const Button = ({ children, type, onClick, buttonStyle }:Iprops) => {
  const checkButtonStyle = (value) => {
    if (value === "delete") {
      return classes.delete;
    } else if (value === "confirm") {
      return classes.confirm;
    } else if (value === "auth") {
      return classes.auth;
    }
  };

  return (
    <button
      className={checkButtonStyle(buttonStyle)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
