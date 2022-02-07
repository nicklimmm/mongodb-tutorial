const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model("User", carSchema);

module.exports = {
  Car,
  carSchema,
};
