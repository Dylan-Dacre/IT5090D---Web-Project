const db = require("./db");

module.exports = {
  // Get all items

  getTasks: async (userId) => {
    try {
      const database = await db.connect();
      const tasks = await database
        .collection("Tasks")
        .find({ userId })
        .toArray();
      return tasks;
    } catch (err) {
      throw new Error(err);
    }
  },

  getLists: async (userId) => {
    try {
      const database = await db.connect();
      const lists = await database
        .collection("Lists")
        .find({ userId })
        .toArray();
      return lists;
    } catch (err) {
      throw new Error(err);
    }
  },

  getNotes: async (userId) => {
    try {
      const database = await db.connect();
      const notes = await database
        .collection("Notes")
        .find({ userId })
        .toArray();
      return notes;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Get an item by id

  getTask: async (userId, id) => {
    try {
      const database = await db.connect();
      const task = await database
        .collection("Tasks")
        .find({ userId, id })
        .toArray();
      return task;
    } catch (err) {
      throw new Error(err);
    }
  },

  getList: async (userId, id) => {
    try {
      const database = await db.connect();
      const list = await database
        .collection("Lists")
        .find({ userId, id })
        .toArray();
      return list;
    } catch (err) {
      throw new Error(err);
    }
  },

  getNote: async (userId, id) => {
    try {
      const database = await db.connect();
      const note = await database
        .collection("Notes")
        .find({ userId, id })
        .toArray();
      return note;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Create an item

  createTask: async (userId, taskData) => {
    try {
      const database = await db.connect();
      const result = await database.collection("Tasks").insertOne({
        userId,
        taskData,
      });

      if (result.insertedCount === 1) {
        return { success: true, taskId: result.insertedId };
      } else {
        return { success: false, error: "Task creation failed" };
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  createList: async (userId, listData) => {
    try {
      const database = await db.connect();
      const result = await database.collection("Lists").insertOne({
        userId,
        listData,
      });

      if (result.insertedCount === 1) {
        return { success: true, listId: result.insertedId };
      } else {
        return { success: false, error: "List creation failed" };
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  createNote: async (userId, noteData) => {
    try {
      const database = await db.connect();
      const result = await database.collection("Notes").insertOne({
        userId,
        noteData,
      });

      if (result.insertedCount === 1) {
        return { success: true, noteId: result.insertedId };
      } else {
        return { success: false, error: "Note creation failed" };
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};
