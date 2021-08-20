import FormCard from "../components/reused/FormCard";
import Button from "../components/reused/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import ErrorMessage from "../components/reused/ErrorMessage";
import UpdatedMessage from "../components/reused/CompletedMessage";
import AccountHeader from "../components/containers/AccountHeader";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");
  const route = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sendResetPasswordLink", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "Application/json" },
      });
      const data = response.json();
      const { message, err } = await data;
      if (err) {
        return setErrorMessage(message);
      }
      setErrorMessage("");
      setSucessMessage(message);
    } catch (err) {
      setErrorMessage(err);
    }
  };
  return (
    <>
      <AccountHeader route={() => route.back()} />
      <FormCard onSubmit={handleSubmit}>
        {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
        {sucessMessage !== "" && <UpdatedMessage Onhide={()=>setSucessMessage("")} message={sucessMessage} />}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          autoFocus
        />
        <Button type="submit" buttonStyle={"auth"}>
          Reset
        </Button>
      </FormCard>
    </>
  );
};

export default ForgetPassword;
