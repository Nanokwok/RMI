import React from "react"

interface TaskInfoProps {
    name: string
    assignee: string
}

export const TaskInfo: React.FC<TaskInfoProps> = ({ name, assignee }) => (
    <>
        <div
        className="font-semibold text-base text-gray-900 mb-2 leading-snug overflow-hidden line-clamp-2"
        style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
        }}
        >
            {name}
        </div>
        <div className="text-base text-gray-500 mb-3 leading-snug">
            <strong>Assignee:</strong> {assignee}
        </div>
    </>
)