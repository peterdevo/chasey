import LayoutAccount from "../../../layouts/LayoutAccount";
import FormCard from "../../../components/reused/FormCard";
import Button from "../../../components/reused/Button";
import { IoPersonOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import CompletedMessage from "../../../components/reused/CompletedMessage";
import { useRouter } from "next/router";

interface IUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
const MyInformation = () => {
  const [session] = useSession();
  const [userInfo, setUserInfo] = useState<Partial<IUserInfo>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const route = useRouter();
  const { id } = route.query;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/retrieve-userinfo/${id}`);
      const { userData } = await response.json();
      setUserInfo(userData);
    };
    id !== undefined && fetchData();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      id: session && session.userId,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone,
    };
    try {
      const response = await fetch("/api/update-personalinfo", {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const { updatedUserInfo } = await response.json();
      setUserInfo(updatedUserInfo);
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
      {Object.keys(userInfo).length > 0 && (
        <FormCard onSubmit={onSubmit}>
          <label>Firstname:</label>
          <input
            placeholder="Enter your firstname"
            value={userInfo.firstName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, firstName: e.target.value })
            }
          />
          <label>Lastname:</label>
          <input
            placeholder="Enter your lastname"
            value={userInfo.lastName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, lastName: e.target.value })
            }
          />
          <label>Email:</label>
          <input
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <label>Phone:</label>
          <input
            placeholder="Enter your phone"
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
          />
          <Button type="submit" buttonStyle={"auth"}>
            Save
          </Button>
        </FormCard>
      )}
    </LayoutAccount>
  );
};

export default MyInformation;
