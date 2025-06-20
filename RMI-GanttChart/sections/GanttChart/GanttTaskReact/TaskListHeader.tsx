import React from "react"

interface TaskListHeaderProps {
  showOwnerColumn: boolean
}

export const TaskListHeader: React.FC<TaskListHeaderProps> = ({ showOwnerColumn }) => (
  <div className="h-[50px] flex bg-slate-50 border-b border-gray-300 font-semibold text-base text-gray-700 group">
    <div className={`${showOwnerColumn ? "flex-1" : "w-full"} flex items-center pl-4 border-r border-gray-300`}>
      Plan
    </div>
    {showOwnerColumn && (
      <div className="w-[200px] flex items-center justify-center border-l border-gray-200 relative group">
        Owner
      </div>
    )}
  </div>
)