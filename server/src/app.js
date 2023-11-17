const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const e = require("express");

const app = express();

app.use(cors());
app.use(express.json());
