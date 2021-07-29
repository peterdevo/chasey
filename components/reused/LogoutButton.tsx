import { IoExitOutline } from "react-icons/io5";
import classes from "./LogoutButton.module.scss"

const LogoutButton=({logOut})=>{
    return  <div className={classes.exist} onClick={logOut}>
    <IoExitOutline className={classes.existIcon} size={35} />
    <span>Logout</span>
  </div>
}

export default LogoutButton