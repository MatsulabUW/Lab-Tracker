const getDBConnection = require("../database/db.js");

module.exports = function (app) {
  // Debugging endpoint to check if server is running
  app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

  app.get("/supplies", async (req, res) => {
    try {
      const db = await getDBConnection();

      const { query, category, status, expiresBefore, expiresAfter } =
        req.query;

      console.log("query: ", query);

      // Here you would typically fetch data from a database or another source
      // For this example, we're just returning the received parameters
      const responseData = {
        query: query,
        category: category,
        status: status ? status.split(",") : [],
        expiresBefore: expiresBefore,
        expiresAfter: expiresAfter,
      };

      let results = await db.all(query);

      res = await getAllItems("Supplies");

      res.json(responseData);

      await db.close();
    } catch (error) {
      res.status(500).send("Database error");
    }
  });
};

/**
 * Get all items data / get specific item data by id
 */
app.get("/items", async (req, res) => {
  let itemType = req.query.itemType; // 'Supplies', 'Equipment'
  let id = req.query.id; // ID of item 'item_id'
  let results = undefined;
  if (!itemType) {
    res
      .status(CLNT_ERR)
      .type("text")
      .send("Missing one or more of the required params.");
  } else {
    if (!id) {
      results = await getAllItems(itemType);
    } else {
      results = await getItemById(itemType, id);
    }
    if (results === "An error occurred on the server. Try again later.") {
      res
        .status(SRVR_ERR)
        .type("text")
        .send("An error occurred on the server. Try again later.");
    } else {
      res.json({ items: results });
    }
  }
});

/**
 * getAllItems:
 * One sentence Description
 * @param {*} itemType - what is this variable
 * @returns {String} what do we return?
 */
async function getAllItems(itemType) {
  try {
    let db = await getDBConnection();
    let query = "SELECT * FROM " + itemType;
    let results = await db.all(query);
    await db.close();
    return results;
  } catch (err) {
    return "An error occurred on the server. Try again later.";
  }
}

/**
 * getItemById
 * one sentence Description
 * @param {*} itemType - What does this variable represent?
 * @param {*} id - What does this variable represent?
 * @returns {String} What do we return?
 */
async function getItemById(itemType, id) {
  try {
    let db = await getDBConnection();
    let query = "SELECT * FROM " + itemType + " WHERE item_id = ?";
    let results = await db.all(query, id);
    await db.close();
    return results;
  } catch (err) {
    return "An error occurred on the server. Try again later.";
  }
}
