import { RefreshCw } from "lucide-react";
import type { SidebarFooterProps } from "../../types/sidebar-filter-types";

const SidebarFooter = ({ onRefresh }: SidebarFooterProps) => {
  return (
    <div className="flex flex-col justify-start flex-1 p-6 bg-gray-50">
      <div className="flex items-center justify-between pb-4 text-sm text-gray-600">
        <span className="font-medium">Showing 23 of 156 items</span>
      </div>

      <button
        onClick={onRefresh}
        className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-base font-medium bg-white border gap-2 border-input bg-background hover:bg-gray-100"
        style={{ borderColor: "rgb(226, 232, 240)" }}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh Data
      </button>
    </div>
  );
};

export default SidebarFooter;
