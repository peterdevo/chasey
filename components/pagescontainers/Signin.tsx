import React, { useState } from "react";
import { UserInfoInput } from "../../typesVariants/Types";
import Header from "../containers/Header";
import classes from "./Signin.module.scss";
import Button from "../reused/Button";
import FormCard from "../reused/FormCard";
import { ImGooglePlus } from "react-icons/im";
import ErrorMessage from "../reused/ErrorMessage";
import { useRouter } from "next/router";

const Signin = ({ onCredentialSignin, onGoogleSignin,errorMessage }) => {
  const [authInput, setAuthInput] = useState<UserInfoInput>({
    email: "",
    password: "",
  });
  const route=useRouter()
  

  const header = {
    includeRegistered: true,
    path: "/",
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>):void => {
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
      <FormCard onSubmit={handleSignin}>
        <h3>Sign in</h3>
        <div className={classes.google} onClick={onGoogleSignin}>
          <ImGooglePlus size={22} />
          <div>Sign in with google</div>
        </div>
        {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
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
          <p onClick={()=>route.push("forget-password")}>Forget password?</p>
        </div>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={authInput.password}
          onChange={handleOnchange}
        />
        <Button type="submit" buttonStyle={"auth"}>
          Sign in
        </Button>
      </FormCard>
    </>
  );
};

export default Signin;
