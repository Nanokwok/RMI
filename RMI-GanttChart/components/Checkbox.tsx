import { LuCheck } from "react-icons/lu";
import React from "react";

type CheckboxProps = {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <label className="relative flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 bg-white border border-gray-300 rounded appearance-none checked:bg-black checked:border-black"
      />
      {checked && (
        <LuCheck className="absolute left-0 w-4 h-4 text-white pointer-events-none" />
      )}
      <span className="pl-1 text-base font-medium">{label}</span>
    </label>
  );
};

export default Checkbox;
