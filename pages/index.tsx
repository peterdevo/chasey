import MainHeader from "../components/containers/MainHeader";
import Categories from "../components/containers/Categories";
import Menus from "../components/containers/Menus";
import { connectDb } from "../utils/config";

const HomePage = ({ menus }) => {
  return (
    <>
      <MainHeader />
      <Categories />
      <Menus menuData={menus} />
    </>
  );
};

export const getStaticProps = async () => {
  const connection = await connectDb();
  const db = connection.db();
  const meetupCollection = db.collection("menus");
  const menusData = await meetupCollection.find().toArray();
  connection.close();

  return {
    props: {
      menus: menusData.map((menu) => {
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
    revalidate:1
  };
};

export default HomePage;
