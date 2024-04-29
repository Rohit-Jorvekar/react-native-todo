import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskSchema.js";


// create

export const createTask = catchAsyncErrors(async (req, res, next) => {
  const { title, description,duedate,priority,project,status } = req.body;
  const createdBy = req.user._id;
  const task = await Task.create({
    title,
    description,
    duedate,
    priority,
    project,
    status,
    createdBy,
  });
  res.status(200).json({
    success: true,
    task,
    message: "Task Created",
  });
});

// delete

export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task Deleted!",
  });

  /////make sure to delete a task provide task id not user id
});
// update

export const updateTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }
  task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Task Updated!",
    task,
  });
  /////make sure to update a task provide task id not user id
});

//get task
export const getMyTask = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const tasks = await Task.find({ createdBy: user });
  res.status(200).json({
    success: true,
    tasks,
    message:"task fetch successfully with user"
  });

////here user get
// //here created task id matech to createdby then all these task get fetched
});

//get single task

export const getSingleTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }
  res.status(200).json({
    success: true,
    task,
  });
});
