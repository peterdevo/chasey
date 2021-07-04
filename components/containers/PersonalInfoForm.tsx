import { useState } from "react";
import classes from "./PersonalInfoForm.module.scss";
import Button from "../reused/Button";
import { Person } from "../../typesVariants/Types";

interface Istate {
  person: Person;
}

interface Iprops {
  checkoutOrder: (personInformation: Person) => void;
}

const PersonalInfoForm = ({ checkoutOrder }: Iprops) => {
  const [personInfo, setPersonInfo] = useState<Istate["person"]>({
    name: "",
    street: "",
    zipcode: "",
    email: "",
    phone: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPersonInfo({
      ...personInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    checkoutOrder(personInfo);
  };

  return (
    <form className={classes.personalInfoForm} onSubmit={onSubmit}>
      <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        name="street"
        value={personInfo.name}
        onChange={handleOnChange}
      />
      <label>Street</label>
      <input
        type="text"
        placeholder="Street"
        name="street"
        value={personInfo.street}
        onChange={handleOnChange}
      />
      <label>Zipcode</label>
      <input
        type="text"
        placeholder="Zipcode"
        name="zipcode"
        value={personInfo.zipcode}
        onChange={handleOnChange}
      />
      <label>Email</label>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={personInfo.email}
        onChange={handleOnChange}
      />
      <label>Phone</label>
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={personInfo.phone}
        onChange={handleOnChange}
      />
      <Button buttonStyle={"confirm"}>Buy</Button>
    </form>
  );
};

export default PersonalInfoForm;
