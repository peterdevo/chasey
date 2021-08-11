import MenuCard from "../reused/MenuCard";
import classes from "./Menus.module.scss";
import { useState } from "react";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { MenuType } from "../../typesVariants/Types";
import Categories from "./Categories";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  menuData: MenuType[];
}

const Menus = ({ menuData }: IProps) => {
  const shoppingCartContext = useShoppingCartContext();
  const [menus, setMenus] = useState(menuData);

  const handleAddToCart = (amount: Number, menu: MenuType): void => {
    if (amount > 0) {
      const newMenu = { ...menu, amount };
      shoppingCartContext.setShoppingCart([
        ...shoppingCartContext.shoppingCart,
        newMenu,
      ]);
    }
  };
  const getChosenValue = (value) => {
    if (value === "popular") {
      const filteredStar = menuData.filter((menu) => menu.star === "5");
      setMenus([...filteredStar]);
    } else if (value === "all") {
      setMenus([...menuData]);
    } else {
      const filteredMenu = menuData.filter((menu) => menu.category === value);
      setMenus([...filteredMenu]);
    }
  };

  const retrieveSearchValue = (value) => {
    const filterSearch = menuData.filter((menu) =>
      menu.title.toLowerCase().includes(value)
    );
    setMenus([...filterSearch]);
  };

  return (
    <>
      <Categories
        getChosenValue={getChosenValue}
        retrieveSearchValue={retrieveSearchValue}
      />
      <div className={classes.menusContainer}>
        <div className={classes.title}>
          <img src="/leftbrush.png" width="80px" />
          <h2>Appetizing meal</h2>
          <img src="/rightbrush.png" width="80px" />
        </div>
        <div className={classes.menus}>
          {menus.map((menuItem) => (
            <MenuCard
              key={uuidv4()}
              menu={menuItem}
              handleAddToCart={(amount, menu) => handleAddToCart(amount, menu)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Menus;
