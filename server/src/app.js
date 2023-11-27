const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const api = require("../api/api");
const swaggerUi = require("swagger-ui-express");
const { checkJwt } = require("../middleware/authorizationMiddleware");
const errorHandler = require("../middleware/errorHandlingMiddleware");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", checkJwt, router);
app.use("/api/lists", checkJwt, router);
app.use("/api/notes", checkJwt, router);
app.use("/", swaggerUi.serve, swaggerUi.setup(api));

app.use(errorHandler);

module.exports = app;
