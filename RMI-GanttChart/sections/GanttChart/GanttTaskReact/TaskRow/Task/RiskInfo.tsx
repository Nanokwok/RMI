import React from "react";

interface RiskInfoProps {
  linkedRisk: string;
  riskCategory: string;
}

export const RiskInfo: React.FC<RiskInfoProps> = ({
  linkedRisk,
  riskCategory,
}) => (
  <div className="my-2 ml-8">
    <div className="mb-1 overflow-hidden text-base leading-snug text-gray-500 text-ellipsis whitespace-nowrap">
      <strong>Risk Name:</strong> {linkedRisk}
    </div>
    <div className="overflow-hidden text-base leading-snug text-gray-500 text-ellipsis whitespace-nowrap">
      <strong>Risk Category:</strong> {riskCategory}
    </div>
  </div>
);
