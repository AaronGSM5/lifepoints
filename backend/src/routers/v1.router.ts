import express from "express"
import TaskController from "../controllers/task.controller.js"
import UserController from '../controllers/user.controller.js'
import UserTasksController from "@/controllers/user-tasks.controller.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => res.send("server is running"))

router.get("/tasks", TaskController.getAllTasks)
router.get("/tasks/limited", () => console.log('must be implemented'))
router.get("/tasks/:id", () => console.log('must be implemented'))
router.post("/tasks/suggest", () => console.log('must be implemented'))
// router.put("/tasks/favorite", () => console.log('must be implemented'))

router.get("/user/all", UserController.getUserInfo)
router.get("/user/me", () => console.log('must be implemented'))

router.get("/user-tasks/active", UserTasksController.getUsersActiveTasks)
router.get("/user-tasks/history", UserTasksController.getUsersTaskHistory)
router.post("/user-tasks/start", () => console.log('must be implemented'))
router.put("/user-tasks/:id/complete", () => console.log('must be implemented'))

router.get("/trophies", () => console.log('must be implemented'))
router.post("/trophies/:id/claim", () => console.log('must be implemented'))

router.put("/communities", () => console.log('must be implemented'))
router.post("/communities//create", () => console.log('must be implemented'))
router.post("/communities/:id/join", () => console.log('must be implemented'))
router.put("/communities/:id/leave", () => console.log('must be implemented'))
router.put("/communities/:id/upgrade", () => console.log('must be implemented'))

router.get("/events/active", () => console.log('must be implemented'))

router.get("/posts", () => console.log('must be implemented')) // return soll der public feed / community feed sein


// router.get("/implement", () => console.log('must be implemented'))

export default router