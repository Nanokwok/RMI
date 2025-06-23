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
      className="relative flex-shrink-0 w-2 bg-slate-200 cursor-col-resize transition-all duration-200 touch-manipulation"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchEnd={() => setIsActive(false)}
    >
      <div className="absolute inset-y-0 w-px left-1/2 transform -translate-x-1/2 bg-slate-400" />

      {isActive && <div className="absolute inset-0 bg-slate-100 border-l-1 border-r-1 border-slate-300" />}

      <div className="absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-1">
        <div className="w-1 h-1 rounded-full bg-slate-500" />
        <div className="w-1 h-1 rounded-full bg-slate-500" />
        <div className="w-1 h-1 rounded-full bg-slate-500" />
      </div>

      {isActive && (
        <div className="absolute px-2 py-1 text-xs text-white rounded shadow-lg -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 whitespace-nowrap">
          Drag to resize
        </div>
      )}
    </div>
  )
}
