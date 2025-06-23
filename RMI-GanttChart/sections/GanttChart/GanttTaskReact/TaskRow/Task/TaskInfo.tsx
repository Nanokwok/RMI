import React from "react";

interface TaskInfoProps {
  name: string;
  assignee: string;
}

export const TaskInfo: React.FC<TaskInfoProps> = ({ name, assignee }) => (
  <>
    <div
      className="mb-2 ml-8 overflow-hidden text-base font-semibold leading-snug text-gray-900 line-clamp-2"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
      }}
    >
      {name}
    </div>
    <div className="mb-3 ml-8 text-base leading-snug text-gray-500">
      <strong>Assignee:</strong> {assignee}
    </div>
  </>
);
