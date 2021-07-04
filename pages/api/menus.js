import { connectDb } from "../../utils/config";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const connection = await connectDb();
    const db = connection.db();
    const meetupCollection = db.collection("chasey");
    const result = await meetupCollection.insertOne(data);
    connection.close();
    res.status(201).json({ message: "Inserted" });
  }
};

export default handler;
