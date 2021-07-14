import Signin from "../components/pagescontainers/Signin";
import { signIn } from "next-auth/client";
import { redirect } from "next/dist/next-server/server/api-utils";

const SignInPage = () => {
  const onSignIn = (user) => {
    signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    }).then((result) => console.log(JSON.stringify(result) ));
  };
  return (
    <>
      <Signin onSignIn={onSignIn} />
    </>
  );
};

export default SignInPage;
