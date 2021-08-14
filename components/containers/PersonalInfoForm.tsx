import React, { useState } from "react";
import classes from "./PersonalInfoForm.module.scss";
import Button from "../reused/Button";
import { Person } from "../../typesVariants/Types";
import { useSession } from "next-auth/client";
import ErrorMessage from "../reused/ErrorMessage";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface Istate {
  person: Person;
}

interface Iprops {
  checkoutOrder: (personInformation: Person) => void;
  userData: Person;
  errorMessage: string;
}

const PersonalInfoForm = ({
  errorMessage,
  userData,
  checkoutOrder,
}: Iprops) => {
  const [session] = useSession();

  const [personInfo, setPersonInfo] = useState<Istate["person"]>({
    name: session ? userData.name : "",
    city: session ? userData.city : "",
    street: session ? userData.street : "",
    zipCode: session ? userData.zipCode : "",
    email: session ? userData.email : "",
    phone: session ? userData.phone : "",
    userId: session ? userData.userId : "",
  });

 

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    checkoutOrder(personInfo);
  };
  console.log(errorMessage)

  return (
    <form className={classes.personalInfoForm} onSubmit={onSubmit}>
      {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
      <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        value={personInfo.name}
        onChange={(e) => setPersonInfo({ ...personInfo, name: e.target.value })}
      />
      <label>City</label>
      <input
        type="text"
        placeholder="City"
        name="city"
        value={personInfo.city}
        onChange={(e) => setPersonInfo({ ...personInfo, city: e.target.value })}
      />
      <label>Street</label>
      <input
        type="text"
        placeholder="Street"
        name="street"
        value={personInfo.street}
        onChange={(e) =>
          setPersonInfo({ ...personInfo, street: e.target.value })
        }
      />
      <label>Zipcode</label>
      <input
        type="text"
        placeholder="Zipcode"
        name="zipcode"
        value={personInfo.zipCode}
        onChange={(e) =>
          setPersonInfo({ ...personInfo, zipCode: e.target.value })
        }
      />
      <label>Email</label>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={personInfo.email}
        onChange={(e) =>
          setPersonInfo({ ...personInfo, email: e.target.value })
        }
      />
      <label>Phone</label>
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={personInfo.phone}
        onChange={(e) =>
          setPersonInfo({ ...personInfo, phone: e.target.value })
        }
      />
      <label>Card payment</label>
      <CardElement className="card-element" options={cardStyle}  />
      <Button buttonStyle={"confirm"}>Buy</Button>
    </form>
  );
};
const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "black",
      },
    },

    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default PersonalInfoForm;
