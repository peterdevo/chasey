import mongoose from "mongoose";

const connection: { isConnected: number } = {
  isConnected: null,
};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }
  try {
    
    const db = await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
