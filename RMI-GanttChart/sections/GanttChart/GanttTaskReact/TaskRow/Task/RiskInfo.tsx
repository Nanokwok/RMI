import React from "react"

interface RiskInfoProps {
    linkedRisk: string
    riskCategory: string
}

export const RiskInfo: React.FC<RiskInfoProps> = ({ linkedRisk, riskCategory }) => (
    <div className="my-2 ml-8">
        <div className="text-base text-gray-500 leading-snug mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
            <strong>Risk Name:</strong> {linkedRisk}
        </div>
        <div className="text-base text-gray-500 leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
            <strong>Risk Category:</strong> {riskCategory}
        </div>
    </div>
)