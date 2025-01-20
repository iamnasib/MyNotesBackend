// Express server file
const express = require("express");
const connectDB = require("./db");

const startServer = async () => {
  try {
    await connectDB();
    const app = express();
    const port = 3000;
    app.use(express.json());

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
