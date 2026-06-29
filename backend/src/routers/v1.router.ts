import express from "express";
import TaskController from "../controllers/task.controller.js";
import UserController from "../controllers/user.controller.js";
import PageController from "@/controllers/page.controller.js";
import NotificationController from "@/controllers/notification.controller.js";
import EventController from "@/controllers/event.controller.js";
import CommunityController from "@/controllers/community.controller.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => res.send("server is running"));

router.get("/tasks", TaskController.getAllTasks);
router.get("/tasks/limited", (req, res) => res.send("must be implemented"));
router.get("/tasks/:id", (req, res) => res.send("must be implemented"));
router.post("/tasks/suggest", (req, res) => res.send("must be implemented"));
// router.put("/tasks/favorite", () => res.send("must be implemented"))

// router.get("/user/all", UserController.getUserInfo);

// -- PAGES --
router.get("/pages/home", PageController.getHomePage);
router.get("/pages/user", PageController.getProfilePage);
// router.get("/pages/communities", PageController.getCommunitiesPage);
router.get("/pages/tasks", (req, res) => res.send("must be implemented"));
router.get("/pages/shop", (req, res) => res.send("must be implemented"));
router.get("/pages/trophies", (req, res) => res.send("must be implemented"));
router.get("/pages/customizables", (req, res) => res.send("must be implemented"));
router.get("/pages/settings", (req, res) => res.send("must be implemented"));

router.get("/notifications", NotificationController.getNotifications);

router.get("/bootstrap", EventController.getBootstrap);

router.get("/communities/rails", CommunityController.getPaginatedCommunityRails);
router.get("/communities/categories", CommunityController.getCommunityCategories);

// router.get("/user-tasks/active", UserTasksController.getUsersActiveTasks);
// router.get("/user-tasks/history", UserTasksController.getUsersTaskHistory);
// router.post("/user-tasks/start", (req, res) => res.send("must be implemented"));
// router.put("/user-tasks/:id/complete", (req, res) => res.send("must be implemented"));

// router.get("/trophies", (req, res) => res.send("must be implemented"));
// router.post("/trophies/:id/claim", (req, res) => res.send("must be implemented"));

// router.post("/communities/create", (req, res) => res.send("must be implemented"));
// router.post("/communities/:id/join", (req, res) => res.send("must be implemented"));
// router.put("/communities/:id/leave", (req, res) => res.send("must be implemented"));
// router.put("/communities/:id/upgrade", (req, res) => res.send("must be implemented"));

// router.get("/events/active", (req, res) => res.send("must be implemented"));

// router.get("/notifications", (req, res) => res.send("must be implemented"));

// router.get("/posts", (req, res) => res.send("must be implemented")); // return soll der public feed / community feed sein
// router.get("/implement", (req,res) => res.send("must be implemented"))

export default router;
