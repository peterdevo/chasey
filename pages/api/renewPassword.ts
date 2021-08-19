import { NextApiRequest, NextApiResponse } from "next";
import JWT from "jsonwebtoken";
import dbConnect from "../../utils/config";
import User from "../../models/UserDetail";
import bcrypt from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, token, password } = req.body;
  dbConnect();

  try {
    const isUser = await User.exists({ _id });
    if (isUser) {
      const payload = JWT.verify(token, process.env.JWT_SECRET);
      if (payload) {
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
          });
        });
        await User.findOneAndUpdate({ _id }, { password: hashedPassword });

        res.status(200).json({message:"sucessfully updated"})
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default handler;
