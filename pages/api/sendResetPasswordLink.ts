import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/config";
import User from "../../models/UserDetail";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  const { email } = req.body;
  if ((req.method = "POST")) {
    try {
      const isUser = await User.findOne({ email });

      if (isUser) {
        const token = JWT.sign(
          { id: isUser._id, email: isUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_SECRET,
            pass: process.env.PASS_SECRET,
          },
        });

        let mailOptions = {
          from: "Chasey",
          to: email,
          subject: "Reset password",
          html: `<html><body> <a href=${req.headers.origin}/reset-password/${isUser.id}/${token}>Reset your password here.</a> </body>`,
        };
      await transporter.sendMail(mailOptions);

        res
          .status(200)
          .json({ message: "The link has been sent to you email." });
      } else {
        res
          .status(404)
          .json({ message: "This email does not exist.", err: true });
      }
    } catch (error) {
      res.status(500).json({ message: error, err: true });
    }
  }
};

export default handler;
