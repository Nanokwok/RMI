import React from "react";

interface RiskInfoProps {
  linkedRisk: string;
  riskLevel?: string;
  riskCategory: string;
}

const riskLevelColors: { [key: string]: string } = {
  Critical: "text-red-600",
  High: "text-orange-600",
  Moderate: "text-yellow-600",
  Low: "text-green-600",
};

export const RiskInfo: React.FC<RiskInfoProps> = ({
  linkedRisk,
  riskLevel,
  riskCategory,
}) => {
  const levelColor = riskLevel
    ? riskLevelColors[riskLevel] || "text-gray-600"
    : "";

  return (
    <div className="my-2 ml-8">
            <div className="mb-1 text-base leading-snug text-gray-500 line-clamp-2">
                <strong>Linked to risk:</strong> {linkedRisk}{" "}
                {riskLevel && (
                    <span className={`${levelColor}`}>({riskLevel})</span>
                )}
            </div>
      <div className="overflow-hidden text-base leading-snug text-gray-500 text-ellipsis whitespace-nowrap">
        <strong>Risk Category:</strong> {riskCategory}
      </div>
    </div>
  );
};
