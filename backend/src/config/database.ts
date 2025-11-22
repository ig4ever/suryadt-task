import mongoose from "mongoose";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, MONGODB_PORT } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${MONGODB_PORT}/${DB_NAME}?authSource=admin`;
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      autoIndex: (process.env.NODE_ENV || "development") !== "production",
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
};
