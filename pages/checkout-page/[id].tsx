import Checkout from "../../components/pagescontainers/Checkout";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import User from "../../models/UserDetail";
import dbConnect from "../../utils/config";

const CheckOut = ({ userData }) => {
  const ShoppingCartContext = useShoppingCartContext();
  const products = ShoppingCartContext.shoppingCart;

  
  const onCheckout = async (personalInfo) => {
    try {
      const order = {
        personalInfo: {
          name: personalInfo.name,
          email: personalInfo.email,
          phone: personalInfo.phone,
          address:{
            city: personalInfo.city,
            street: personalInfo.street,
            zipCode: personalInfo.zipCode,
          },
          userId: personalInfo.userId,
        },
        products,
      };
   
      const response = await fetch("/api/add-order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "Application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Checkout
      userData={userData}
      onCheckout={(personalInfo) => onCheckout(personalInfo)}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
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
        phone:response.phone,
        city: response.address.street,
        street: response.address.city,
        zipCode: response.address.zipCode,
      },
    },
    revalidate: 20,
  };
};

export default CheckOut;
