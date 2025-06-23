import { useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import Title from "./Title";
import Sidebar from "../Sidebar/Sidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-row h-auto">
      <Title />
      <div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-lg font-medium flex gap-2 justify-center items-center !bg-blue-600 text-white hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-4 h-auto"
        >
          <MdOutlineFilterAlt className="w-5 h-5 text-white" />
          Filters
        </button>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      ></Sidebar>
    </div>
  );
};

export default Header;