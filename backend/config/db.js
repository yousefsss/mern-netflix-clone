import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URL);
    console.log("MongoDB Conntect Successfuly");
  } catch (error) {
    console.error("Error While Connecting to MONGODB: " + error.message);
    process.exit(1); // 1 means there was an error, 0 means success
  }
};

export default connectDB;
