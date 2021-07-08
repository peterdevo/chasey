import dbConnect from "../../utils/config";
import User from "../../models/user.model";

dbConnect();

const handler = async (req, res) => {
  if (req.method === "POST") {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({message:"sucess"})
  }
};

export default handler;
