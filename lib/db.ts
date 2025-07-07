// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI as string;
// console.log("mongoose:", MONGODB_URI);

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
// }

// // Create a global cached variable (to persist across hot reloads in dev)
// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export async function dbConnect() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: true,
//       maxPoolSize: 10, // Maintain up to 10 socket connections
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (error: any) {
//     cached.promise = null;
//     throw new Error("Failed to connect to the database: " + error.message);
//   }

//   return cached.conn;
// }
// // wmKzodN03Pqp7nsr




import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not found in .env.local");
}

export const dbConnect = async () => {
  try {
    // Avoid reconnecting if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("❌ MongoDB connection error:", err.message);
  } else {
    console.error("❌ MongoDB connection error:", err);
  }
  throw err;
}

};
