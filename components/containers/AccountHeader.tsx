import classes from "./AccountHeader.module.scss";
import BackwardArrow from "../reused/BackwardArrow";
import NavBar from "../single-use/NavBar";
import AccountList from "./AccountLists";
import LogoutButton from "../reused/LogoutButton";
import { useState } from "react";
import { signOut } from "next-auth/client";

const AccountHeader = ({ route }) => {
  const [isActive,setIsactive]=useState(false)

  const handleActiveLinks=()=>{
    setIsactive(!isActive)
  }
  return (
    <div className={classes.accountHeader}>
      <div className={classes.navBar}>
        <NavBar handleActiveLinks={handleActiveLinks} isActive={isActive}>
          <AccountList deActivate={()=>setIsactive(!isActive)}/>
          <LogoutButton logOut={()=>signOut({callbackUrl:"http://localhost:3000/"})}/>
        </NavBar>
      
      </div>
      <BackwardArrow route={route} />
    </div>
  );
};

export default AccountHeader;
