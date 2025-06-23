import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary" | "secondary";
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "primary", className = "", ...props }, ref) => {
    const baseStyles =
      "flex px-4 py-2.5 gap-2 self-stretch text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

    const variantStyles = {
      primary: "bg-white",
      secondary: "",
    };

    return (
      <input
        ref={ref}
        {...props}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
