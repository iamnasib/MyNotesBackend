const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const express = require("express");
const connectDB = require("./db");
var cors = require("cors");

const startServer = async () => {
  try {
    await connectDB();
    const app = express();
    const port = 5000;
    app.use(express.json());
    const corsOptions = {
      origin: "*", // Allow all origins
      optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));

    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/notes", require("./routes/notes"));

    // app.get("/", (req, res) => {
    //   res.send("Route for the home page /");
    // });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
