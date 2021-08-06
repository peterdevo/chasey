import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/config";
import User from "../../models/UserDetail";
import { registerUserSchema } from "../../validationSchemas/registerUser";
import { validate } from "../../middlewares/validate";

dbConnect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  if (req.method === "POST") {
    try {
      const result = await User.findOne({ email });
      if (result) {
        return res.status(409).json({ message: "This user already exists" });
      }
      const user = new User(req.body);
      await user.save();
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default validate(registerUserSchema, handler);
