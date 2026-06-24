import TaskServices from "../services/task.services.js";
import UserTasksServices from "@/services/user-tasks.services.js";

const getAllTasks = async (req, res) => {
  const data = await TaskServices.getAllTasks();

  res.status(200).json(data);
};

const getUsersActiveTasks = async (req, res) => {
  const { id } = { id: "65f1a2b3c4d5e6f7a8b90123" }; // Should be pulled from access token later

  const data = await UserTasksServices.getUsersActiveTasks(id);

  res.status(200).json(data);
};

const getUsersTaskHistory = async (req, res) => {
  const { id } = { id: "65f1a2b3c4d5e6f7a8b90123" }; // Should be pulled from access token later

  const data = await UserTasksServices.getUsersTaskHistory(id);

  res.status(200).json(data);
};

const getTasks = async (req, res) => {
  const { filter } = req.query;

  console.log(filter);

  const data = TaskServices.getTasks({ filter });

  res.status(200).json(data);
};

export default { getAllTasks, getUsersActiveTasks, getUsersTaskHistory, getTasks };
