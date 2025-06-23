import type React from "react"
import type { Task } from "gantt-task-react"
import type { GanttPlan } from "../../../../types/gantt-task-types"

interface OwnerColumnProps {
  tasks: Task[]
  plans: GanttPlan[]
  width: number
}

export const OwnerColumn: React.FC<OwnerColumnProps> = ({ tasks, plans, width }) => (
  <div className="relative overflow-hidden bg-white" style={{ width }}>
    {tasks.map((task) => {
      const plan = plans.find((p) => p.id === task.id)
      const isParent = !task.project

      return (
        <div
          key={`owner-${task.id}`}
          className="h-[170px] flex items-center justify-center px-4 bg-white border-b border-gray-200 box-border overflow-hidden"
        >
          <span className="text-base font-medium text-center text-gray-900 break-words line-clamp-2">
            {isParent && plan ? plan.owner : ""}
          </span>
        </div>
      )
    })}
  </div>
)
