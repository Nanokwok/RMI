import { GanttChart } from "./GanttTaskReact/GanttChart"

export default function GanttChartTimeline() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full p-4 overflow-hidden bg-white border rounded-lg border-slate-200 shadow-sm">
        <div className="flex-shrink-0 mb-4">
          <h5 className="text-lg font-semibold text-slate-900">Gantt Chart Timeline</h5>
          <p className="text-slate-600">Visual timeline of all mitigation plans and milestones</p>
        </div>
        <div className="flex-1 w-full min-h-0 overflow-auto">
          <div className="min-w-full w-max">
            <GanttChart />
          </div>
        </div>
      </div>
    </div>
  )
}