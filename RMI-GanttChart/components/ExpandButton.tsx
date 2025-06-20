import React from "react"
import { FaAngleRight } from "react-icons/fa6"

interface ExpandButtonProps {
    isExpanded: boolean
    onClick: () => void
    className?: string
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({ isExpanded, onClick, className = "" }) => (
    <div
        onClick={onClick}
        className={`text-gray-600 hover:text-gray-900 cursor-pointer mr-4 flex items-center justify-center mt-0.5 flex-shrink-0 transition-transform duration-200 ${className}`}
        style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
    >
        <FaAngleRight />
    </div>
)