import React from "react"
import type { Task } from "gantt-task-react"
import type { GanttPlan } from "../../../../types/gantt-task-types"

interface OwnerColumnProps {
  tasks: Task[]
  plans: GanttPlan[]
  showOwnerColumn: boolean
}

export const OwnerColumn: React.FC<OwnerColumnProps> = ({ tasks, plans, showOwnerColumn }) => (
  showOwnerColumn && (
    <div className="w-[200px] bg-white relative">
      {tasks.map((task) => {
        const plan = plans.find((p) => p.id === task.id)
        const isParent = !task.project

        return (
          <div
            key={`owner-${task.id}`}
            className="h-[170px] flex items-center justify-center px-4 bg-white border-b border-gray-200 box-border"
          >
            <span className="text-base text-gray-900 font-medium text-center line-clamp-2">
              {isParent && plan ? plan.owner : ""}
            </span>
          </div>
        )
      })}
    </div>
  )
)