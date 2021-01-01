const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorID: String,
  // mongoddb will automatically create an ID for each document
});

module.exports = mongoose.model("Book", bookSchema); //making a collection in Mongodb
