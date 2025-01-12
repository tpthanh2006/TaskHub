//Give server.js permission to access MongoDB URI
const dotenv = require("dotenv").config();

const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel")
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");
const path = require("path");

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Cors need to come on top of routes
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://taskhub-l93f.onrender.com"],
}));

app.use("/api/tasks", taskRoutes);

// DEPLOYMENT CODE
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html"));
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

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