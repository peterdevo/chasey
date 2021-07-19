import Image from "next/image";
import classes from "./ProfileHead.module.scss";
import profile from "/public/profile.jpg";
import { useSession } from "next-auth/client";
const ProfileHead = () => {
  const [session, loading] = useSession();
  return (
    <div className={classes.profileHead}>
      <div className={classes.imageFrame}>
        <Image src={profile} alt="User image" />
      </div>
      Hi
      <div>{session && session.user.name}</div>
    </div>
  );
};

export default ProfileHead;
