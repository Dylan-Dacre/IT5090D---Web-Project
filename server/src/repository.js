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
      const task = await Task.findOne({ userId, _id: taskId });
      return task;
    } catch (err) {
      throw new Error(err);
    }
  },

  getList: async (userId, listId) => {
    try {
      const list = await List.findOne({ userId, _id: listId });
      return list;
    } catch (err) {
      throw new Error(err);
    }
  },

  getNote: async (userId, noteId) => {
    try {
      const note = await Note.findOne({ userId, _id: noteId });
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
};
