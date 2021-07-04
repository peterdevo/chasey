import { MongoClient } from "mongodb";
export const connectDb = () => {
  const client = MongoClient.connect(process.env.DB_HOST);

  return client;
};
