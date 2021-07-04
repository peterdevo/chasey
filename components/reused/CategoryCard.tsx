import classes from "./CategoryCard.module.scss";

interface Iprops {
  category: {
    title: string;
    icon: string;
  };
}

const CategoryCard = ({ category }: Iprops) => {
  return (
    <>
      <div className={classes.categoryCard}>
        <img src={category.icon} alt="icon" width={40} height={40} />
        <span>{category.title}</span>
      </div>
    </>
  );
};

export default CategoryCard;
