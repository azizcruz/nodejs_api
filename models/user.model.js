const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    min: 6,
    max: 50,
    required: true,
    unique: true
  },
  email: {
    type: String,
    min: 6,
    max: 255,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now()
  },
  updated_date: {
    type: Date,
    default: null
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
