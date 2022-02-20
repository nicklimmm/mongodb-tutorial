const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../models/User");

router.post("/register", async (req, res) => {
  /* 
    Steps
    - check if username is not in db (unique username)
    - save new user
    */
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ message: "User with that username exists" });
  }

  await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  });
  res.json({ message: "Register successful" });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful" });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
});

module.exports = router;
