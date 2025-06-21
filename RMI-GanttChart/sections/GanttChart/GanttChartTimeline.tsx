import { GanttChart } from "./GanttTaskReact/GanttChart"

export default function GanttChartTimeline() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-full p-4 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col">
        <div className="mb-4 flex-shrink-0">
          <h5 className="text-lg font-semibold text-slate-900">Gantt Chart Timeline</h5>
          <p className="text-slate-600">Visual timeline of all mitigation plans and milestones</p>
        </div>
        <div className="flex-1 min-h-0 w-full rounded-lg overflow-hidden">
          <GanttChart />
        </div>
      </div>
    </div>
  )
}
