import MainHeader from "../containers/MainHeader";
import Categories from "../containers/Categories";
import Menus from "../containers/Menus";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";

const Home = () => {
  return (
    <>
      <MainHeader />
      <Categories />
      <Menus />
    </>
  );
};

export default Home;
