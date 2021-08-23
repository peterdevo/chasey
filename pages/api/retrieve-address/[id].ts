import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/config";
import User from "../../../models/UserDetail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  const { id } = req.query;
  const response = await User.findById({ _id: id });
  res
    .status(200)
    .json({
      addressBook: {
        city: response.address.street,
        street: response.address.city,
        zipCode: response.address.zipCode,
      },
    });
};
export default handler;
