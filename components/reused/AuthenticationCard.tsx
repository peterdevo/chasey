import classes from "./AuthenticationCard.module.scss";

interface IProps {
  children: any;
  onSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
}

const AuthenticationCard = ({ children, onSubmit }: IProps) => {
  return (
    <form onSubmit={onSubmit} className={classes.authenticationCard} >
      {children}
    </form>
  );
};

export default AuthenticationCard;
