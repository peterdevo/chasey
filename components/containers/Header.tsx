import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./Header.module.scss";
import { IoIosArrowRoundBack } from "react-icons/io";

interface IHeader {
  header: { includeRegistered: boolean, path: string };
}

const Header = ({ header}:IHeader) => {
  const router = useRouter();
  return (
    <div className={classes.header}>
      <div className={classes.backwardlogo}>
        <IoIosArrowRoundBack
          size={20}
          className={classes.backward}
          color="gray"
          onClick={() => router.push(header.path)}
        />
        <span>Chasey</span>
      </div>
      <div
        className={header.includeRegistered ? classes.registered : classes.invisible}
      >
        Not a member?<Link href="/signup-page">Register now</Link>
      </div>
    </div>
  );
};

export default Header;
