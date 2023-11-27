const express = require("express");
const router = express.Router();
const getTasks = require("./repository");
const getTask = require("./repository");
const createTask = require("./repository");
const editTask = require("./repository");
const deleteTask = require("./repository");
const { checkJwt } = require("../middleware/authorizationMiddleware");

// Get all items

router.get("/", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const tasks = await getTasks.getTasks(userId);
    const tasksArray = Array.isArray(tasks) ? tasks : [tasks];
    return res.status(200).json(tasksArray);
  } catch (err) {
    next(err);
  }
});

// Get an item by id

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const taskId = req.params.id;
    const task = await getTask.getTask(userId, taskId);
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

// Post an item

router.post("/", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const body = req.body;
    const taskBody = { ...body, userId };
    const task = await createTask.createTask(taskBody);
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// Edit an item

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const taskId = req.params.id;
    const body = req.body;
    const taskBody = { ...body, userId };
    const task = await editTask.editTask(userId, taskId, taskBody);
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// Delete an item

router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const taskId = req.params.id;
    const task = await deleteTask.deleteTask(userId, taskId);
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
