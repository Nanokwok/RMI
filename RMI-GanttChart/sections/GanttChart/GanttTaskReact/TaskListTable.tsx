import React from "react"
import type { Task } from "gantt-task-react"
import { FaAngleRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import type { GanttPlan } from "../../../types/gantt-task-types"
import { getStatusBadgeClasses } from "./styles"

interface TaskListTableProps {
  tasks: Task[]
  plans: GanttPlan[]
  expandedPlans: string[]
  showOwnerColumn: boolean
  isHoveringColumnEdge: boolean
  togglePlanExpansion: (planId: string) => void
  toggleOwnerColumn: () => void
  setIsHoveringColumnEdge: (isHovering: boolean) => void
}

export const TaskListTable: React.FC<TaskListTableProps> = ({
  tasks,
  plans,
  expandedPlans,
  showOwnerColumn,
  isHoveringColumnEdge,
  togglePlanExpansion,
  toggleOwnerColumn,
  setIsHoveringColumnEdge,
}) => {
  return (
    <div className="bg-white flex w-full relative">
      {/* Plan Column */}
      <div 
        className={`${showOwnerColumn ? "flex-1" : "w-[550px]"} bg-white relative`}
        onMouseLeave={() => setIsHoveringColumnEdge(false)}
      >
        {tasks.map((task) => {
          const plan = plans.find((p) => p.id === task.id)
          const taskData = plans.flatMap((p) => p.tasks).find((t) => t.id === task.id)
          const isParent = !task.project
          const isExpanded = expandedPlans.includes(task.id)
          const hasSubTasks = plan && plan.tasks.length > 0

          return (
            <div
              key={task.id}
              className={`h-40 flex flex-col px-4 py-3 bg-white border-b border-r border-gray-200 box-border ${
                isParent ? "pl-4" : "pl-10"
              }`}
            >
              {isParent && plan && (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-start flex-1 min-w-0">
                      {hasSubTasks && (
                      <div
                          role="button"
                          tabIndex={0}
                          onClick={() => togglePlanExpansion(task.id)}
                          className="text-gray-600 hover:text-gray-900 cursor-pointer mr-4 flex items-center justify-center mt-0.5 flex-shrink-0 transition-transform duration-200 focus:outline-none active:outline-none focus:ring-0 active:ring-0"
                          style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                      >
                          <FaAngleRight />
                      </div>
                      )}
                      {!hasSubTasks && <div className="w-6 mr-2 flex-shrink-0" />}
                      <span
                        onClick={hasSubTasks ? () => togglePlanExpansion(task.id) : undefined}
                        className={`font-semibold text-base text-gray-900 leading-snug overflow-hidden flex-1 line-clamp-2 hover:underline ${
                          hasSubTasks ? "cursor-pointer select-none" : "cursor-default"
                        }`}
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {plan.name}
                      </span>
                    </div>
                    <div className="text-base text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md ml-2 flex-shrink-0">
                      {plan.tasks.length} Tasks
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="text-base text-gray-500 leading-snug mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      <strong>Risk Name:</strong> {plan.linkedRisk}
                    </div>
                    <div className="text-base text-gray-500 leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
                      <strong>Risk Category:</strong> {plan.riskCategory}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <span className={getStatusBadgeClasses(plan.status)}>{plan.status}</span>
                    <span className="text-base text-slate-600 bg-slate-100 px-4 py-0.5 rounded-full border border-slate-200">
                      {plan.progress}%
                    </span>
                  </div>
                </>
              )}

              {!isParent && taskData && (
                <>
                  <div
                    className="font-semibold text-base text-gray-900 mb-2 leading-snug overflow-hidden line-clamp-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {taskData.name}
                  </div>

                  <div className="text-base text-gray-500 mb-3 leading-snug">
                    <strong>Assignee:</strong> {taskData.assignee}
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <span className={getStatusBadgeClasses(taskData.status)}>{taskData.status}</span>
                    <span className="text-base text-slate-600 bg-slate-100 px-4 py-0.5 rounded-full border border-slate-200">
                      {task.progress}%
                    </span>
                  </div>
                </>
              )}
            </div>
          )
        })}

        {/* Column hide handle */}
        {showOwnerColumn && (
          <div 
            className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize z-10 hover:bg-gray-100 transition-colors duration-100"
            onMouseEnter={() => setIsHoveringColumnEdge(true)}
            onMouseLeave={() => setIsHoveringColumnEdge(false)}
          >
            {isHoveringColumnEdge && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <button 
                    onClick={toggleOwnerColumn}
                    className="!bg-white !border !border-gray-300 !rounded-full !p-1 !shadow-sm hover:!bg-gray-100"
                    >
                    <span style={{ color: 'text-gray-600', fontSize: 'text-xs' }}>
                        <FaChevronLeft />
                    </span>
                    </button>
                </div>
            )}
          </div>
        )}
      </div>

      {/* Owner Column */}
      {showOwnerColumn && (
        <div className="w-[200px] bg-white relative">
          {tasks.map((task) => {
            const plan = plans.find((p) => p.id === task.id)
            const taskData = plans.flatMap((p) => p.tasks).find((t) => t.id === task.id)
            const isParent = !task.project

            return (
              <div
                key={`owner-${task.id}`}
                className="h-40 flex items-center justify-center px-4 bg-white border-b border-gray-200 box-border"
              >
                <span className="text-base text-gray-900 font-medium text-center line-clamp-1">
                  {isParent && plan ? plan.owner : taskData ? taskData.assignee : ""}
                </span>
              </div>
            )
          })}
        </div>
      )}

        {/* Show column button when hidden */}
        {!showOwnerColumn && (
        <div onClick={toggleOwnerColumn} className="absolute right-0 top-0 bottom-0 w-2 bg-gray-200 hover:bg-blue-500 transition-colors duration-200 z-10 flex items-center justify-center">
            <span style={{ color: 'text-gray-600', fontSize: 'text-xs' }}>
                <FaChevronRight />
            </span>
        </div>
        )}
    </div>
  )
}