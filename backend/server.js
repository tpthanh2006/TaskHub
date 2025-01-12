//Give server.js permission to access MongoDB URI
const dotenv = require("dotenv").config();
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
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
app.use(
  cors()
);

app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
  });
} else {
  // Routes
  app.get('/', (req, res) => {
  res.send('Home Page');
  }); 
}

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then( async () => {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

startServer();