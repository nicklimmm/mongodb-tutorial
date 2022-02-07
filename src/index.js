const mongoose = require("mongoose");
const { User } = require("./models/User");
const { Pet } = require("./models/Pet");
require("dotenv").config();

async function main() {
  const conn = await mongoose.connect(process.env.DB_URI);
  await conn.connection.db.dropDatabase();

  console.log("Connected to DB");

  // Create
  //   const user1 = await User.create({ firstName: "John", lastName: "Lake" });
  //   console.log(user1);

  const pet1 = new Pet({ name: "Klaus", type: "Cat" });
  await pet1.save();
  const pet2 = new Pet({ name: "Goofy", type: "Dog" });
  await pet2.save();
  const pet3 = await Pet.create({ name: "Carly", type: "Frog" });

  await User.insertMany([
    {
      firstName: "John",
      lastName: "Buddy",
      age: 20,
      address: { city: "Sydney", country: "Australia" },
      pets: [pet1],
    },
    {
      firstName: "Brad",
      lastName: "Cooper",
      age: 23,
      address: { city: "Jakarta", country: "Indonesia" },
      pets: [pet2, pet3],
    },
  ]);

  // Read
  //   const users = await User.find({ firstName: "John" }); // Returns an array of documents
  //   console.log(users);

  //   const user = await User.findOne({ firstName: "John" }); // Returns a single document
  //   console.log(user);

  // const user = await User.findOne({ firstName: "Brad" }); // Returns a single document
  // console.log(user.fullName);
  // console.log(user.address);

  const users = await User.find().where("age").lte(23);
  console.log(users);

  // Update
  // await User.updateOne({ firstName: "John" }, { $set: { lastName: "Lennon" } }); // 1 step
  // console.log(await User.findOne({ lastName: "Lennon" }));

  const john = await User.findOne({ firstName: "John" }); // 2 steps: query & set
  john.lastName = "Lennon"; // Update lastName

  const pet4 = await Pet.create({ name: "Jake", type: "Dog" }); // create new pet
  john.pets.push(pet4); // add new pet
  await john.save();

  console.log(await User.findOne({ lastName: "Lennon" }));
}

main();
