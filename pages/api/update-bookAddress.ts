import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/config";
import User from "../../models/UserDetail";

dbConnect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, city, street, zipCode } = req.body;
  if ((req.method = "PUT")) {
    try {
      let doc = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          "address.city": city,
          "address.street": street,
          "address.zipCode": zipCode,
        },
        {
          new: true,
        }
      );

      
      res.status(200).json({ message: "Successfully updated",updatedAddress:doc.address });
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
