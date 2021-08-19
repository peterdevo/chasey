import LayoutAccount from "../../../layouts/LayoutAccount";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import FormCard from "../../../components/reused/FormCard";
import Button from "../../../components/reused/Button";
import { IoPersonOutline } from "react-icons/io5";
import User from "../../../models/UserDetail";
import { useState } from "react";
import dbConnect from "../../../utils/config";
import { useSession } from "next-auth/client";
import CompletedMessage from "../../../components/reused/CompletedMessage";
const myInformation = ({ userData }) => {
  const [session] = useSession();
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [isUpdated, setIsUpdated] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      id: session && session.userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };
    try {
      await fetch("/api/update-personalinfo", {
        method: "PUT",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "Application/json",
        },
      });

      setIsUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LayoutAccount>
      {isUpdated && (
        <CompletedMessage
          Onhide={() => setIsUpdated(false)}
          message="You information has been updated."
        />
      )}
      <h2>
        <IoPersonOutline size={40} style={{ marginRight: "10px" }} />
        My information
      </h2>
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
        phone: response.phone,
      },
    },
    revalidate: 30,
  };
};

export default myInformation;
