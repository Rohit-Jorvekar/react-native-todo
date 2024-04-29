import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  duedate: {
    type: Date,
  },
 priority: {
    type: String,
  },
  project: {
    type: String,
  },    
  status: {
    type: String,
    
  },
  createdBy: {
    // this is to get perticular users task
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.model("Task", taskSchema);
