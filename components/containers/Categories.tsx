import CategoryCard from "../reused/CategoryCard";
import SearchBar from "../single-use/SearchBar";
import classes from "./Categories.module.scss";

const DUMMY_DATA = [
  { id: "t1", title: "Popular", icon: "/popular.png" },
  { id: "t2", title: "All", icon: "/all.png" },
  { id: "t3", title: "Dishes", icon: "/dishes.png" },
  { id: "t4", title: "Drinks", icon: "/drinks.png" },
  { id: "t5", title: "Sweet", icon: "/sweet.png" },
];

const display = (): JSX.Element[] => {
  return DUMMY_DATA.map((category) => {
    return <CategoryCard key={category.id} category={category} />;
  });
};
const Categories = () => {
  return (
    <div className={classes.container}>
      <SearchBar />
      <div className={classes.menus}>{display()}</div>
    </div>
  );
};

export default Categories;
