//This is the index.js file
const express = require("express");
const mongoose = require("mongoose");
const signuproutes = require("./routes/signuproutes");
const loginroutes = require("./routes/loginroutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
const mongoURI = "mongodb://localhost:27017/carrental";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use("/carrental", signuproutes);
app.use("/carrental", loginroutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
