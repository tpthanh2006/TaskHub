//Give server.js permission to access MongoDB URI
const dotenv = require("dotenv").config();

const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel")
const taskRoutes = require("./routes/taskRoute");

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(taskRoutes);

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