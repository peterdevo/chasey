import classes from "./CategoryCard.module.scss";

interface Iprops {
  category: {
    title: string;
    icon: string;
  };
  onClick:()=>void
}

const CategoryCard = ({ category,onClick }: Iprops) => {
  return (
    <>
      <div className={classes.categoryCard} onClick={onClick}>
        <img src={category.icon} alt="icon" width={40} height={40} />
        <span>{category.title}</span>
      </div>
    </>
  );
};

export default CategoryCard;
