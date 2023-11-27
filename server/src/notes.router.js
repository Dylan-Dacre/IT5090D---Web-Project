const express = require("express");
const router = express.Router();
const getNotes = require("./repository");
const createNote = require("./repository");
const { checkJwt } = require("../middleware/authorizationMiddleware");

// Get all items

router.get("/", checkJwt, async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const notes = await getNotes.getNotes(userId);
    const notesArray = Array.isArray(notes) ? notes : [notes];
    return res.status(200).json(notesArray);
  } catch (err) {
    next(err);
  }
});

// Post an item

router.post("/", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const body = req.body;
    const noteBody = { ...body, userId };
    const note = await createNote.createNote(noteBody);
    return res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
