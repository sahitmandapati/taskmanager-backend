const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../errors/custom-error')

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ tasks });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// const getTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOne({ _id: taskID });
//     // if string length same and id not present then will display below error
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id :${taskID}` });
//     }
//     //if random value then displays moongoose inbuild error
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const getTask = asyncWrapper(async (req, res , next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  // if string length same and id not present then will display below error
  if (!task) {
    // const error = new Error('Not Found')
    // error.status = 404
    // return next(error)
    return next(createCustomError(`No task with id :${taskID}`,404))
  }
  //if random value then displays moongoose inbuild error
  res.status(200).json({ task });
});

// const updateTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;

//     const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!task) {
//       return res.status(404).json({ msg: `No task with id :${taskID}` });
//     }

//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id :${taskID}`,404))
  }

  res.status(200).json({ task });
});

// const deleteTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndDelete({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id :${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id :${taskID}`,404))
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
