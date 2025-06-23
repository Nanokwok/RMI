import clsx from "clsx";

type Variant = "primary" | "secondary" | "risk";
type RiskLevel = "Critical" | "High" | "Moderate" | "Low";

type BadgeProps = {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
  level?: RiskLevel; // Only used when variant === "risk"
};

const badgeStyles = {
  primary: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold",
  secondary:
    "bg-white text-black rounded-full border border-slate-200 px-3 py-1 font-semibold flex items-center justify-between flex-grow-0 whitespace-nowrap",
};

const riskStyles: Record<RiskLevel, string> = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

export const Badge = ({
  children,
  variant = "primary",
  className = "",
  level,
}: BadgeProps) => {
  if (variant === "risk" && level) {
    return (
      <span
        className={clsx(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent",
          riskStyles[level],
          className
        )}
      >
        {level} Risk
      </span>
    );
  }
  // For primary and secondary variants
  const style =
    variant === "primary" || variant === "secondary"
      ? badgeStyles[variant]
      : "";

  return (
    <span
      className={clsx(
        "text-sm font-medium rounded-full inline-flex items-center justify-between",
        style,
        className
      )}
    >
      {children}
    </span>
  );
};
