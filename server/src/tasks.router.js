const express = require("express");
const router = express.Router();
const getTasks = require("./repository");
const createTask = require("./repository");
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

module.exports = router;
