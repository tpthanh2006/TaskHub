//Give server.js permission to access MongoDB URI
const dotenv = require("dotenv").config();

const express = require("express");
const connectDB = require("./config/connectDB");
const { default: mongoose } = require("mongoose");

const app = express();

// Routes
app.get("", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();