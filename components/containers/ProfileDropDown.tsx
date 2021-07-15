import Link from "next/dist/client/link";
import classes from "./ProfileDropDown.module.scss";
const ProfileDropDown = ({ handleSignout }) => {
  return (
    <>
      <ul className={classes.profileDropDown}>
        <li>
          <Link href="profile-page">My profile</Link>
        </li>
        <li>
          <Link href="order-page">My order</Link>
        </li>

        <li onClick={handleSignout}>Logout</li>
      </ul>
    </>
  );
};

export default ProfileDropDown;
