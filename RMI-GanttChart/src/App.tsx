import Header from "../sections/GanttChart/Header.tsx";
import ActiveFilters from "../sections/GanttChart/ActiveFilter.tsx";
import GanttChartTimeline from "../sections/GanttChart/GanttChartTimeline.tsx";
import { FilterProvider } from "../sections/Sidebar/FilterContext.tsx";

function App() {
  return (
    <>
    <FilterProvider>
      <div className="w-full p-8">
        <Header />
        <div className='flex flex-col w-full h-full gap-4'>
            <ActiveFilters />
          </div>
      </div>
      </ FilterProvider>
      <GanttChartTimeline />
    </>
  );
}

export default App;