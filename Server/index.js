const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://artwingdesigns2022:artwingdesigns2022@cluster0.xk7znyw.mongodb.net/bookdb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on('error', (err) => {
  console.error("MongoDB connection error:", err);
});

// start server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// define routes
const booksRoute = require("./routes/routes");
app.use("/api/books", booksRoute);
