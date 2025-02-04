const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const mongoose = require("mongoose");
const mongoURI = process.env.DB_URI;

// "mongodb://localhost:27017/myNotes?directConnection=true&tls=false";
const connectDB = async () => {
  await mongoose.connect(mongoURI);
  console.log("Connected to MongoDB");
};

module.exports = connectDB;
