import Checkout from "../../components/pagescontainers/Checkout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import User from "../../models/UserDetail";
import dbConnect from "../../utils/config";

const CheckOut = ({ userData }) => {
  return (
    <div>
      <Checkout userData={userData} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let response = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
  };

  if (context.params.id !== "guest") {
    dbConnect();
    response = await User.findById(context.params.id);
  }

  return {
    props: {
      userData: {
        userId: response._id.toString(),
        email: response.email,
        name: response.firstName,
        phone: response.phone,
        city: response.address.street,
        street: response.address.city,
        zipCode: response.address.zipCode,
      },
    },
    revalidate: 1,
  };
};

export default CheckOut;
