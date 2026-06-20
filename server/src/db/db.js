import mongoose from "mongoose";
import envs from "../config/env.js";
import logger from "../config/logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(envs.MONGO_URI);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error({ error }, "MongoDB connection error:");
    process.exit(1);
  }
};

export default connectDB;
