const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/myNotes?directConnection=true&tls=false";

const connectDB = async () => {
  await mongoose.connect(mongoURI);
  console.log("Connected to MongoDB");
};

module.exports = connectDB;
