import router, { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/reused/Button";
import FormCard from "../../components/reused/FormCard";
import ErrorMessage from "../../components/reused/ErrorMessage";

const ResetPassword = () => {
  const route = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const slug = route.query.slug || [{}];

  let userId = slug.length > 0 && slug[0];
  let token = slug.length > 0 && slug[1];

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = fetch("/api/renewPassword", {
        method: "POST",
        body: JSON.stringify({ _id: userId, token, password }),
        headers: { "Content-Type": "Application/json" },
      });
      route.push("/signin-page")
    } catch (error) {
      setErrorMessage(error);
    }
  };
  return (
    <>
      {errorMessage!==""&&<ErrorMessage message={errorMessage} />}
      <FormCard onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button buttonStyle={"auth"}>Save</Button>
      </FormCard>
    </>
  );
};

export default ResetPassword;
