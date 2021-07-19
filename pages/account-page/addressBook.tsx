import LayoutAccount from "../../layouts/LayoutAccount";
import FormCard from "../../components/reused/FormCard";
import Button from "../../components/reused/Button";
import { useState } from "react";
const AddressBook = () => {
  const [address, setAddress] = useState({
    city: "",
    street: "",
    zipCode: "",
  });
  const onChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {};
  return (
    <LayoutAccount>
      <h2>Address book</h2>
      <FormCard onSubmit={onSubmit}>
        <label>City:</label>
        <input placeholder="Enter your city" name="city" onChange={onChange} />
        <label>Street:</label>
        <input
          placeholder="Enter your street"
          name="street"
          onChange={onChange}
        />
        <label>Zipcode:</label>
        <input
          placeholder="Enter your zipcode"
          name="zipCode"
          onChange={onChange}
        />
        <Button type="submit" buttonStyle={"auth"}>
          Save
        </Button>
      </FormCard>
    </LayoutAccount>
  );
};

export default AddressBook;
