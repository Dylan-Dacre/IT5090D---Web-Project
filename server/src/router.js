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
    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/lists", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const lists = await getLists.getLists(userId);
    return res.status(200).json(lists);
  } catch (err) {
    next(err);
  }
});

router.get("/notes", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const notes = await getNotes.getNotes(userId);
    return res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
});

// Get an item by id

router.get("/tasks/:id", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const taskId = req.params.id;
    const task = await getTask.getTask(userId, taskId);
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

router.get("/lists/:id", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const listId = req.params.id;
    const list = await getList.getList(userId, listId);
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
});

router.get("/notes/:id", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const noteId = req.params.id;
    const note = await getNote.getNote(userId, noteId);
    return res.status(200).json(note);
  } catch (err) {
    next(err);
  }
});

// Create an item

router.post("/tasks", checkJwt, async (req, res, next) => {
  try {
    const { body, auth } = req;
    const taskBody = { userId: auth.payload.sub, ...body };
    const task = await createTask.createTask(taskBody);
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/lists", checkJwt, async (req, res, next) => {
  try {
    const { body, auth } = req;
    const listBody = { userId: auth.payload.sub, ...body };
    const list = await createList.createList(listBody);
    return res.status(201).json(list);
  } catch (err) {
    next(err);
  }
});

router.post("/notes", checkJwt, async (req, res, next) => {
  try {
    const { body, auth } = req;
    const noteBody = { userId: auth.payload.sub, ...body };
    const note = await createNote.createNote(noteBody);
    return res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
