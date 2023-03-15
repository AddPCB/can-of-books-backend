require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");
const PORT = process.env.PORT || 8080;
const app = express();
console.log(`server env: ${process.env.NODE_DEV_ENV}`);
// Use ternary operator to conditionally enable CORS when in development mode
process.env.NODE_DEV_ENV === "development"
  ? app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    })
  : null;

mongoose.connect(process.env.DATABASE_URL);

app.get("/books", async (request, response) => {
  console.log("Library Query: ", request.query);

  const query = Object.keys(request.query).length !== 0 ? request.query : {};

  try {
    const books = await Book.find(query);
    response.status(200).json(books);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
