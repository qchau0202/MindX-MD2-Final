const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const _ = await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB connected:", mongoose.connection.host);
        console.log(
          "Connected to database:",
          mongoose.connection.db.databaseName
        );
      })
      .catch((error) => {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
      });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
