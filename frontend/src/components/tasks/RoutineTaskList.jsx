import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import ActiveTaskCard from "@/components/tasks/ActiveTaskCard";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";
import { getTaskProgress } from "@/utils/routineHelpers";
import { calculateTaskProgress } from "@/utils/taskHelpers";

// Haptisches Feedback: Routine fertig > Task fertig > einzelner Schritt
const giveFeedback = (result) => {
  if (result?.completedRoutine) triggerHaptic("success");
  else if (result?.completedTask) triggerHaptic("medium");
  else triggerHaptic();
};

// Abhakbare Task-Liste einer Routine (genutzt im Routines-Tab und auf der Detailseite)
const RoutineTaskList = memo(({ routine, initialExpandedFirst = false, style }) => {
  const MyTheme = useAppTheme();
  const toggleRoutineSubStep = useStore((state) => state.toggleRoutineSubStep);
  const completeRoutineTask = useStore((state) => state.completeRoutineTask);
  const addRoutineSubStep = useStore((state) => state.addRoutineSubStep);
  const deleteRoutineSubStep = useStore((state) => state.deleteRoutineSubStep);

  const tasks = useMemo(
    () =>
      routine.tasks
        .map((routineTask) => {
          const catalogTask = tasksCatalog.find((task) => String(task.id) === String(routineTask.taskId));
          if (!catalogTask) return null;

          const progress = getTaskProgress(routine, routineTask.taskId);
          const subSteps = routineTask.substeps.map((step) => ({
            ...step,
            completed: progress.done || progress.completedStepIds.includes(step._id)
          }));

          // ConfirmableIcon erwartet { name, color, bg } statt eines Icon-Namens
          const iconColor = progress.done ? MyTheme.primaryAccent : MyTheme.text;
          return {
            ...catalogTask,
            icon: { name: catalogTask.icon, color: iconColor, bg: addOpacity(iconColor, 0.1) },
            subSteps,
            done: progress.done,
            progress: progress.done ? 100 : calculateTaskProgress(subSteps)
          };
        })
        .filter(Boolean),
    [routine, MyTheme]
  );

  const handleToggle = useCallback(
    (taskId, stepId) => giveFeedback(toggleRoutineSubStep(routine.id, taskId, stepId)),
    [toggleRoutineSubStep, routine.id]
  );

  const handleComplete = useCallback(
    (taskId) => giveFeedback(completeRoutineTask(routine.id, taskId)),
    [completeRoutineTask, routine.id]
  );

  return (
    <View style={[styles.list, style]}>
      {tasks.map((task, i) => (
        <ActiveTaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          icon={task.icon}
          lp={task.lp}
          progress={task.progress}
          subSteps={task.subSteps}
          initialExpanded={initialExpandedFirst && i === 0}
          style={task.done && styles.doneTask}
          onToggleSubStep={(stepId) => handleToggle(task.id, stepId)}
          onAddSubStep={(step) => addRoutineSubStep(routine.id, task.id, step)}
          onDeleteSubStep={(stepId) => deleteRoutineSubStep(routine.id, task.id, stepId)}
          onAction={() => handleComplete(task.id)}
        />
      ))}
    </View>
  );
});
RoutineTaskList.displayName = "RoutineTaskList";

const styles = StyleSheet.create({
  list: {
    gap: Spacing.sm
  },
  doneTask: {
    opacity: 0.6
  }
});

export default RoutineTaskList;
