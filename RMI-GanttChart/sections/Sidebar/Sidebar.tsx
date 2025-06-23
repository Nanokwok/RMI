import { useRef, useEffect } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarGroup from "./SidebarGroup";
import SidebarFooter from "./SidebarFooter";
import type { SidebarProps } from "../../types/sidebar-filter-types";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        />
      )}

      <div
        ref={ref}
        className={`overflow-y-auto fixed top-0 left-0 h-full w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarHeader onClose={onClose} />
        <div className="rounded-none shadow-sm bg-card text-card-foreground">
          <SidebarGroup />
        </div>
        {/* for now, make refresh button as close button */}
        <SidebarFooter onRefresh={onClose} />
      </div>
    </>
  );
};

export default Sidebar;
