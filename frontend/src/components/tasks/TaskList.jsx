import React from "react";
import Task from "@/components/tasks/Task";
import { mockTasks } from "@/constants/MockData";

export default function TaskList() {
  return (
    <>
      {mockTasks.map((task, index) => (
        <Task key={index} title={task.title} difficulty={task.difficulty} xp={task.xp} lp={task.lp} />
      ))}
    </>
  );
}
