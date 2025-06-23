import { LuSearch } from "react-icons/lu";
import QuickFilters from "./QuickFilters";
import Input from "../../../components/Input";

const Search = () => {
  return (
    <>
      <div className="p-3 bg-gray-50">
        <div className="px-4 py-1.5 space-y-2">
          <label className="flex items-center gap-2 text-base font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <LuSearch className="w-4 h-4" />
            Search
          </label>
          <Input
            variant="primary"
            type="text"
            placeholder="Search plans, tasks, risks, ..."
            className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            style={{ borderColor: "rgb(226, 232, 240)" }}
          />
          <div className="space-y-2">
            <QuickFilters />
          </div>
        </div>
      </div>

      <div className="divider" />
    </>
  );
};

export default Search;
