import Signin from "../components/pagescontainers/Signin";
import { useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { loginUserSchema } from "../validationSchemas/loginUser";
import Loader from "../components/reused/Loader";

const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading,setIsloading]=useState(false)
  const route = useRouter();

  const onCredentialSignin = async (user) => {
    try {
      const validatedUser = await loginUserSchema.validate(user);
      setIsloading(true)
      signIn("credentials", {
        email: validatedUser.email,
        password: validatedUser.password,
        redirect: false,
      }).then((response) => {
        if (response.error) {
          setErrorMessage(response.error);
        } else {
          setIsloading(false)
          route.push("/");
        }
      });
    } catch (err) {
      setErrorMessage(err.errors[0]);
    }
  };
  const onGoogleSignin = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/" });
  };
  return (
    <>
      {isLoading&&<Loader />}
      <Signin
        errorMessage={errorMessage}
        onCredentialSignin={onCredentialSignin}
        onGoogleSignin={onGoogleSignin}
      />
    </>
  );
};

export default SignInPage;
