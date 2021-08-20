import Image from "next/image";
import classes from "./ProfileHead.module.scss";
import profile from "/public/profile.jpg";
import { useSession } from "next-auth/client";
const ProfileHead = () => {
  const [session, loading] = useSession();
  return (
    <div className={classes.profileHead}>
      <div className={classes.imageFrame}>
        <div className={classes.withinframe}>
        <Image src={profile} alt="User image" height="100%" width="100%"    />
        </div>
      </div>
      Hi
      <div>{session && session.user.name}</div>
    </div>
  );
};

export default ProfileHead;
