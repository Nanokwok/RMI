import GanttChart from './GanttChart.tsx';

export default function GanttChartTimeline() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="w-full h-auto p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                <h5>Gantt Chart Timeline</h5>
                <p className="text-gray-600">Visual timeline of all mitigation plans and milestones</p>
                <div className="w-full rounded-lg flex items-center justify-center">
                    <GanttChart />
                </div>
            </div>
        </div>
    );
}