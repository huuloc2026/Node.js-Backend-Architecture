require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const router = require("../src/routes/index");
const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
require("./dbs/init.mongodb");

// const {checkOverload} = require('./helpers/check.connect')
// checkOverload()

//init routes
app.use("", router);

//handle error
// Global Error Handling Middleware (This should be the last middleware)
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    error: err.message || err,
  });
});
if (process.env.NODE_ENV === "development") {
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1); // Exit the process with failure code
  });

  // Catch uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1); // Exit the process with failure code
  });
}

module.exports = app;
