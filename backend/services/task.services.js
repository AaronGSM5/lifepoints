import mockTasks from "../lib/data/tasks.js"
import mockUserTasks from '../lib/data/user-task.js'

const getAllTasks = async () => {
  return mockTasks
}

const getUserTasks = async () => {
  return mockUserTasks
}

export default { getAllTasks, getUserTasks }