import React from "react";
import { getStatusBadgeClasses } from "../sections/GanttChart/GanttTaskReact/styles";

interface BadgeProps {
  status: string;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  status,
  children,
  className = "",
}) => (
  <span className={`${getStatusBadgeClasses(status)} ${className}`}>
    {children}
  </span>
);
