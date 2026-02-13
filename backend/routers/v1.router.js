import express from "express"
import TaskController from "../controllers/task.controller.js"

const router = express.Router();

router.get("/healthcheck", (res) => res.send("server is running"))

router.get("/tasks", TaskController.getAllTasks)

export default router