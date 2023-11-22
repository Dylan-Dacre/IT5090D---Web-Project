const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  listitems: { type: Array, required: false },
});

const List = mongoose.model("List", listSchema);
module.exports = List;
