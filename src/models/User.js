const mongoose = require("mongoose");
const { petSchema } = require("./Pet");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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

// Impose uniqueness
userSchema.plugin(uniqueValidator);

userSchema.pre("save", function (next) {
  console.log(`Saving User: ${this.firstName} ${this.lastName}`);
  next();
});

userSchema.post("save", function () {
  console.log(`User saved: ${this.firstName} ${this.lastName}`);
});

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

const User = mongoose.model("User", userSchema);

module.exports = {
  userSchema,
  User,
};
