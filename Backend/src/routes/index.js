const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(), // how long server has been running
    timestamp: Date.now(), // current time
    memoryUsage: process.memoryUsage(), // optional: memory details
  });
});

app.use((req, res, next) => {
  res.status(400).json({
    message: "Not found",
  });
});

module.exports = app;
