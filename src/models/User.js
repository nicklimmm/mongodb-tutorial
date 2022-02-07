const mongoose = require("mongoose");
const { petSchema } = require("./Pet");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  address: {
    type: {
      city: String,
      country: String,
    },
    get: (addr) => addr.city + ", " + addr.country,
  },
  age: {
    type: Number,
    required: true,
  },
  pets: [petSchema],
});

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

const User = mongoose.model("User", userSchema);

module.exports = {
  userSchema,
  User,
};
