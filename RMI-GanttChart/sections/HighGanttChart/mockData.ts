import type { TaskData } from '../../../types/gantt-types'

export const generateMockData = (): TaskData[] => {
  const today = new Date();
  const day = 1000 * 60 * 60 * 24;

  // Set to 00:00:00:000 today
  today.setUTCHours(0);
  today.setUTCMinutes(0);
  today.setUTCSeconds(0);
  today.setUTCMilliseconds(0);

  return [
    {
      name: "Cybersecurity Enhancement Plan",
      owner: "Sarah Chen",
      risk_name: "Cybersecurity Data Breach",
      tasks: 2,
      status: "In Progress",
      progress: 45,
      id: "audit_phase_1",
      start: today.getTime(),
      end: today.getTime() + (20 * day),
      completed: {
        amount: 0.45
      }
    },
    {
      name: "Cybersecurity Audit Phase 1",
      assignee: "Sarah Chen",
      status: "Completed",
      progress: 75,
      parent: "audit_phase_1",
      start: today.getTime(),
      end: today.getTime() + (5 * day),
      completed: {
        amount: 0.75
      }
    },
    {
      name: "Security Training Development",
      assignee: "Lisa Wong",
      status: "not started",
      progress: 45,
      parent: "audit_phase_1",
      start: today.getTime() + (5 * day),
      end: today.getTime() + (10 * day),
      completed: {
        amount: 0.45
      }
    },
    {
      name: "Supply Chain Risk Mitigation",
      owner: "Mike Johnson",
      risk_name: "Supply Chain Disruption",
      tasks: 1,
      status: "In Progress",
      progress: 30,
      id: "audit_phase_2",
      start: today.getTime() + (3 * day),
      end: today.getTime() + (20 * day),
      completed: {
        amount: 0.30
      }
    },
    {
      name: "Vendor Assessment Program",
      assignee: "Mike Johnson",
      status: "Delayed",
      progress: 45,
      parent: "audit_phase_2",
      start: today.getTime() + (13 * day),
      end: today.getTime() + (23 * day),
      completed: {
        amount: 0.45
      }
    },
  ];
};
