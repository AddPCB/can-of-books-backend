"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./models/book");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
mongoose.connect(process.env.DATABASE_URL);

app.get("/books", async (request, response) => {
  console.log("Library Query: ", request.query);

  // try to do this code, but if it errors, instead of crashing the server, stop, and move to the catch
  try {
    const books = await Book.find(request.query);
    response.status(200).json(books);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
