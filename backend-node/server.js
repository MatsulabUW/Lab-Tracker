"use strict";

const express = require("express");
const multer = require("multer"); // required to support POST endpoint
const cors = require("cors");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

// const fs = require('fs').promises; // node module to interact with files // debug statement 🐞
const app = express();
const DEFAULT_PORT = 8080;

// for application /x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormdData)
app.use(multer().none()); // requires the "multer" module
app.use(cors()); // Cross-allows all origins

require("./routes")(app);

app.use(express.static("public"));
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT); // Run the server on port 8000
