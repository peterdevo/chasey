import Footer from "../components/reused/Footer";
import classes from "./LayoutAccount.module.scss";
import AccountHeader from "../components/containers/AccountHeader";
import ProfileHead from "../components/containers/ProfileHead";
import AccountLists from "../components/containers/AccountLists";
import LogoutButton from "../components/reused/LogoutButton";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";

const LayoutAccount = ({ children }) => {
  const route = useRouter();
  const logOut = () => {
    signOut({ callbackUrl: "http://localhost:3000/" });
  };
  return (
    <div className={classes.layoutAccount}>
      <AccountHeader route={() => route.back()} />
      <section>
        <div className={classes.leftNav}>
          <ProfileHead />
          <AccountLists/>
         <LogoutButton logOut={logOut}/>
        </div>
        <main>{children}</main>
      </section>
      <Footer />
    </div>
  );
};

export default LayoutAccount;
