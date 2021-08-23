import mongoose from "mongoose";

const connection = {
  isConnected: null,
};

async function dbConnect() {
  if (connection.isConnected) {
    return connection.isConnected;
  }

  const db = await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  
  connection.isConnected = db.connections[0].readyState;

}

export default dbConnect;
