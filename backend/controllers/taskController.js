// Save task callback functions
const Task = require("../model/taskModel");

// Create a Task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}


// Get Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

module.exports = {
  createTask,
  getTasks,
}