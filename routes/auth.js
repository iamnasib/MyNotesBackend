const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Parent route for authentication : /api/auth
//Signup route using POST, doesn't require authentication
router.post("/signup", (req, res) => {
  console.log(req.body);
  const user = User(req.body);
  user.save();
  res.send(req.body);
});
router.get("/login", (req, res) => {
  obj = {
    name: "login",
    description: "login page",
  };
  res.json(obj);
});

module.exports = router;
