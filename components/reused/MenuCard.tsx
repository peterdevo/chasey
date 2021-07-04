import { useState } from "react";
import classes from "./MenuCard.module.scss";
import { AiOutlineStar } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import AddAmountButton from "./AddAmountButton";
import { MenuType } from "../../typesVariants/Types";

interface IProps {
  menu: MenuType;
  handleAddToCart: (amount: Number, menu: MenuType) => void;
}
const MenuCard = ({ menu, handleAddToCart }: IProps) => {
  const [amount, setAmount] = useState(0);

  const handleAdd = () => {
    setAmount(amount + 1);
  };
  const handleMinus = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };
  return (
    <div className={classes.menuCard}>
      <div className={classes.imagePrice}>
        <img src={menu.image} alt="image" className={classes.image} />
        <p>{menu.price}$</p>
      </div>
      <div className={classes.titleStar}>
        <div>{menu.title}</div>
        <div className={classes.starContainer}>
          <p>{menu.star}</p>
          <AiOutlineStar size={24} />
        </div>
      </div>
      <div>{menu.description}</div>
      <div className={classes.addCartContainer}>
        <AddAmountButton
          amount={amount}
          handleAdd={handleAdd}
          handleMinus={handleMinus}
        />
        <RiShoppingCartLine
          size={45}
          className={classes.addCart}
          color="gray"
          onClick={() => handleAddToCart(amount, menu)}
        />
      </div>
    </div>
  );
};

export default MenuCard;
