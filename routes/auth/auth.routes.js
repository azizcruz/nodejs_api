const express = require("express");
const router = express.Router();
const User = require("./../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../../validation");

// Register
router.post("/register", async (req, res) => {
  // Validate Data
  const result = registerValidation(req.body);
  const { error } = result;
  if (error) {
    return res.json(error);
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const newUser = await user.save();
    res.json(newUser._id);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  // Validate Data Coming
  const result = loginValidation(req.body);
  const { error } = result;
  if (error) {
    return res.json(error);
  }
  // Check If User Exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "You are not registered." });

  // Check Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ message: "Password is wrong." });

  // Create Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return res.header("auth-token", token).json({
    user: user._id,
    token: token
  });
});

module.exports = router;
