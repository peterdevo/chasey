import mongoose from 'mongoose'
const globalAny:any = global;

// const MONGODB_URI = process.env.DB_HOST

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

let cached = globalAny.mongoose

if (!cached) {
  cached = globalAny.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: true,
      useCreateIndex: true
    }

    cached.promise = mongoose.connect(process.env.DB_HOST, opts).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect