import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/config";
import User from "../../models/UserDetail";

dbConnect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, firstName, lastName, email, phone } = req.body;

  if ((req.method = "PUT")) {
    try {
      let doc = await User.findOneAndUpdate(
        { _id: id },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        },
        { new: true }
      );
      res.status(200).json({
        message: "sucessfully updated",
        updatedUserInfo:doc
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
