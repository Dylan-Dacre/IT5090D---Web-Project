const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/data";

async function connect() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = {
  connect,
  disconnect,
};
