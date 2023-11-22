const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "api.yaml"), "utf8")
);

module.exports = swaggerDocument;
