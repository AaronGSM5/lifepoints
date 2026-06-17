import UserTasksServices from "@/services/user-tasks.services.js";

const getUsersActiveTasks = async (req, res) => {
  const {id} = {id: "65f1a2b3c4d5e6f7a8b90123"} // Should be pulled from access token later

  const data = await UserTasksServices.getUsersActiveTasks(id)

  res.status(200).json(data)
}

const getUsersTaskHistory = async (req, res) => {
  const {id} = {id: "65f1a2b3c4d5e6f7a8b90123"} // Should be pulled from access token later

  const data = await UserTasksServices.getUsersTaskHistory(id)

  res.status(200).json(data)
}

export default { getUsersActiveTasks, getUsersTaskHistory }