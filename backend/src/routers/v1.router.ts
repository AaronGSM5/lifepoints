import express from "express"
import TaskController from "../controllers/task.controller.js"
import UserController from '../controllers/user.controller.js'

const router = express.Router();

router.get("/healthcheck", (req, res) => res.send("server is running"))

router.get("/task/all", TaskController.getAllTasks)
router.get("/task/user/:id", TaskController.getUserTasks)

router.get("/user/all", UserController.getUserInfo)
router.get("/user/:id", UserController.getUserInfo)

export default router