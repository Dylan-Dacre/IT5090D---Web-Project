const express = require("express");
const router = express.Router();
const getGoals = require("../src/repository");
const getGoal = require("../src/repository");
const createGoal = require("../src/repository");
const updateGoal = require("../src/repository");
const deleteGoal = require("../src/repository");
const { checkJwt } = require("../middleware/authorizationMiddleware");

// Get all items

router.get("/", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const goals = await getGoals.getGoals(userId);
    const goalsArray = Array.isArray(goals) ? goals : [goals];
    return res.status(200).json(goalsArray);
  } catch (err) {
    next(err);
  }
});

// Get an item by id

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const goalId = req.params.id;
    const goal = await getGoal.getGoal(userId, goalId);
    return res.status(200).json(goal);
  } catch (err) {
    next(err);
  }
});

// Post an item

router.post("/", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const body = req.body;
    const goalBody = { ...body, userId };
    const goal = await createGoal.createGoal(goalBody);
    return res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
});

// Edit an item

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const goalId = req.params.id;
    const body = req.body;
    const goalBody = { ...body, userId };
    const goal = await updateGoal.updateGoal(userId, goalId, goalBody);
    return res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
});

// Delete an item

router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const goalId = req.params.id;
    await deleteGoal.deleteGoal(userId, goalId);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
