module.exports = function (app) {
  // Debugging endpoint to check if server is running
  app.get("/message1", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
};
