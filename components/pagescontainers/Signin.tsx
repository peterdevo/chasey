import React, { useState } from "react";
import { UserInfoInput } from "../../typesVariants/Types";
import Header from "../containers/Header";
import classes from "./Signin.module.scss";
import Button from "../reused/Button";
import AuthenticationCard from "../reused/AuthenticationCard";
import { ImGooglePlus } from "react-icons/im";

const Signin = ({ onCredentialSignin,onGoogleSignin }) => {
  const [authInput, setAuthInput] = useState<UserInfoInput>({
    email: "",
    password: "",
  });

  const header = {
    includeRegistered: true,
    path: "/",
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthInput({
      ...authInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onCredentialSignin(authInput);
  };
  return (
    <>
      <Header header={header} />
      <AuthenticationCard onSubmit={handleSignin}>
        <h3>Sign in</h3>
        <div className={classes.google} onClick={onGoogleSignin}>
          <ImGooglePlus size={22} />
          <div>Sign in with google</div>
        </div>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={authInput.email}
          onChange={handleOnchange}
        />
        <div className={classes.forgetPass}>
          <label>Password</label>
          <p>Forget password?</p>
        </div>
        <input
          type="text"
          placeholder="Enter your password"
          name="password"
          value={authInput.password}
          onChange={handleOnchange}
        />
        <Button type="submit" buttonStyle={"auth"}>
          Sign in
        </Button>
      </AuthenticationCard>
    </>
  );
};

export default Signin;
