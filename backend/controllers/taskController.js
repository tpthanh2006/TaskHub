// Save task callback functions
const Task = require("../models/taskModel");

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

// Get a Task
const getTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Task.findById(id);

    // If task is not found
    if (!task) {
      return res.status(404).json(`Task not found with id: ${id}`);
    }

    // If task is found
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

// Delete a Task
const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Task.findByIdAndDelete(id);

    // If task is not found
    if (!task) {
      res.status(404).json(`No task with id: ${id}`)
    };

    res.status(200).send(`Task Deleted`);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

//  Update a Task
const updateTask = async(req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(
      id, //  Added directly instead of as an object
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // If task is not found
    if (!task) {
      return res.status(404).json(`Task not found with id: ${id}`);
    }

    // If task is found
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
};