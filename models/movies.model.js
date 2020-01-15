const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Movie", MovieSchema);
