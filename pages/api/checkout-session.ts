import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const calculateOrderAmount = (products) => {
  const result= products.reduce((acc, obj) => {
    return acc + obj.price*obj.amount;
  },0);
  return result*100
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = req.body;

  if (req.method === "POST") {
    const paymentIntent  = await stripe.paymentIntents.create({
      
      amount: calculateOrderAmount(products),
      currency: "usd",
      
    });
    

    res.json({clientSecret: paymentIntent.client_secret});
  }
};

export default handler;
