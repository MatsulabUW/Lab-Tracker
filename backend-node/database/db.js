const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function getDBConnection() {
  const db = await sqlite.open({
    filename: "lab.db",
    driver: sqlite3.Database,
  });
  return db;
}

module.exports = getDBConnection;
