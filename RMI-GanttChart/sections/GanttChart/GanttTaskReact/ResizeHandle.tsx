"use client"

import type React from "react"
import { useState } from "react"

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void
  onTouchStart: (e: React.TouchEvent) => void
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ onMouseDown, onTouchStart }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div
      className="w-2 bg-slate-200 cursor-col-resize transition-all duration-200 relative flex-shrink-0 touch-manipulation"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchEnd={() => setIsActive(false)}
    >
      <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-slate-400" />

      {isActive && <div className="absolute inset-0 bg-slate-100 border-l-1 border-r-1 border-slate-300" />}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1">
        <div className="w-1 h-1 bg-slate-500 rounded-full" />
        <div className="w-1 h-1 bg-slate-500 rounded-full" />
        <div className="w-1 h-1 bg-slate-500 rounded-full" />
      </div>

      {isActive && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          Drag to resize
        </div>
      )}
    </div>
  )
}
