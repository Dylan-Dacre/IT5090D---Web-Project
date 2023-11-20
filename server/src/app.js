const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const { checkJwt } = require("../middleware/authorizationMiddleware");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", checkJwt, router);
app.use("/api/lists", checkJwt, router);
app.use("/api/notes", checkJwt, router);

moodule.exports = app;
