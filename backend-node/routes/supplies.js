const getDBConnection = require("../database/db.js");

module.exports = function (app) {
  app.get("/supplies", async (req, res) => {
    try {
      const db = await getDBConnection();

      const { query, category, status, expiresBefore, expiresAfter } =
        req.query;

      console.log("req.query: ", req.query);

      let sqlQuery = "SELECT * FROM Supplies WHERE 1=1";
      let queryParams = [];

      if (query) {
        sqlQuery += " AND item_name LIKE ?";
        queryParams.push(`%${query}%`);
      }

      if (category) {
        sqlQuery += " AND category = ?";
        queryParams.push(category);
      }

      if (status) {
        const today = new Date().toISOString();
        const twoWeeksLater = new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000
        ).toISOString();

        const statuses = status.split(",");
        let statusConditions = [];

        statuses.forEach((statusValue) => {
          switch (statusValue.trim()) {
            case "need-to-order":
              statusConditions.push(`(expire <= ? OR num_in_stock < 5)`);
              queryParams.push(twoWeeksLater);
              break;
            case "out-of-stock":
              statusConditions.push(`num_in_stock < 1`);
              break;
            case "expired":
              statusConditions.push(`expire < ?`);
              queryParams.push(today);
              break;
          }
        });

        if (statusConditions.length > 0) {
          sqlQuery += ` AND (${statusConditions.join(" OR ")})`;
        }
      }

      if (expiresBefore) {
        sqlQuery += " AND expire <= ?";
        queryParams.push(new Date(expiresBefore).toISOString());
      }

      if (expiresAfter) {
        sqlQuery += " AND expire >= ?";
        queryParams.push(new Date(expiresAfter).toISOString());
      }

      console.log("sqlQuery: ", sqlQuery);
      console.log("queryParams: ", queryParams);

      let results = await db.all(sqlQuery, queryParams);

      const supplies = results.map((item) => ({
        ID: item.item_id,
        type: "supply",
        Name: item.item_name,
        ImageURL: item.image_url,
        Expires: item.expire,
        Stock: item.num_in_stock,
      }));

      res.json({ supplies });
      await db.close();
    } catch (error) {
      console.error(error);
      res.status(500).send("Database error");
    }
  });
};
