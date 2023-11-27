const express = require("express");
const router = express.Router();
const getLists = require("./repository");
const createList = require("./repository");
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

module.exports = router;
