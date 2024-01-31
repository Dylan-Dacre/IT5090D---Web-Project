const express = require("express");
const cors = require("cors");
const app = express();
const tasksRouter = require("../routers/tasks.router");
const listsRouter = require("../routers/lists.router");
const notesRouter = require("../routers/notes.router");
const goalsRouter = require("../routers/goals.router");
const { checkJwt } = require("../middleware/authorizationMiddleware");
const errorHandler = require("../middleware/errorHandlingMiddleware");

const corsOptions = {
  origin: [
    "https://moodoo.app",
    "https://api.moodoo.app",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/tasks", checkJwt, tasksRouter);
app.use("/api/lists", checkJwt, listsRouter);
app.use("/api/notes", checkJwt, notesRouter);
app.use("/api/goals", checkJwt, goalsRouter);

app.use(errorHandler);

module.exports = app;
