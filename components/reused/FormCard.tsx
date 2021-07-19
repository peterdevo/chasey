import classes from "./FormCard.module.scss";

interface IProps {
  children: any;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  method?: string;
  action?: string;
}

const FormCard = ({ children, onSubmit, method, action }: IProps) => {
  return (
    <form
      onSubmit={onSubmit}
      method={method}
      action={action}
      className={classes.formCard}
    >
      {children}
    </form>
  );
};

export default FormCard;
