const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
  // mongoddb will automatically create an ID for each document
});

module.exports = mongoose.model("Author", authorSchema); //making a collection in Mongodb
