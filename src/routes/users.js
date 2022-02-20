const express = require("express");
const router = express.Router();
const { protected } = require("../middlewares/auth");
const { User } = require("../models/User");

router.get("/", protected, async (req, res) => {
  // .select() here means select specific fields (if stating with '-', remove that field from results)
  const users = await User.find().select(["-password", "-address"]);
  // .populate("pets"); -> to fill up the details of the reference

  res.json(users);
});

module.exports = router;
