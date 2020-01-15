const express = require("express");
const app = express();
const port = 8001;
require("dotenv/config");

// Routes Imports.
const moviesRoutes = require("./routes/movies/movies.routes");
const authRoutes = require("./routes/auth/auth.routes");
// Middlewares
app.use(express.json());
app.use("/api", moviesRoutes);
app.use("/auth", authRoutes);

// Database
const mongoose = require("mongoose");

// Connect to Mongodb
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
