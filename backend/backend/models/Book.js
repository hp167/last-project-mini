const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: String,
  price: {
    type: Number,
    required: true
  },
  description: String
});

module.exports = mongoose.model("Book", BookSchema);
