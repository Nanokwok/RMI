# RMI-GanttChart

This is the front-end for the Project Management page in the Gantt chart section.

There are two design versions:

### 1. Highcharts Gantt Library
- Fully supports React 19
- Manages UI using SVG, so it cannot be fully customized to match the prototype

### 2. gantt-task-react Library
- Not fully compatible with React 19; requires `legacy-peer-deps`
- Allows full customization to match the prototype, except for custom row height

## Folder Structure 
- `component/` — reusable components
- `section/` — non-reusable components, for atomic design practice

## Switch Design Version
To switch the design version, go to `GanttTaskReact/GanttChartTimeline.tsx` and toggle the import comments in the import section.
