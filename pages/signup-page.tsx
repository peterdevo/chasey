import Signup from "../components/pagescontainers/Signup";

const SignUpPage = () => {
  const onSignUp = async (registeredUser) => {
    const fetchResponse = async () => {
      const response = await fetch("/api/register-user", {
        method: "POST",
        body: JSON.stringify(registeredUser),
        headers: {
          "Content-Type": "Application/json",
        },
      });

      const data = response.json();
      return data;
    };
    await fetchResponse();
  };
  return (
    <div>
      <Signup OnSignUp={onSignUp} />
    </div>
  );
};

export default SignUpPage;
