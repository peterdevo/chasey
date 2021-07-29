import LayoutAccount from "../../../layouts/LayoutAccount";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import FormCard from "../../../components/reused/FormCard";
import Button from "../../../components/reused/Button";
import { useSession } from "next-auth/client";
import { useState } from "react";
import User from "../../../models/UserDetail";
import dbConnect from "../../../utils/config";

const AddressBook = ({ addressBook }) => {
  const [city, setCity] = useState(addressBook.city);
  const [street, setStreet] = useState(addressBook.street);
  const [zipCode, setZipcode] = useState(addressBook.zipCode);

  const [session] = useSession();


  const onSubmit = async (e) => {
    const address = {
      id: session && session.userId,
      street: street,
      city: city,
      zipCode: zipCode,
    };
    e.preventDefault();

    const response = await fetch("/api/update-bookAddress", {
      method: "PUT",
      body: JSON.stringify(address),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    console.log(response.json());
  };
  return (
    <LayoutAccount>
      <h2>Address book</h2>
      <FormCard onSubmit={onSubmit}>
        <label>City:</label>
        <input
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>Street:</label>
        <input
          placeholder="Enter your street"
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <label>Zipcode:</label>
        <input
          placeholder="Enter your zipcode"
          name="zipCode"
          value={zipCode}
          onChange={(e) => setZipcode(e.target.value)}
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
    fallback: 'blocking',
  };
};
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  dbConnect();
  const response = await User.findById(context.params.id);
  return {
    props: {
      addressBook: {
        city: response.address.street,
        street: response.address.city,
        zipCode: response.address.zipCode,
      },
    },
    revalidate: 10,
  };
};

export default AddressBook;
