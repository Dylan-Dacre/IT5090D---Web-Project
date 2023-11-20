const express = require("express");
const router = express.Router();
const getTasks = require("./repository");
const getLists = require("./repository");
const getNotes = require("./repository");
const getTask = require("./repository");
const getList = require("./repository");
const getNote = require("./repository");
const createTask = require("./repository");
const createList = require("./repository");
const createNote = require("./repository");
const { checkJwt } = require("../middleware/authorizationMiddleware");

// Get all items

router.get("/tasks", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const tasks = await getTasks.getTasks(userId);
    return res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/lists", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const lists = await getLists.getLists(userId);
    return res.json(lists);
  } catch (err) {
    next(err);
  }
});

router.get("/notes", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const notes = await getNotes.getNotes(userId);
    return res.json(notes);
  } catch (err) {
    next(err);
  }
});

// Get an item by id

router.get("/tasks/:id", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const id = req.params.id;
    const task = await getTask.getTask(userId, id);
    return res.json(task);
  } catch (err) {
    next(err);
  }
});

router.get("/lists/:id", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const id = req.params.id;
    const list = await getList.getList(userId, id);
    return res.json(list);
  } catch (err) {
    next(err);
  }
});

router.get("/notes/:id", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const id = req.params.id;
    const note = await getNote.getNote(userId, id);
    return res.json(note);
  } catch (err) {
    next(err);
  }
});

// Create an item

router.post("/tasks", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const taskData = req.body;
    const task = await createTask.createTask(userId, taskData);
    return res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/lists", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const listData = req.body;
    const list = await createList.createList(userId, listData);
    return res.json(list);
  } catch (err) {
    next(err);
  }
});

router.post("/notes", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const noteData = req.body;
    const note = await createNote.createNote(userId, noteData);
    return res.json(note);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
