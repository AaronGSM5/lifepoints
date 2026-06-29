import mockTasks from "../lib/data/tasks.js";

const getAllTasks = async () => {
  return mockTasks;
};

const getTasks = async ({ filter }) => {
  const data = mockTasks.filter((mockTask) => mockTask.status === "active");

  return data;
};

export default { getAllTasks, getTasks };
