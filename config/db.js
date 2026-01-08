import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Performance & stability
      maxPoolSize: 10, // connection pooling
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,

      // Recommended for production
      autoIndex: false, // disable auto index in prod
      retryWrites: true,
      w: "majority",
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.red);
    process.exit(1); // fail fast
  }
};

export default connectDB;
