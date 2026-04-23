import mongoose from "mongoose";

// type ConnectionObject = {
//   isConnected?: number;
// };

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null as mongoose.Connection | null,
    promise: null as Promise<typeof mongoose> | null,
  };
}

async function dbConnect(): Promise<void> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;

  console.log("MongoDB connected");

  return cached.conn;
}

export default dbConnect;
