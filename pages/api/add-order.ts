import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/config";
import Order from "../../models/OrderDetail";
import { validate } from "../../middlewares/validate";
import { checkoutOrderSchema } from "../../validationSchemas/checkoutOrder";

dbConnect();

const handler= async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const order = await new Order(req.body);
    await order.save();
    res.status(201).json({ success: true, data: order });
  }
};

export default validate(checkoutOrderSchema,handler)
