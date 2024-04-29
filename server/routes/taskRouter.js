import {
  createTask,
  deleteTask,
  getMyTask,
  getSingleTask,
  updateTask,
} from "../controller/taskController.js";
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
// create
router.post("/post", isAuthenticated, createTask);

// delete by id
router.delete("/delete/:id", isAuthenticated, deleteTask);

// update by id
router.put("/update/:id", isAuthenticated, updateTask);


// get task
router.get("/mytask", isAuthenticated, getMyTask);


// get single task
router.get("/single/:id", isAuthenticated, getSingleTask);

export default router;
