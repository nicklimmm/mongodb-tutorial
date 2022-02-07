const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  userSchema,
  User,
};
