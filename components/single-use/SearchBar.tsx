import classes from "./SearchBar.module.scss";
import { BsSearch } from "react-icons/bs";
const SearchBar = ({getSearchValue}) => {

  const onChange=(e)=>{
    getSearchValue(e.target.value)
  }
  return (
    <>
      <div className={classes.container}>
        <input type="text" className={classes.searchBar} placeholder="Search" onChange={onChange} />
        <BsSearch size={25} color="#A6A8AB" />
      </div>
    </>
  );
};

export default SearchBar;
