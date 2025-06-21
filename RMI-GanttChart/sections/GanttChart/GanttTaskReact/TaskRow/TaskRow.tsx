import type React from "react"
import { TaskHeader } from "./Task/TaskHeader"
import { RiskInfo } from "./Task/RiskInfo"
import { TaskInfo } from "./Task/TaskInfo"
import { Badge } from "../../../../components/Badge"
import { ProgressIndicator } from "../../../../components/ProgressIndicator"
import type { Task } from "gantt-task-react"
import type { GanttPlan } from "../../../../types/gantt-task-types"

interface TaskRowProps {
  task: Task
  plan?: GanttPlan
  taskData?: any
  isParent: boolean
  isExpanded: boolean
  hasSubTasks: boolean
  onToggleExpand: () => void
}

export const TaskRow: React.FC<TaskRowProps> = ({
  task,
  plan,
  taskData,
  isParent,
  isExpanded,
  hasSubTasks,
  onToggleExpand,
}) => (
  <div
    className={`w-full h-[170px] flex flex-col px-4 py-3 bg-white border-b border-r border-gray-200 box-border overflow-hidden ${
      isParent ? "pl-4" : "pl-10"
    }`}
  >
    {isParent && plan ? (
      <>
        <TaskHeader
          name={plan.name}
          status={plan.status}
          taskCount={plan.tasks.length}
          hasSubTasks={hasSubTasks}
          isExpanded={isExpanded}
          onToggleExpand={onToggleExpand}
        />
        <RiskInfo linkedRisk={plan.linkedRisk} riskCategory={plan.riskCategory} />
        <div className="flex items-center gap-2 mt-auto ml-8">
          <Badge status={plan.status}>{plan.status}</Badge>
          <ProgressIndicator progress={plan.progress} />
        </div>
      </>
    ) : (
      taskData && (
        <>
          <TaskInfo name={taskData.name} assignee={taskData.assignee} />
          <div className="flex items-center gap-2 ml-8">
            <Badge status={taskData.status}>{taskData.status}</Badge>
            <ProgressIndicator progress={task.progress} />
          </div>
        </>
      )
    )}
  </div>
)
