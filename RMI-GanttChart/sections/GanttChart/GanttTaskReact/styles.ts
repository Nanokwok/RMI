export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Completed":
      return "#22c55e";
    case "In Progress":
      return "#3b82f6";
    case "Delayed":
      return "#f59e0b";
    case "Not Started":
      return "#9ca3af";
    case "Cancel":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

export const getStatusBadgeClasses = (status: string): string => {
  const baseClasses =
    "px-4 py-0.5 rounded-full text-base font-medium text-white inline-block min-w-[70px] text-center";

  switch (status) {
    case "Completed":
      return `${baseClasses} bg-green-500`;
    case "In Progress":
      return `${baseClasses} bg-blue-500`;
    case "Delayed":
      return `${baseClasses} bg-amber-500`;
    case "Not Started":
      return `${baseClasses} bg-gray-400`;
    case "Cancel":
      return `${baseClasses} bg-red-500`;
    default:
      return `${baseClasses} bg-gray-500`;
  }
};
