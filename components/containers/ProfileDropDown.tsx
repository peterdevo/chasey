import Link from "next/dist/client/link";
import classes from "./ProfileDropDown.module.scss";
import {useSession} from "next-auth/client"

interface IProps {
  name: string;
  handleSignout: () => void;
}
const ProfileDropDown = ({ name, handleSignout }: IProps) => {
  const [session]=useSession();
  return (
    <>
      <ul className={classes.profileDropDown}>
        <div>
          Hi,<span>{name}!</span>
        </div>

        <li>
          <Link href={`/account/myInformation/${session&&session.userId}`}>My profile</Link>
        </li>
        <li>
          <Link href={`/account/myOrders/${session&&session.userId}`}>My orders</Link>
        </li>

        <li onClick={handleSignout}>Logout</li>
      </ul>
    </>
  );
};

export default ProfileDropDown;
