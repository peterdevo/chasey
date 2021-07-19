import Signin from "../components/pagescontainers/Signin";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

const SignInPage = () => {
  const route = useRouter();
  const onCredentialSignin = (user) => {
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
  const onGoogleSignin=()=>{
    signIn("google",{callbackUrl:"http://localhost:3000/"})
  }
  return (
    <>
      <Signin onCredentialSignin={onCredentialSignin} onGoogleSignin={onGoogleSignin} />
    </>
  );
};

export default SignInPage;
