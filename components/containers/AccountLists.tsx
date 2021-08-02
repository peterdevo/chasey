import Link from "next/link";
import classes from "./AccountLists.module.scss";
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";
import { BsBag } from "react-icons/bs";
import { useSession } from "next-auth/client";

interface IProps {
  deActivate?: () => void;
}

const AccountList = ({ deActivate }: IProps) => {
  const [session] = useSession();
  return (
    <ul className={classes.accountList}>
      <li onClick={deActivate}>
        <IoPersonOutline size={30} color="rgb(54, 54, 54)" />
        <Link href={`/account/myInformation/${session && session.userId}`}>
          <a>My information</a>
        </Link>
      </li>
      <li onClick={deActivate}>
        <IoLocationOutline size={30} color="rgb(54, 54, 54)" />
        <Link href={`/account/addressBook/${session && session.userId}`}>
          <a>Address book</a>
        </Link>
      </li>
      <li onClick={deActivate}>
        <BsBag size={30} color="rgb(54, 54, 54)" />
        <Link href={`/account/myOrders/${session && session.userId}`}>
          <a>My orders</a>
        </Link>
      </li>
      <li onClick={deActivate}>
        <RiArrowGoBackLine size={30} color="rgb(54, 54, 54)" />
        <Link href={`/`}>
          <a>Back to homepage</a>
        </Link>
      </li>
    </ul>
  );
};

export default AccountList;
