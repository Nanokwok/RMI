import Header from "../sections/GanttChart/Header.tsx";
import ActiveFilters from "../sections/GanttChart/ActiveFilter.tsx";
import GanttChartTimeline from "../sections/GanttChart/GanttChartTimeline.tsx";

function App() {
  return (
    <>
      <div className="p-8 w-full">
        <Header />
        <div className="flex flex-col w-full h-full gap-4">
          <ActiveFilters />
          <GanttChartTimeline />
        </div>
      </div>
    </>
  );
}

export default App;
