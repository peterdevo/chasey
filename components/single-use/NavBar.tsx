import { useState } from "react";
import classes from "./NavBar.module.scss";

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleActiveLinks = ():void => {
    setIsActive(!isActive);
  };
  return (
    <>
      <div onClick={handleActiveLinks} className={classes.burger}>
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
        <div className={classes.line3}></div>
      </div>

      <ul className={isActive ? classes.sidePageActive : classes.sidePageDeactive}>
        <li className={classes.listStyle}>Home</li>
        <li className={classes.listStyle}>Help center</li>
        <li className={classes.listStyle}>About</li>
      </ul>
    </>
  );
};

export default NavBar;
