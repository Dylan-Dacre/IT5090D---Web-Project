const express = require("express");
const app = express();
const cors = require("cors");
const tasksRouter = require("./tasks.router");
const listsRouter = require("./lists.router");
const notesRouter = require("./notes.router");
const { checkJwt } = require("../middleware/authorizationMiddleware");
const errorHandler = require("../middleware/errorHandlingMiddleware");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", checkJwt, tasksRouter);
app.use("/api/lists", checkJwt, listsRouter);
app.use("/api/notes", checkJwt, notesRouter);

app.use(errorHandler);

module.exports = app;
