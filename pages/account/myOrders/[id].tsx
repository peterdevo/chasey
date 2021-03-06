import LayoutAccount from "../../../layouts/LayoutAccount";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import PersonalOrderCard from "../../../components/reused/PersonalOrderCard";
import OrderDetail from "../../../models/OrderDetail";
import dbConnect from "../../../utils/config";
import { BsBag } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/retrieve-myOrders/${id}`);
      const { orders } = await response.json();
      setOrders(orders);
    };
    id !== undefined && fetchData();
  }, [id]);
 
  return (
    <LayoutAccount>
      <h2>
        <BsBag size={40} /> My orders
      </h2>
      <PersonalOrderCard orders={orders} />
    </LayoutAccount>
  );
};

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [],
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   dbConnect();
//   const response = await OrderDetail.find({
//     "personalInfo.userId": context.params.id,
//   });

//   return {
//     props: {
//       orders: response.map((order) => {
//         let newdate=""
//         let dateObj = new Date(order.createdAt);
//         let month = dateObj.getUTCMonth() + 1;
//         let day = dateObj.getUTCDate();
//         let year = dateObj.getUTCFullYear();

//         newdate = year + "/" + month + "/" + day;

//         return {
//           id: order._id.toString(),
//           createdAt: newdate,
//           total:order.totalPaid,
//           products: order.products.map((product) => {
//             return {
//               id: product._id.toString(),
//               image: product.image,
//               title: product.title,
//               price: product.price,
//               amount: product.amount,
//             };
//           }),
//         };
//       }),
//     },
//     revalidate: 5,
//   };
// };

export default MyOrders;
