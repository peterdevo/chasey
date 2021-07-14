import { useState } from "react";
import Link from "next/link";
import NavBar from "../single-use/NavBar";
import ShoppingCart from "./ShoppingCart";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import classes from "./MainHeader.module.scss";
import { IoPersonOutline } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";

interface IProps {
  isSession: boolean;
  handleSignout:()=>void
}
const Header = ({ isSession,handleSignout }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginVisiblity, setLoginVisibility] = useState(false);

  const shoppingCartContext = useShoppingCartContext();

  const handleShoppingCartVisibility = (): void => {
    setIsVisible(!isVisible);
  };
  const handleProfileIconVisiblity = (): void => {
    setLoginVisibility(!loginVisiblity);
  };

  return (
    <div className={classes.mainHeader}>
      <NavBar />
      <div className={classes.logo}>Chasey</div>
      <div className={classes.iconContainer}>
        <div>
          {loginVisiblity &&
            (isSession ? (
              <p onClick={handleSignout}>Logout</p>
            ) : (
              <p>
                <Link href="../signin-page">Login/New member?</Link>
              </p>
            ))}
        </div>
        <IoPersonOutline
          size={20}
          className={classes.icon}
          color="gray"
          onClick={handleProfileIconVisiblity}
        />
        <div>
          <RiShoppingCartLine
            size={20}
            className={classes.icon}
            color="gray"
            onClick={handleShoppingCartVisibility}
          />
          {shoppingCartContext.totalPriceAndAmount.totaAmount > 0 && (
            <span>{shoppingCartContext.totalPriceAndAmount.totaAmount}</span>
          )}
        </div>
      </div>
      <ShoppingCart
        isVisible={
          shoppingCartContext.totalPriceAndAmount.totaAmount > 0 && isVisible
        }
      />
    </div>
  );
};

export default Header;
