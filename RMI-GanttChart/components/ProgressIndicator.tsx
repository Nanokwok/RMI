import React from "react"

interface ProgressIndicatorProps {
    progress: number
    className?: string
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, className = "" }) => (
    <span className={`text-base text-slate-600 bg-slate-100 px-4 py-0.5 rounded-full border border-slate-200 ${className}`}>
        {progress}%
    </span>
)