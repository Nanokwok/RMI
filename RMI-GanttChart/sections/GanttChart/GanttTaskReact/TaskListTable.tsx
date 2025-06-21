"use client"

import type React from "react"
import { useRef, useCallback } from "react"
import type { TaskListTableProps } from "../../../types/gantt-task-types"
import { TaskRow } from "../GanttTaskReact/TaskRow/TaskRow"
import { OwnerColumn } from "../../GanttChart/GanttTaskReact/TaskRow/OwnerColumn"
import { ResizeHandle } from "./ResizeHandle"

export const TaskListTable: React.FC<TaskListTableProps> = ({
  tasks,
  plans,
  expandedPlans,
  planColumnWidth,
  ownerColumnWidth,
  togglePlanExpansion,
  setPlanColumnWidth,
  setOwnerColumnWidth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const isDraggingOwner = useRef(false)
  const startX = useRef(0)
  const startPlanWidth = useRef(0)
  const startOwnerWidth = useRef(0)

  const handlePlanMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true
      startX.current = e.clientX
      startPlanWidth.current = planColumnWidth
      startOwnerWidth.current = ownerColumnWidth

      document.addEventListener("mousemove", handlePlanMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    },
    [planColumnWidth, ownerColumnWidth],
  )

  const handlePlanTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true
      const touch = e.touches[0]
      startX.current = touch.clientX
      startPlanWidth.current = planColumnWidth
      startOwnerWidth.current = ownerColumnWidth

      document.addEventListener("touchmove", handlePlanTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)
      document.body.style.userSelect = "none"
    },
    [planColumnWidth, ownerColumnWidth],
  )

  const handlePlanMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return

      const deltaX = e.clientX - startX.current
      const newPlanWidth = Math.max(100, startPlanWidth.current + deltaX)
      const newOwnerWidth = Math.max(100, startOwnerWidth.current - deltaX)

      setPlanColumnWidth(newPlanWidth)
      setOwnerColumnWidth(newOwnerWidth)
    },
    [setPlanColumnWidth, setOwnerColumnWidth],
  )

  const handlePlanTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current) return
      e.preventDefault()

      const touch = e.touches[0]
      const deltaX = touch.clientX - startX.current
      const newPlanWidth = Math.max(100, startPlanWidth.current + deltaX)
      const newOwnerWidth = Math.max(100, startOwnerWidth.current - deltaX)

      setPlanColumnWidth(newPlanWidth)
      setOwnerColumnWidth(newOwnerWidth)
    },
    [setPlanColumnWidth, setOwnerColumnWidth],
  )

  const handleOwnerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDraggingOwner.current = true
      startX.current = e.clientX
      startOwnerWidth.current = ownerColumnWidth

      document.addEventListener("mousemove", handleOwnerMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    },
    [ownerColumnWidth],
  )

  const handleOwnerTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDraggingOwner.current = true
      const touch = e.touches[0]
      startX.current = touch.clientX
      startOwnerWidth.current = ownerColumnWidth

      document.addEventListener("touchmove", handleOwnerTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)
      document.body.style.userSelect = "none"
    },
    [ownerColumnWidth],
  )

  const handleOwnerMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingOwner.current) return

      const deltaX = e.clientX - startX.current
      const newOwnerWidth = Math.max(50, startOwnerWidth.current + deltaX)

      setOwnerColumnWidth(newOwnerWidth)
    },
    [setOwnerColumnWidth],
  )

  const handleOwnerTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDraggingOwner.current) return
      e.preventDefault()

      const touch = e.touches[0]
      const deltaX = touch.clientX - startX.current
      const newOwnerWidth = Math.max(50, startOwnerWidth.current + deltaX)

      setOwnerColumnWidth(newOwnerWidth)
    },
    [setOwnerColumnWidth],
  )

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    isDraggingOwner.current = false
    document.removeEventListener("mousemove", handlePlanMouseMove)
    document.removeEventListener("mousemove", handleOwnerMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
    document.body.style.cursor = ""
    document.body.style.userSelect = ""
  }, [handlePlanMouseMove, handleOwnerMouseMove])

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false
    isDraggingOwner.current = false
    document.removeEventListener("touchmove", handlePlanTouchMove)
    document.removeEventListener("touchmove", handleOwnerTouchMove)
    document.removeEventListener("touchend", handleTouchEnd)
    document.body.style.userSelect = ""
  }, [handlePlanTouchMove, handleOwnerTouchMove])

  return (
    <div ref={containerRef} className="bg-white flex w-full relative">
      <div className="bg-white relative overflow-hidden" style={{ width: planColumnWidth }}>
        {tasks.map((task) => {
          const plan = plans.find((p) => p.id === task.id)
          const taskData = plans.flatMap((p) => p.tasks).find((t) => t.id === task.id)
          const isParent = !task.project
          const isExpanded = expandedPlans.includes(task.id)
          const hasSubTasks = (plan && plan.tasks.length > 0) ?? false

          return (
            <TaskRow
              key={task.id}
              task={task}
              plan={plan}
              taskData={taskData}
              isParent={isParent}
              isExpanded={isExpanded}
              hasSubTasks={hasSubTasks}
              onToggleExpand={() => togglePlanExpansion(task.id)}
            />
          )
        })}
      </div>
      <ResizeHandle onMouseDown={handlePlanMouseDown} onTouchStart={handlePlanTouchStart} />
      <OwnerColumn tasks={tasks} plans={plans} width={ownerColumnWidth} />
      <ResizeHandle onMouseDown={handleOwnerMouseDown} onTouchStart={handleOwnerTouchStart} />
    </div>
  )
}
