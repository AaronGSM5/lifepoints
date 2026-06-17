import express from "express"
import TaskController from "../controllers/task.controller.js"
import UserController from '../controllers/user.controller.js'

const router = express.Router();

router.get("/healthcheck", (res) => res.send("server is running"))

router.get("/tasks", TaskController.getAllTasks)
router.get("/userTasks", TaskController.getUserTasks)
router.get("/user-info", UserController.getUserInfo)

export default router