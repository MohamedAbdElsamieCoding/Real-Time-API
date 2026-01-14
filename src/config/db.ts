import mongoose from "mongoose";

export const connectDb = async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    console.log(`Error: Mongo url not found`);
    process.exit(1);
  }
  try {
    const connect = await mongoose.connect(mongoUrl);
    console.log(`Database is connected on ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: Database failed to connect: ${error}`);
  }
};
