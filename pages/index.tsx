import MainHeader from "../components/containers/MainHeader";
import Categories from "../components/containers/Categories";
import Menus from "../components/containers/Menus";
import dbConnect from "../utils/config";
import Product from "../models/ProductDetail";
import { signOut, useSession } from "next-auth/client";
const HomePage = ({ menus }) => {
  const [session, loading] = useSession();
  const isSession = session && true;

  const handleSignOut = () => {
    signOut();
  };
  return (
    <>
      <MainHeader
        name={session&&session.user.name}
        isSession={isSession}
        handleSignout={handleSignOut}
      />
      <Categories />
      <Menus menuData={menus} />
    </>
  );
};

export const getStaticProps = async () => {
  dbConnect();
  const menus = await Product.find({});
  return {
    props: {
      menus: menus.map((menu) => {
        return {
          id: menu._id.toString(),
          image: menu.image,
          price: menu.price,
          title: menu.title,
          star: menu.star,
          description: menu.description,
        };
      }),
    },
    revalidate: 1,
  };
};

export default HomePage;
