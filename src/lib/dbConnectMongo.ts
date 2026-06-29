import mongoose from "mongoose";

type CachedMongoose = {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
};

type MongooseGlobal = typeof globalThis & {
  mongoose?: CachedMongoose;
};

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

const globalForMongoose = globalThis as MongooseGlobal;

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

const cached = globalForMongoose.mongoose;

async function dbConnect(): Promise<void> {
  if (cached.conn) {
    return;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;

  console.log("MongoDB connected");

  return;
}

export default dbConnect;
