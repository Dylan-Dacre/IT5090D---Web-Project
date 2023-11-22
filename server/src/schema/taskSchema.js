const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  subtasks: { type: Array, required: false },
  completed: { type: Boolean, required: true },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
