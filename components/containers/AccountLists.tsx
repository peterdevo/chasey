import Link from "next/link";
import classes from "./AccountLists.module.scss";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { BsBag } from "react-icons/bs";

const AccountList = () => {
  return (
    <ul className={classes.accountList}>
      <li >
        <IoPersonOutline size={30} color="rgb(54, 54, 54)"  />
        <Link href="/account-page/myInformation">
          <a>My information</a>
        </Link>
      </li>
      <li >
        <AiOutlineHome size={30} color="rgb(54, 54, 54)" />
        <Link href="/account-page/addressBook">
          <a>Address book</a>
        </Link>
      </li>
      <li >
        <BsBag size={30} color="rgb(54, 54, 54)"/>
        <Link href="/account-page/myOrders">
          <a>My orders</a>
        </Link>
      </li>
    </ul>
  );
};

export default AccountList;
