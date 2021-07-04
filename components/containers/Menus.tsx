import MenuCard from "../reused/MenuCard";
import classes from "./Menus.module.scss";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { MenuType } from "../../typesVariants/Types";
import { v4 as uuidv4 } from 'uuid';

const DUMMY_DATA = [
  {
    id: "f1",
    image: "https://source.unsplash.com/e7bvrQIRQG8/1200x1200",
    price:20,
    title: "Steak",
    star: "4",
    description: "This shiet is good",
  },
  {
    id: "f2",
    image: "https://source.unsplash.com/e7bvrQIRQG8/1200x1200",
    price:20,
    title: "Steak",
    star: "4",
    description: "This shiet is good",
  },
  {
    id: "f3",
    image: "https://source.unsplash.com/e7bvrQIRQG8/1200x1200",
    price:20,
    title: "Steak",
    star: "4",
    description: "This shiet is good",
  },
  {
    id: "f4",
    image: "https://source.unsplash.com/e7bvrQIRQG8/1200x1200",
    price:20,
    title: "Steak",
    star: "4",
    description: "This shiet is good",
  },
];

const Menus = () => {
  const shoppingCartContext = useShoppingCartContext();

  const handleAddToCart = (amount: Number, menu: MenuType): void => {
    if (amount > 0) {
      const newMenu = { ...menu, amount };
      shoppingCartContext.setShoppingCart([
        ...shoppingCartContext.shoppingCart,
        newMenu,
      ]);
    }
  };

  return (
    <div className={classes.menusContainer}>
      <h2>Popular dishes</h2>
      <div className={classes.menus}>
        {DUMMY_DATA.map((menuItem) => (
          <MenuCard
            key={uuidv4()}
            menu={menuItem}
            handleAddToCart={(amount, menu) => handleAddToCart(amount, menu)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menus;
