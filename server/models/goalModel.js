const mongoose = require("mongoose");
const { Schema } = mongoose;

const goalSchema = new Schema({
  userId: { type: String, required: true },
  id: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: false },
  dateCreated: { type: Date, required: true },
  dateCompleted: { type: Date, required: false },
  completed: { type: Boolean, required: true },
});

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
