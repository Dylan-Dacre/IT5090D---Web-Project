const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
