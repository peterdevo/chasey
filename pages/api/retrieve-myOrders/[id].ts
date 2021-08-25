import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/config";
import OrderDetail from "../../../models/OrderDetail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  const { id } = req.query;
  try {
    const response = await OrderDetail.find({ "personalInfo.userId": id });
    const orders = response.map((order) => {
      let newdate = "";
      let dateObj = new Date(order.createdAt);
      let month = dateObj.getUTCMonth() + 1;
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();

      newdate = year + "/" + month + "/" + day;
      return {
        id: order._id.toString(),
        createdAt: newdate,
        total: order.totalPaid,
        products: order.products,
      };
    });

    res.status(200).json({
      orders: orders,
    });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
