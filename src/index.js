const mongoose = require("mongoose");
const { User } = require("./models/User");
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.DB_URI);
  console.log("Connected to DB");

  // Create
  //   const user1 = await User.create({ firstName: "John", lastName: "Lake" });
  //   console.log(user1);

  //   const users = await User.insertMany([
  //     { firstName: "John", lastName: "Buddy" },
  //     { firstName: "Brad", lastName: "Cooper" },
  //   ]);
  //   console.log(users);

  // Read
  //   const users = await User.find({ firstName: "John" }); // Returns an array of documents
  //   console.log(users);

  //   const user = await User.findOne({ firstName: "John" }); // Returns a single document
  //   console.log(user);

  //   const user = await User.findById("61fe7b163bf7860a98de700d"); // Returns a single document
  //   console.log(user);

  // Update
}

main();
