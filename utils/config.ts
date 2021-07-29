import mongoose from "mongoose";

const connection: { isConnected: number } = {
  isConnected: null,
};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  });

  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
