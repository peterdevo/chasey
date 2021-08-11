import CategoryCard from "../reused/CategoryCard";
import SearchBar from "../single-use/SearchBar";
import classes from "./Categories.module.scss";

const DUMMY_DATA = [
  { id: "t1", title: "Popular", icon: "/popular.png", value: "popular" },
  { id: "t2", title: "All", icon: "/all.png", value: "all" },
  { id: "t3", title: "Dishes", icon: "/dishes.png", value: "dish" },
  { id: "t4", title: "Drinks", icon: "/drinks.png", value: "drink" },
  { id: "t5", title: "Sweet", icon: "/sweet.png", value: "sweet" },
];

const Categories = ({ getChosenValue,retrieveSearchValue }) => {
  const handleChooseCategory = (value:string) => {
    getChosenValue(value);
  };
  const getSearchValue=(value)=>{
    retrieveSearchValue(value)
  }
  return (
    <div className={classes.container}>
      <SearchBar getSearchValue={getSearchValue} />
      <div className={classes.menus}>
        {DUMMY_DATA.map((category) => {
          return (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleChooseCategory(category.value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
