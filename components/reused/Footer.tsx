import classes from "./Footer.module.scss";
const Footer = () => {
  const year=new Date().getFullYear()
  return (
    <div className={classes.footerContainer}>
      <div>&copy; {year} Chasey </div>
      <div>
        <span>Privacy&Cookies</span>|
        <span>Terms of use</span>
      </div>
    </div>
  );
};

export default Footer;
