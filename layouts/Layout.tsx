import Footer from "../components/reused/Footer";
import classes from "./Layout.module.scss"
const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <main >{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
