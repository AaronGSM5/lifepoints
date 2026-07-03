import mockUserTasks from "../lib/data/user-task.js";

const getUsersActiveTasks = async (userId) => {
  const data = mockUserTasks.filter((task) => task.user === userId && task.status === "active");
  console.log(data);
  return data;
};

const getUsersTaskHistory = async (userId) => {
  const data = mockUserTasks.filter((task) => task.user === userId && task.status !== "active");
  console.log(data);
  return data;
};

export default { getUsersActiveTasks, getUsersTaskHistory };
