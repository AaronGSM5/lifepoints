const mockTasks = require("../lib/data/tasks")

const getAllTasks = async () => {
  return mockTasks
}

module.exports = { getAllTasks }