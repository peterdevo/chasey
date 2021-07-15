import Signin from "../components/pagescontainers/Signin";
import { signIn } from "next-auth/client";
import router, { useRouter } from "next/router";

const SignInPage = () => {
  const route = useRouter();
  const onSignIn = (user) => {
    signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    }).then((response) => {
      if (response.error) {
        return response.error;
      }
      route.push("/");
    });
  };
  return (
    <>
      <Signin onSignIn={onSignIn} />
    </>
  );
};

export default SignInPage;
