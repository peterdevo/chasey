import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/config";
import User from "../../../models/UserDetail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  const { id } = req.query;
  const response = await User.findById({ _id: id });
  res.status(200).json({
    userData: {
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      phone: response.phone,
    },
  });
};
export default handler;
