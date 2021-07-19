import classes from "./AccountHeader.module.scss";
import BackwardArrow from "../reused/BackwardArrow";

const AccountHeader = ({route}) => {
  return (
    <div className={classes.accountHeader}>
      <BackwardArrow route={route}/>
      <div></div>
    </div>
  );
};

export default AccountHeader;
