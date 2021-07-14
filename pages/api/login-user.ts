import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/config";
import user from "../../models/UserDetail";
import {
  createAccessToken,
  createRefreshToken,
} from "../../utils/generateToken";
import cookie from "cookie";

dbConnect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (req.method === "POST") {
    let authUser = await user.findOne({ email });
    if (!authUser) {
      return res.status(404).json({ message: "This user does not exist" });
    }
    let isMatch = await authUser.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const accessToken = createAccessToken({ id: authUser._id.toString() });
    const refreshToken = createRefreshToken({ id: authUser._id.toString() });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access-token", refreshToken, {
        httpOnly: true,
        maxAge: 300,
        sameSite: "strict",
        path: "/",
      })
    );

    res
      .status(200)
      .json({
        message: "success",
        refreshToken,
        user: { email: authUser.email},
      });
  }
};

export default handler;
