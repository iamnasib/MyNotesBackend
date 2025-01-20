const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Route for Notes");
});

module.exports = router;
