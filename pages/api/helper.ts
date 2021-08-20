import jwt from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.JWT_SECRET;

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  try {
    const token = await jwt.getToken({ req, secret });
    if (token) {
      res.status(201).json({isAuthorized:true, message:'Authorized' });
    } else {
      res.status(401).json({isAuthorized:false, message: "Unauthorized" });
    }
    
  } catch (error) {
    console.log(error)
  }

};

export default handler;
