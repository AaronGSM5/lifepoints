import TaskServices from "../services/task.services.js"

const getAllTasks = async (req, res) => {
  const data = await TaskServices.getAllTasks()

  res.status(200).json(data)
}

export default { getAllTasks }