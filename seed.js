const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./models/book");

mongoose.connect(process.env.DATABASE_URL);

async function seed() {
  await Book.create({ title: "All Systems Red", description: "Book 1 of 'The Murderbot Diaries' by Martha Wells", status: true});
  console.log("Added book 1 to the can.");
  await Book.create({ title: "The Way of Kings", description: "Book 1 of 'The Stormlight Archive' by Brandon Sanderson", status: true});
  console.log("Added book 2 to the can.");
  await Book.create({ title: "Treasure Islands: Tax Havens and the Men who Stole the World", description: "Investigative journalism describing the inner-workings of tax-havens by Nicholas Shaxson", status: true});
  console.log("Added book 3 to the can.");
  mongoose.disconnect();
}

seed();