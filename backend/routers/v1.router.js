const express = require("express");
const TaskController = require("../controllers/task.controller")

const router = express.Router();

router.get("/healthcheck", (res) => res.send("server is running"))

router.get("/tasks", TaskController.getAllTasks)

module.exports = router