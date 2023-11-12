const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

async function getDBConnection() {
  const dbPath = path.resolve(__dirname, "lab.db"); // Correctly resolve the path
  const db = await sqlite.open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  return db;
}

module.exports = getDBConnection;
