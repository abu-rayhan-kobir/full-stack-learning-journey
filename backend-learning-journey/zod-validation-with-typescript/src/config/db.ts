import mongoose from "mongoose";

const connectDB = async (DATABASE_URI: string | undefined) => {
  try {
    if (!DATABASE_URI) {
      throw new Error(`Database uri is not defined!`);
    }
    await mongoose.connect(DATABASE_URI);
    console.log(`Server successfully connected with mongodb!`)
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Database connection failed: ${error.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;