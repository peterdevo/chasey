import { useState } from "react";
import classes from "./NavBar.module.scss";

const NavBar = ({ children, handleActiveLinks, isActive }) => {
  return (
    <>
      <div onClick={handleActiveLinks} className={classes.burger}>
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
        <div className={classes.line3}></div>
      </div>
      <ul
        className={isActive ? classes.sidePageActive : classes.sidePageDeactive}
      >
        {children}
      </ul>
    </>
  );
};

export default NavBar;
