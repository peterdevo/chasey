import Footer from "../components/reused/Footer";
import classes from "./LayoutAccount.module.scss";
import AccountHeader from "../components/containers/AccountHeader";
import ProfileHead from "../components/containers/ProfileHead";
import AccountLists from "../components/containers/AccountLists";
import {IoExitOutline} from "react-icons/io5"
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";

const LayoutAccount = ({ children }) => {
const route=useRouter()
  const logOut=()=>{
    signOut({callbackUrl:"http://localhost:3000/"})
   
  }
  return (
    <div className={classes.layoutAccount}>
      <AccountHeader route={()=>route.back()} />
      <section>
        <div className={classes.leftNav}>
          <ProfileHead />
          <AccountLists />
          <div className={classes.exist} onClick={logOut}><IoExitOutline className={classes.existIcon} size={35}/><span>Logout</span></div>
        </div>
        <main>{children}</main>

      </section>
      <Footer />
    </div>
  );
};

export default LayoutAccount;
