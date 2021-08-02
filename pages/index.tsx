import MainHeader from "../components/containers/MainHeader";
import { GetStaticProps } from "next";
import Categories from "../components/containers/Categories";
import Menus from "../components/containers/Menus";
import dbConnect from "../utils/config";
import Product from "../models/ProductDetail";
import { signOut, useSession } from "next-auth/client";
import Layout from "../layouts/Layout";
const HomePage = ({ menus }) => {
  const [session] = useSession();
  const isSession = session && true;

  const handleSignOut = () => {
    signOut();
  };
  return (
    <>
      <Layout>
        <MainHeader
          name={session && session.user.name}
          isSession={isSession}
          handleSignout={handleSignOut}
        />
        <Categories />
        <Menus menuData={menus} />
      </Layout>
    </>
  );
};

export const getStaticProps:GetStaticProps = async () => {
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
    revalidate: 30,
  };
};

export default HomePage;
