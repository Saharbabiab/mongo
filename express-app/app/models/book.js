const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BookSchema = new Schema({
  title: String,
  publishingyear: Number,
  genres: [String],
  authors: [{ type: Schema.Types.ObjectId, ref: "Authors" }],
  quantity: Number,
  price: Number,
});

const Book = model("Books", BookSchema);
module.exports = Book;
