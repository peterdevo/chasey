import LayoutAccount from "../../../layouts/LayoutAccount";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import FormCard from "../../../components/reused/FormCard";
import Button from "../../../components/reused/Button";
import User from "../../../models/UserDetail";
import { useState } from "react";
import dbConnect from "../../../utils/config";
import { useSession } from "next-auth/client";

const myInformation = ({ userData }) => {
  const [session] = useSession();
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      id: session && session.userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone:phone
    };
    const response = await fetch("/api/update-personalinfo", {
      method: "PUT",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "Application/json",
      },
    });
  };
  return (
    <LayoutAccount>
      <h2>My information</h2>
      <FormCard onSubmit={onSubmit}>
        <label>Firstname:</label>
        <input
          placeholder="Enter your firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Lastname:</label>
        <input
          placeholder="Enter your lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email:</label>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Phone:</label>
        <input
          placeholder="Enter your phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="submit" buttonStyle={"auth"}>
          Save
        </Button>
      </FormCard>
    </LayoutAccount>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  dbConnect();
  const response = await User.findById(context.params.id);
  return {
    props: {
      userData: {
        id: response._id.toString(),
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        phone:response.phone
      },
    },
    revalidate: 10,
  };
};

export default myInformation;
