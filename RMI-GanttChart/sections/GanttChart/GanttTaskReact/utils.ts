import type { GanttPlan } from "../../../types/gantt-task-types";
import type { Task } from "gantt-task-react";
import { getStatusColor } from "./styles";

export const convertToGanttTasks = (
  plans: GanttPlan[],
  expandedPlans: string[]
): Task[] => {
  const tasks: Task[] = [];

  plans.forEach((plan) => {
    tasks.push({
      id: plan.id,
      name: `${plan.progress}%`,
      start: new Date(plan.startDate),
      end: new Date(plan.endDate),
      progress: plan.progress,
      type: "task",
      hideChildren: !expandedPlans.includes(plan.id),
      styles: {
        progressColor: "#ffffff66",
        backgroundColor: getStatusColor(plan.status),
        backgroundSelectedColor: getStatusColor(plan.status),
      },
      isParent: true,
    } as Task);

    if (expandedPlans.includes(plan.id)) {
      plan.tasks.forEach((task) => {
        tasks.push({
          id: task.id,
          name: `${task.progress}%`,
          start: new Date(task.startDate),
          end: new Date(task.endDate),
          progress: task.progress,
          type: "task",
          project: plan.id,
          styles: {
            progressColor: "#ffffff66",
            progressSelectedColor: "#ffffff66",
            backgroundColor: getStatusColor(task.status),
            backgroundSelectedColor: getStatusColor(task.status),
          },
        });
      });
    }
  });

  return tasks;
};
