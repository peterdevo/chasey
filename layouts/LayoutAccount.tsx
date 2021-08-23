import Footer from "../components/reused/Footer";
import { useEffect, useState } from "react";
import classes from "./LayoutAccount.module.scss";
import AccountHeader from "../components/containers/AccountHeader";
import ProfileHead from "../components/containers/ProfileHead";
import AccountLists from "../components/containers/AccountLists";
import LogoutButton from "../components/reused/LogoutButton";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";

const LayoutAccount = ({ children }) => {
  const route = useRouter();
  const [isAuthorized, setAuthorized] = useState(false);
  const [loading,setLoading]=useState(false)
  const logOut = () => {
    let hostname=""
    if (typeof window !== 'undefined') {
      hostname = window.location.hostname;
   }
    signOut({ callbackUrl: `http://${hostname}/` });
  };
  useEffect(() => {
    const getData = async () => {
      const fetchData = async () => {
        const res = await fetch("/api/helper");
        const result = await res.json();
        return result;
      };
      const data = await fetchData();
      setAuthorized(data.isAuthorized);
      setLoading(true)

    };
    getData();
  }, []);
  
  return (
    <>
      {loading?isAuthorized?
        <div className={classes.layoutAccount}>
          <AccountHeader route={() => route.back()} />
          <section>
            <div className={classes.leftNav}>
              <ProfileHead />
              <AccountLists />
              <LogoutButton logOut={logOut} />
            </div>
            <main>{children}</main>
          </section>
          <Footer />
        </div>:<div>Unauthorized</div>:null
      }
    </>
  );
};

export default LayoutAccount;
