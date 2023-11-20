const { MongoClient } = require("mongodb");

const connectionString = "mongodb://localhost:27017/xxx";

let db;

async function connect() {
  if (!db) {
    const client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      db = client.db();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    }
  }

  return db;
}

function getDb() {
  if (!db) {
    throw new Error("Call connect() first");
  }
  return db;
}

module.exports = {
  connect,
  getDb,
};
