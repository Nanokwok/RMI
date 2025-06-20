import type { GanttPlan } from "../../../types/gantt-task-types";
import type { Task } from "gantt-task-react";
import { getStatusColor } from "./styles";

export const initialPlans: GanttPlan[] = [
  {
    id: "MP-001",
    name: "Cybersecurity Enhancement Plan for Enterprise Infrastructure Security",
    startDate: "2025-01-15",
    endDate: "2025-02-28",
    progress: 0,
    owner: "Sarah Chen",
    status: "Not Started",
    linkedRisk: "Data Breach and Cyber Attack Risk",
    riskCategory: "Information Security",
    tasks: [
      {
        id: "GT-001",
        name: "Security Audit Implementation and Vulnerability Assessment",
        startDate: "2025-01-15",
        endDate: "2025-02-15",
        progress: 100,
        assignee: "Sarah Chen",
        status: "Completed",
        planId: "MP-001",
        planName: "Cybersecurity Enhancement Plan",
      },
    ],
  },
  {
    id: "MP-002",
    name: "Supply Chain Risk Management and Vendor Assessment Program",
    startDate: "2025-01-20",
    endDate: "2025-03-15",
    progress: 40,
    owner: "Lisa Wong",
    status: "In Progress",
    linkedRisk: "Supply Chain Disruption and Vendor Failure Risk",
    riskCategory: "Operational Risk Management",
    tasks: [
      {
        id: "GT-002",
        name: "Comprehensive Vendor Assessment and Due Diligence Review",
        startDate: "2025-02-01",
        endDate: "2025-02-28",
        progress: 100,
        assignee: "Kevin Smith",
        status: "Completed",
        planId: "MP-002",
        planName: "Supply Chain Risk Management",
      },
      {
        id: "GT-003",
        name: "Alternative Supplier Identification and Qualification Process",
        startDate: "2025-02-15",
        endDate: "2025-03-15",
        progress: 0,
        assignee: "Patricia Johnson",
        status: "In Progress",
        planId: "MP-002",
        planName: "Supply Chain Risk Management",
      },
    ],
  },
  {
    id: "MP-003",
    name: "Financial Risk Mitigation and Market Volatility Response Strategy",
    startDate: "2025-02-01",
    endDate: "2025-04-15",
    progress: 0,
    owner: "Nathan Brown",
    status: "Delayed",
    linkedRisk: "Market Volatility and Economic Downturn Risk",
    riskCategory: "Financial Risk Category",
    tasks: [],
  },
  {
    id: "MP-004",
    name: "Regulatory Compliance Risk Management Framework Implementation",
    startDate: "2025-02-10",
    endDate: "2025-03-30",
    progress: 0,
    owner: "Polly Green",
    status: "Cancel",
    linkedRisk: "Regulatory Changes and Compliance Violation Risk",
    riskCategory: "Compliance and Legal Risk",
    tasks: [],
  },
];

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
