const getDBConnection = require("../database/db.js");

module.exports = function (app) {
  app.get("/equipments", async (req, res) => {
    try {
      const db = await getDBConnection();

      const { query, category, status, bookingStart, bookingEnd } = req.query;

      console.log("req.query: ", req.query);

      let sqlQuery = "SELECT * FROM Equipment WHERE 1=1";
      let queryParams = [];

      if (query) {
        sqlQuery += " AND item_name LIKE ?";
        queryParams.push(`%${query}%`);
      }

      if (category) {
        sqlQuery += " AND type_ = ?";
        queryParams.push(category);
      }

      if (status) {
        const statuses = status.split(",");
        let statusConditions = [];

        statuses.forEach((statusValue) => {
          switch (statusValue.trim()) {
            case "available":
              statusConditions.push(`item_status = 'available'`);
              break;
            case "in-use":
              statusConditions.push(`item_status = 'in-use'`);
              break;
            case "maintenance":
              statusConditions.push(`item_status = 'maintenance'`);
              break;
            case "broken":
              statusConditions.push(`item_status = 'broken'`);
              break;
          }
        });

        if (statusConditions.length > 0) {
          sqlQuery += ` AND (${statusConditions.join(" OR ")})`;
        }
      }

      if (bookingStart) {
        sqlQuery +=
          " AND booking_starts > ? OR (booking_starts IS NULL AND item_status = 'available') ";
        queryParams.push(bookingStart);
      }

      if (bookingEnd) {
        sqlQuery +=
          " AND booking_ends < ? OR (booking_ends IS NULL AND item_status = 'available') ";
        queryParams.push(bookingEnd);
      }

      console.log("sqlQuery: ", sqlQuery);
      console.log("queryParams: ", queryParams);

      let results = await db.all(sqlQuery, queryParams);

      const equipments = results.map((item) => ({
        ID: item.item_id,
        Name: item.item_name,
        ImageURL: item.image_url,
        Status: item.item_status,
        Begin: {
          Time: item.booking_starts,
          Valid: true,
        },
        End: {
          Time: item.booking_ends,
          Valid: true,
        },
      }));

      res.json({ equipments });
      await db.close();
    } catch (error) {
      console.error(error);
      res.status(500).send("Database error");
    }
  });
};
