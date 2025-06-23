type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
};

const Toggle = ({
  checked,
  onChange,
  label = "",
  id = "toggle",
}: ToggleProps) => {
  return (
    <label htmlFor={id} className="inline-flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`
          relative w-11 h-6 rounded-full
          after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
          after:bg-white after:border-gray-300 after:border after:rounded-full 
          after:h-5 after:w-5 after:transition-all dark:border-gray-600
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
          peer-checked:after:border-white
          ${checked ? "bg-blue-600" : "bg-black"}
        `}
      ></div>
      {label && (
        <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;
