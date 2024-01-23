const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
  name: String,
  country: String,
});

const Author = model("Authors", AuthorSchema);
module.exports = Author;
