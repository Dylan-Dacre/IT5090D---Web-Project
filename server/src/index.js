require("dotenv").config({ path: "./.env" });
const app = require("./app");

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API Server has started on port ${port}`);
});
