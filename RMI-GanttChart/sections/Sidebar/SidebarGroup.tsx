import Search from "./SidebarContent/Search";
import Categories from "./SidebarContent/CategoriesFilter";
import Level from "./SidebarContent/LevelFilter";
import PlanTasks from "./SidebarContent/PlanTasksStatusFilter";
import Timeline from "./SidebarContent/TimelineFilter";

const SidebarGroup = () => {
  return (
    <>
      <div className="p-0">
        <Search />
        <Categories />
        <Level />
        <PlanTasks />
        <Timeline />
      </div>
    </>
  );
};

export default SidebarGroup;
