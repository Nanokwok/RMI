import { LuChevronRight, LuChevronDown } from "react-icons/lu";

type FilterSectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  isExpanded: boolean;
  onClick: () => void;
};

const FilterSectionHeader = ({
  icon,
  title,
  isExpanded,
  onClick,
}: FilterSectionHeaderProps) => {
  return (
    <div className="p-3 cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <button className="flex items-center justify-between w-full text-base font-medium leading-none text-black">
        <span className="flex items-center gap-2 text-base font-medium leading-none">
          {icon}
          {title}
        </span>
        {isExpanded ? (
          <LuChevronDown className="w-4 h-4 ml-auto" />
        ) : (
          <LuChevronRight className="w-4 h-4 ml-auto" />
        )}
      </button>
    </div>
  );
};

export default FilterSectionHeader;
