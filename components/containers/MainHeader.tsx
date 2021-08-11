import { useState } from "react";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import ProfileDropDown from "./ProfileDropDown";
import classes from "./MainHeader.module.scss";
import { IoPersonOutline } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import {useRouter} from "next/router"

interface IProps {
  isSession: boolean;
  name: string;
  handleSignout: () => void;
}
const Header = ({ isSession, name, handleSignout }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginVisiblity, setLoginVisibility] = useState(false);
  const shoppingCartContext = useShoppingCartContext();
  const route=useRouter()
  const handleShoppingCartVisibility = (): void => {
    setIsVisible(!isVisible);
  };
  const handleProfileIconVisiblity = (): void => {
    setLoginVisibility(!loginVisiblity);
  };

  return (
    <div className={classes.mainHeader}>
      <div className={classes.logo} onClick={()=>route.push("/")}>
        <img src="logo.jpg" height="80px" width="80px" />
      </div>
      <div className={classes.iconContainer}>
        {loginVisiblity && (
          <>
            {isSession ? (
              <div
                style={{ bottom: "-180px" }}
                className={classes.loginDropDown}
              >
                <ProfileDropDown name={name} handleSignout={handleSignout} />
              </div>
            ) : (
              <div className={classes.loginDropDown}>
                <Link href="../signin-page">Login/New member?</Link>
              </div>
            )}
          </>
        )}

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
            <p>{shoppingCartContext.totalPriceAndAmount.totaAmount}</p>
          )}
        </div>
      </div>
      <ShoppingCart
        name={name}
        isVisible={
          shoppingCartContext.totalPriceAndAmount.totaAmount > 0 && isVisible
        }
      />
    </div>
  );
};

export default Header;
