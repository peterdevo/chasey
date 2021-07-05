import dbConnect from "../../utils/config";
import Order from "../../models/order.model";

dbConnect();

export default async (req, res) => {
  
  if (req.method === "POST") {
    const order = await new Order(req.body)
    await order.save()
    res.status(201).json({ success: true, data: order });
  }
};

