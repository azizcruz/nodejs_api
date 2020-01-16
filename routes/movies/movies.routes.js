const express = require("express");
const router = express.Router();
const Movie = require("../../models/movies.model");
const User = require("../../models/user.model");
const verfyToken = require("../auth/verifyToken");

const { movieValidation } = require("../../validation");
router.get("/movies/", verfyToken, async (req, res) => {
  // Get all movies
  try {
    const movies = await Movie.find()
      .populate("user")
      .sort({ release_date: 1 });
    if (movies.length === 0) return res.json({ message: "no movies" });
    else return res.json(movies);
  } catch (err) {
    return res.json({ message: err });
  }
});

router.get("/movies/:id", verfyToken, async (req, res) => {
  // Get One movie
  try {
    const movie = await Movie.findById(req.params.id).populate("user");
    if (movie) return res.json(movie);
    else return res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/movies/", verfyToken, async (req, res) => {
  // Validate
  const result = movieValidation(req.body);
  const { error } = result;
  if (error) {
    return res.json(error);
  }

  // Save movie
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    release_date: req.body.release_date,
    user: req.user._id
  });

  try {
    // Add movie to user
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { movies: movie._id } },
      { new: true }
    );
    const m = await movie.save();
    res.json({
      status: "success",
      message: "Movie was created.",
      movie: m
    });
  } catch (e) {
    return res.send(e);
  }
});

router.delete("/movies/:id", verfyToken, async (req, res) => {
  // Get One movie
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // Delete The Movie.
      const isDeleted = await Movie.deleteOne({ _id: req.params.id });
      const isUpdated = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { movies: movie.id } }
      );
      if (isDeleted && isUpdated)
        return res.json({ message: `${movie.name} was deleted.` });
    } else return res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/movies/:id", verfyToken, async (req, res) => {
  // Update a movie fields.
  try {
    const updatedObject = req.body;
    const isUpdated = await Movie.findByIdAndUpdate(
      req.params.id,
      updatedObject,
      { new: true }
    );
    debugger;
    if (isUpdated) return res.json(isUpdated._doc);
    else return res.json({ message: "Not Found" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
