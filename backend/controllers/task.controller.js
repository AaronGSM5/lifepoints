const TaskServices = require("../services/task.services")

const getAllTasks = async (req, res) => {
  const data = await TaskServices.getAllTasks()

  res.status(200).json(data)
}

module.exports = { getAllTasks }