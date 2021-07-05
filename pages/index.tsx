import MainHeader from "../components/containers/MainHeader";
import Categories from "../components/containers/Categories";
import Menus from "../components/containers/Menus";
import dbConnect from "../utils/config";
import Product from "../models/product.model";
const HomePage = ({menus}) => {
  return (
    <>
      <MainHeader />
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
