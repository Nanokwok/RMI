import {
  LuTriangleAlert,
  LuClock,
  LuCalendarDays,
  LuTrendingUp,
} from "react-icons/lu";

export const MockedQuick = [
  {
    id: "critical-high-risk",
    label: "Critical & High risks",
    icon: LuTriangleAlert,
    count: 7,
  },
  {
    id: "overdue-items",
    label: "Overdue Items",
    icon: LuClock,
    count: 5,
  },
  {
    id: "this-month",
    label: "This Month",
    icon: LuCalendarDays,
    count: 18,
  },
  {
    id: "in-progress",
    label: "In progress",
    icon: LuTrendingUp,
    count: 3,
  },
];

export const RiskCategory = [
  {
    name: "Credit Risk",
    sub_category: [{ id: 11, name: "Credit" }],
  },
  {
    name: "Liquidity Risk",
    sub_category: [{ id: 12, name: "Liquidity" }],
  },
  {
    name: "Strategic Risk",
    sub_category: [
      { id: 4, name: "Competitor" },
      { id: 5, name: "Economic" },
      { id: 6, name: "Environment" },
      { id: 7, name: "Political" },
      { id: 8, name: "Social" },
      { id: 9, name: "Technology" },
      { id: 50, name: "Reputation" },
    ],
  },
  {
    name: "Market Risk",
    sub_category: [{ id: 10, name: "Market" }],
  },
  {
    name: "Operational Risk",
    sub_category: [
      { id: 1, name: "Operation" },
      { id: 42, name: "Ethic and Compliance" },
      { id: 63, name: "Cyber and Info Security (OT)" },
      { id: 64, name: "OT Governance" },
      { id: 79, name: "IT Governance" },
      { id: 80, name: "Cyber and Info Security (IT)" },
    ],
  },
];

export const RiskLevel = [
  { label: "Critical" },
  { label: "High" },
  { label: "Moderate" },
  { label: "Low" },
];

export const PlanTaskStatus = [
  { label: "Not started" },
  { label: "In progress" },
  { label: "Completed" },
  { label: "Delayed" },
  { label: "Cancelled" },
];
