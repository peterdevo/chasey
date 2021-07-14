import classes from "./AuthenticationCard.module.scss";

interface IProps {
  children: any;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  method?: string;
  action?: string;
}

const AuthenticationCard = ({ children, onSubmit, method, action }: IProps) => {
  return (
    <form
      onSubmit={onSubmit}
      method={method}
      action={action}
      className={classes.authenticationCard}
    >
      {children}
    </form>
  );
};

export default AuthenticationCard;
