const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Set global timeout cho tất cả operations
    mongoose.set("bufferCommands", false);

    // Sử dụng MONGO_URI environment variable hoặc fallback phù hợp với Docker
    const mongoUri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      "mongodb://mongo:27017/doan";
    console.log("🔗 Connecting to MongoDB:", mongoUri);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 30000, // 30 seconds
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
