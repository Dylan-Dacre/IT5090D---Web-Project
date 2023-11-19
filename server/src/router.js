const express = require("express");
const router = express.Router();
const getTasks = require("./repository");
const getLists = require("./repository");
const getNotes = require("./repository");
const createTask = require("./repository");
const createList = require("./repository");
const createNote = require("./repository");

// Get all items

router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await getTasks.getTasks();
    return res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/lists", async (req, res, next) => {
  try {
    const lists = await getLists.getLists();
    return res.json(lists);
  } catch (err) {
    next(err);
  }
});

router.get("/notes", async (req, res, next) => {
  try {
    const notes = await getNotes.getNotes();
    return res.json(notes);
  } catch (err) {
    next(err);
  }
});

// Get an item by id

router.get("/tasks/:id", async (req, res, next) => {
  try {
    const task = await getTasks.getTask(req.params.id);
    return res.json(task);
  } catch (err) {
    next(err);
  }
});

router.get("/lists/:id", async (req, res, next) => {
  try {
    const list = await getLists.getList(req.params.id);
    return res.json(list);
  } catch (err) {
    next(err);
  }
});

router.get("/notes/:id", async (req, res, next) => {
  try {
    const note = await getNotes.getNote(req.params.id);
    return res.json(note);
  } catch (err) {
    next(err);
  }
});

// Create an item

router.post("/tasks", async (req, res, next) => {
  try {
    const task = await createTask.createTask(req.body);
    return res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/lists", async (req, res, next) => {
  try {
    const list = await createList.createList(req.body);
    return res.json(list);
  } catch (err) {
    next(err);
  }
});

router.post("/notes", async (req, res, next) => {
  try {
    const note = await createNote.createNote(req.body);
    return res.json(note);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
