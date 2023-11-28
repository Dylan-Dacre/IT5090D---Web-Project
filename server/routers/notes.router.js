const express = require("express");
const router = express.Router();
const getNotes = require("../src/repository");
const createNote = require("../src/repository");
const updateNote = require("../src/repository");
const deleteNote = require("../src/repository");
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

// Get an item by id

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const noteId = req.params.id;
    const note = await getNote.getNote(userId, noteId);
    return res.status(200).json(note);
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

// Edit an item

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const noteId = req.params.id;
    const body = req.body;
    const noteBody = { ...body, userId };
    const note = await updateNote.updateNote(userId, noteId, noteBody);
    return res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

// Delete an item

router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const noteId = req.params.id;
    const note = await deleteNote.deleteNote(userId, noteId);
    return res.status(200).json(note);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
