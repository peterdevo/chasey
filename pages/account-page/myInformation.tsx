import LayoutAccount from "../../layouts/LayoutAccount";
import FormCard from "../../components/reused/FormCard";
import Button from "../../components/reused/Button";
import { useState } from "react";
const myInformation = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    Email: "",
  });

  const onChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {};
  return (
    <LayoutAccount>
      <h2>My information</h2>
      <FormCard onSubmit={onSubmit}>
        <label>Firstname:</label>
        <input
          placeholder="Enter your firstname"
          name="firstname"
          onChange={onChange}
        />
        <label>Lastname:</label>
        <input
          placeholder="Enter your lastname"
          name="lastname"
          onChange={onChange}
        />
        <label>Email:</label>
        <input
          placeholder="Enter your email"
          name="email"
          onChange={onChange}
        />
        <Button type="submit" buttonStyle={"auth"}>
          Save
        </Button>
      </FormCard>
    </LayoutAccount>
  );
};
export default myInformation;
