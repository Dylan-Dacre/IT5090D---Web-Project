const Task = require("../models/taskModel");
const List = require("../models/listModel");
const Note = require("../models/noteModel");
const db = require("./db");
db.connect();

module.exports = {
  // Get all items

  getTasks: async (userId) => {
    try {
      const tasks = await Task.find({ userId: userId, completed: false });
      return tasks;
    } catch (err) {
      throw new Error(err);
    }
  },

  getLists: async (userId) => {
    try {
      const lists = await List.find({ userId: userId });
      return lists;
    } catch (err) {
      throw new Error(err);
    }
  },

  getNotes: async (userId) => {
    try {
      const notes = await Note.find({ userId: userId });
      return notes;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Get an item by id

  getTask: async (userId, taskId) => {
    try {
      const task = await Task.findOne({ userId: userId, _id: taskId });
      return task;
    } catch (err) {
      throw new Error(err);
    }
  },

  getList: async (userId, listId) => {
    try {
      const list = await List.findOne({ userId: userId, _id: listId });
      return list;
    } catch (err) {
      throw new Error(err);
    }
  },

  getNote: async (userId, noteId) => {
    try {
      const note = await Note.findOne({ userId: userId, _id: noteId });
      return note;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Create an item

  createTask: async (taskBody) => {
    try {
      const task = new Task(taskBody);
      const savedTask = await task.save();
      return savedTask;
    } catch (err) {
      throw new Error(err);
    }
  },

  createList: async (listBody) => {
    try {
      const list = new List(listBody);
      const savedList = await list.save();
      return savedList;
    } catch (err) {
      throw new Error(err);
    }
  },

  createNote: async (noteBody) => {
    try {
      const note = new Note(noteBody);
      const savedNote = await note.save();
      return savedNote;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Update an item

  updateTask: async (userId, taskId, taskBody) => {
    try {
      const task = await Task.findOneAndUpdate(
        { userId: userId, _id: taskId },
        taskBody,
        { new: true }
      );
      return task;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateList: async (userId, listId, listBody) => {
    try {
      const list = await List.findOneAndUpdate(
        { userId: userId, _id: listId },
        listBody,
        { new: true }
      );
      return list;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateNote: async (userId, noteId, noteBody) => {
    try {
      const note = await Note.findOneAndUpdate(
        { userId: userId, _id: noteId },
        noteBody,
        { new: true }
      );
      return note;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Delete an item

  deleteTask: async (userId, taskId) => {
    try {
      const task = await Task.findOneAndDelete({ userId: userId, _id: taskId });
      return task;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteList: async (userId, listId) => {
    try {
      const list = await List.findOneAndDelete({ userId: userId, _id: listId });
      return list;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteNote: async (userId, noteId) => {
    try {
      const note = await Note.findOneAndDelete({ userId: userId, _id: noteId });
      return note;
    } catch (err) {
      throw new Error(err);
    }
  },
};
