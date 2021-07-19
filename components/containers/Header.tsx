import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./Header.module.scss";
import BackwardArrow from "../reused/BackwardArrow"

interface IHeader {
  header: { includeRegistered: boolean, path: string };
}

const Header = ({ header}:IHeader) => {
  const router = useRouter();
  return (
    <div className={classes.header}>
      <BackwardArrow route={() => router.push(header.path)}/>
      <div
        className={header.includeRegistered ? classes.registered : classes.invisible}
      >
        Not a member?<Link href="/signup-page">Register now</Link>
      </div>
    </div>
  );
};

export default Header;
