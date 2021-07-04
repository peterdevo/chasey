import MenuCard from "../reused/MenuCard";
import classes from "./Menus.module.scss";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { MenuType } from "../../typesVariants/Types";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  menuData: MenuType[];
}

const Menus = ({ menuData }: IProps) => {
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
        {menuData.map((menuItem) => (
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
