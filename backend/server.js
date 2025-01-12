//Give server.js permission to access MongoDB URI
const dotenv = require("dotenv").config();

const express = require("express");
const connectDB = require("./config/connectDB");
const Task = require("./models/taskModel")
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");
const app = express();
const path = require("path");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Cors need to come on top of routes
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://taskhub-app-bf9565735ec7.herokuapp.com"],
}));

app.use("/api/tasks", taskRoutes);

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