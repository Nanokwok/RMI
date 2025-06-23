import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ColumnToggleProps {
  showOwnerColumn: boolean;
  isHovering: boolean;
  onToggle: () => void;
  onHoverChange: (isHovering: boolean) => void;
}

export const ColumnToggle: React.FC<ColumnToggleProps> = ({
  showOwnerColumn,
  isHovering,
  onToggle,
  onHoverChange,
}) => (
  <>
    {showOwnerColumn ? (
      <div
        className="absolute top-0 bottom-0 right-0 z-10 w-2 cursor-col-resize hover:bg-gray-100 transition-colors duration-100"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      >
        {isHovering && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <button
              onClick={onToggle}
              className="!bg-white !border !border-gray-300 !rounded-full !p-1 !shadow-sm hover:!bg-gray-100"
            >
              <FaChevronLeft className="text-xs text-gray-600" />
            </button>
          </div>
        )}
      </div>
    ) : (
      <div
        onClick={onToggle}
        className="absolute top-0 bottom-0 right-0 z-10 flex items-center justify-center w-2 bg-gray-200 hover:bg-gray-100 transition-colors duration-200"
      >
        <FaChevronRight className="text-xs text-gray-600" />
      </div>
    )}
  </>
);
