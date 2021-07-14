import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/config";
import Order from "../../models/OrderDetail";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const order = await new Order(req.body);
    await order.save();
    res.status(201).json({ success: true, data: order });
  }
};
