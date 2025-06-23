"use client"

import type React from "react"
import { BiTaskX } from "react-icons/bi";

interface EmptyStateProps {
  title?: string
  description?: string
  onClearFilters?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No plans found",
  description = "No plans match your current filter criteria.",
  onClearFilters,
}) => {
  return (
    <div className="flex items-center justify-center w-auto h-full bg-white border shadow-sm border-slate-200">
      <div className="max-w-md p-8 text-center">
        <BiTaskX className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mb-2 text-gray-600">{description}</p>
        {onClearFilters && (
          <button onClick={onClearFilters} className="px-4 py-2 mx-auto text-sm text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none">
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  )
}
