import LayoutAccount from "../../../layouts/LayoutAccount";
import FormCard from "../../../components/reused/FormCard";
import Button from "../../../components/reused/Button";
import { IoLocationOutline } from "react-icons/io5";
import { useSession } from "next-auth/client";
import { useState, useEffect } from "react";
import CompletedMessage from "../../../components/reused/CompletedMessage";
import { useRouter } from "next/router";

interface IAddressBook {
  street: string;
  city: string;
  zipCode: string;
}
const AddressBook = () => {
  const [addressBook, setAddressBook] = useState<Partial<IAddressBook>>({
    street: "",
    city: "",
    zipCode: "",
  });

  const [session] = useSession();
  const [isUpdated, setIsUpdated] = useState(false);
  const route = useRouter();
  const { id } = route.query;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/retrieve-address/${id !== undefined && id}`
        );
        const { addressBook } = await response.json();
        setAddressBook(addressBook);
      } catch (error) {
        console.log(error);
      }
    };
    id !== undefined && fetchData();
  }, [id]);
  const onSubmit = async (e) => {
    const address = {
      id: session && session.userId,
      street: addressBook.street,
      city: addressBook.city,
      zipCode: addressBook.zipCode,
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
          <CompletedMessage
            Onhide={() => setIsUpdated(false)}
            message="Your address book has been updated."
          />
        )}
        <h2>
          <IoLocationOutline size={40} />
          Address book
        </h2>
        {Object.keys(addressBook).length > 0 && (
          <FormCard onSubmit={onSubmit}>
            <label>City:</label>
            <input
              placeholder="Enter your city"
              value={addressBook.city}
              onChange={(e) => setAddressBook({ city: e.target.value })}
            />
            <label>Street:</label>
            <input
              placeholder="Enter your street"
              name="street"
              value={addressBook.street}
              onChange={(e) => setAddressBook({ street: e.target.value })}
            />
            <label>Zipcode:</label>
            <input
              placeholder="Enter your zipcode"
              name="zipCode"
              value={addressBook.zipCode}
              onChange={(e) => setAddressBook({ zipCode: e.target.value })}
            />
            <Button type="submit" buttonStyle={"auth"}>
              Save
            </Button>
          </FormCard>
        )}
      </LayoutAccount>
    </>
  );
};

export default AddressBook;
