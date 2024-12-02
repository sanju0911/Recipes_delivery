const mongoose = require("mongoose");
const dotnev = require("dotenv").config();

const db = mongoose
  .connect(process.env.MONGO_URl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(error);
  });

module.exports = db;
