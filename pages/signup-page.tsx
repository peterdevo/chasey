import Signup from "../components/pagescontainers/Signup";

const SignUpPage = () => {
  const onSignUp = async (registeredUser) => {
    const response = await fetch("/api/register-user", {
      method: "POST",
      body: JSON.stringify(registeredUser),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    console.log(response.json());
  };
  return (
    <div>
      <Signup OnSignUp={onSignUp} />
    </div>
  );
};

export default SignUpPage;
