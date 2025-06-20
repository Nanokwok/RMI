import { Filter } from "lucide-react";
import Title from "./Title";

export default function Header() {
  return (
    <>
      <div className="flex flex-row h-auto">
        <Title />
        <div>
          <button className="flex gap-2 justify-center items-center !bg-blue-600 text-white hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-4 h-auto">
            <Filter className="w-5 h-5 text-white" />
            Filters
          </button>
        </div>
      </div>
    </>
  );
}
