import { useState } from "react";
import classes from "./Signup.module.scss";
import FormCard from "../reused/FormCard";
import Header from "../containers/Header";
import Button from "../reused/Button";
import { UserInfoInput } from "../../typesVariants/Types";
const Signup = ({ OnSignUp }) => {
  const [registeredUser, setRegisteredUser] = useState<UserInfoInput>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
  });
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registeredUser.password !== confirmedPassword) {
      return alert("not match");
    }
    OnSignUp(registeredUser);
  };
  const header = {
    includeRegistered: false,
    path: "/signin-page",
  };
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisteredUser({
      ...registeredUser,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Header header={header} />
      <FormCard onSubmit={handleSignup}>
        <h3>Register</h3>
        <label>Firstname</label>
        <input
          type="text"
          placeholder="Enter your firstname"
          name="firstName"
          value={registeredUser.firstName}
          onChange={handleOnchange}
        />
        <label>Lastname</label>
        <input
          type="text"
          placeholder="Enter your lastname"
          name="lastName"
          value={registeredUser.lastName}
          onChange={handleOnchange}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={registeredUser.email}
          onChange={handleOnchange}
        />
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter your password"
          name="password"
          value={registeredUser.password}
          onChange={handleOnchange}
        />
        <label>Re-password</label>
        <input
          type="text"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <div className={classes.termOfCondition}>
          <input className={classes.checkbox} type="checkbox" />
          <p>
            I agree with <span>Terms of condition</span>
          </p>
        </div>
        <Button type="submit" buttonStyle={"auth"}>
          Register
        </Button>
      </FormCard>
    </>
  );
};

export default Signup;
