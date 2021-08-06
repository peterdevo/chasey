import { useState } from "react";
import classes from "./Signup.module.scss";
import FormCard from "../reused/FormCard";
import Header from "../containers/Header";
import Button from "../reused/Button";
import { UserInfoInput } from "../../typesVariants/Types";
import { useRouter } from "next/router";
import { registerUserSchema } from "../../validationSchemas/registerUser";
import ErrorMessage from "../reused/ErrorMessage";
import SuccessMessage from "../reused/SuccessMessage";

const Signup = ({ OnSignUp }) => {
  const [registeredUser, setRegisteredUser] = useState<UserInfoInput>({
    email: "",
    password: "",
    image: "",
    firstName: "",
    lastName: "",
    phone: "-",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
    accountType: "credential",
  });
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSucess, setIsSuccess] = useState(false);
  const route = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registeredUser.password !== confirmedPassword) {
      return setErrorMessage("Password does not match!");
    }

    try {
      const validationResult = await registerUserSchema.validate({
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
        password: registeredUser.password,
      });

      if (validationResult) {
        OnSignUp(registeredUser);
        setIsSuccess(true);
      }
    } catch (err) {
      setErrorMessage(err.errors[0]);
    }
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
    <div>
      {isSucess && (
        <SuccessMessage>
          <div
            style={{ cursor: "pointer", color: "black", marginTop: "10px" }}
            onClick={() => route.push("/signin-page")}
          >
            Back to login page
          </div>
        </SuccessMessage>
      )}
      <Header header={header} />
      <FormCard onSubmit={handleSignup}>
        <h3>Register</h3>
        {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
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
    </div>
  );
};

export default Signup;
