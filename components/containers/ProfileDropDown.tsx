import Link from "next/dist/client/link";
import classes from "./ProfileDropDown.module.scss";

interface IProps {
  name: string;
  handleSignout: () => void;
}
const ProfileDropDown = ({ name, handleSignout }: IProps) => {
  return (
    <>
      <ul className={classes.profileDropDown}>
        <div>
          Hi,<span>{name}!</span>
        </div>

        <li>
          <Link href="/account-page/myInformation">My profile</Link>
        </li>
        <li>
          <Link href="/account-page/myOrders">My order</Link>
        </li>

        <li onClick={handleSignout}>Logout</li>
      </ul>
    </>
  );
};

export default ProfileDropDown;
