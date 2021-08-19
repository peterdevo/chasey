import LayoutAccount from "../../../layouts/LayoutAccount";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import FormCard from "../../../components/reused/FormCard";
import Button from "../../../components/reused/Button";
import { IoLocationOutline } from "react-icons/io5";
import { useSession } from "next-auth/client";
import { useState } from "react";
import User from "../../../models/UserDetail";
import dbConnect from "../../../utils/config";
import CompletedMessage from "../../../components/reused/CompletedMessage";

const AddressBook = ({ addressBook }) => {
  const [city, setCity] = useState(addressBook.city);
  const [street, setStreet] = useState(addressBook.street);
  const [zipCode, setZipcode] = useState(addressBook.zipCode);
  const [session] = useSession();
  const [isUpdated, setIsUpdated] = useState(false);

  const onSubmit = async (e) => {
    const address = {
      id: session && session.userId,
      street: street,
      city: city,
      zipCode: zipCode,
    };
    e.preventDefault();

    try {
      await fetch("/api/update-bookAddress", {
        method: "PUT",
        body: JSON.stringify(address),
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
    <>
      <LayoutAccount>
        {isUpdated && (
          <CompletedMessage Onhide={()=>setIsUpdated(false)} message="Your address book has been updated." />
        )}
        <h2>
          <IoLocationOutline size={40} />
          Address book
        </h2>
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
    </>
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
      addressBook: {
        city: response.address.street,
        street: response.address.city,
        zipCode: response.address.zipCode,
      },
    },
    revalidate: 30,
  };
};

export default AddressBook;
