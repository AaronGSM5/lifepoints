import { database } from "./database";

// DONT USE watermelondb.synchronize -> we dont want all
export const syncTasksToLocalCache = async (apiTasks) => {
  const tasksCollection = database.get("tasks");

  await database.write(async () => {
    for (const apiTask of apiTasks) {
      try {
        const existingTask = await tasksCollection.find(apiTask.id);

        await existingTask.update((task) => {
          task.title = apiTask.title;
          task.description = apiTask.description;
          task.lifepoints = apiTask.lifepoints;
          task.active = apiTask.active;
          task.image = apiTask.image || "";
          task.icon = apiTask.icon || "";
          task.estimatedTime = apiTask.estimated_time;
          // Arrays/JSON sicher konvertieren
          task.subSteps = apiTask.subSteps;
          task.category = apiTask.category;
          task.custom = apiTask.custom;
        });
      } catch (error) {
        // tasks doesnt exist localy
        await tasksCollection.create((task) => {
          task._raw.id = apiTask.id;
          task.title = apiTask.title;
          task.description = apiTask.description;
          task.lifepoints = apiTask.lifepoints;
          task.active = apiTask.active;
          task.image = apiTask.image || "";
          task.icon = apiTask.icon || "";
          task.estimatedTime = apiTask.estimated_time;
          task.subSteps = apiTask.subSteps;
          task.category = apiTask.category;
          task.custom = apiTask.custom;
          task.createdAt = apiTask.createdAt ? new Date(apiTask.createdAt).getTime() : Date.now();
          task.updatedAt = Date.now();
        });
      }
    }
  });
};
