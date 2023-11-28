const express = require("express");
const router = express.Router();
const getLists = require("../src/repository");
const createList = require("../src/repository");
const updateList = require("../src/repository");
const deleteList = require("../src/repository");
const { checkJwt } = require("../middleware/authorizationMiddleware");

// Get all items

router.get("/", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const lists = await getLists.getLists(userId);
    const listsArray = Array.isArray(lists) ? lists : [lists];
    return res.status(200).json(listsArray);
  } catch (err) {
    next(err);
  }
});

// Get an item by id

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const listId = req.params.id;
    const list = await getList.getList(userId, listId);
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
});

// Post an item

router.post("/", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const body = req.body;
    const listBody = { ...body, userId };
    const list = await createList.createList(listBody);
    return res.status(201).json(list);
  } catch (err) {
    next(err);
  }
});

// Edit an item

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const listId = req.params.id;
    const body = req.body;
    const listBody = { ...body, userId };
    const list = await updateList.updateList(userId, listId, listBody);
    return res.status(201).json(list);
  } catch (err) {
    next(err);
  }
});

// Delete an item

router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const listId = req.params.id;
    const list = await deleteList.deleteList(userId, listId);
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
