import { useState } from "react";
import { LuChartColumn } from "react-icons/lu";
import Checkbox from "../../../components/Checkbox";
import Input from "../../../components/Input";
import { RiskCategory } from "../filter_options";
import FilterSectionHeader from "../../../components/FilterSectionHeader";
import { useFilter } from "../FilterContext";

const CategoriesFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const { state, dispatch } = useFilter();

  const selected = state.categories;

  const toggleCategory = (categoryName: string, subNames: string[]) => {
    const hasOnlyOne = subNames.length === 1;
    const isOpen = openCategories.includes(categoryName);

    if (hasOnlyOne) {
      const fullLabel = `${categoryName} - ${subNames[0]}`;
      const isChecked = selected.includes(fullLabel);
      if (isChecked) {
        dispatch({ type: "REMOVE_CATEGORY_SUB", payload: fullLabel });
        setOpenCategories((prev) => prev.filter((c) => c !== categoryName));
      } else {
        dispatch({ type: "ADD_CATEGORY_SUB", payload: fullLabel });
        if (!isOpen) {
          setOpenCategories((prev) => [...prev, categoryName]);
        }
      }
    } else {
      if (isOpen) {
        setOpenCategories((prev) => prev.filter((c) => c !== categoryName));
      } else {
        setOpenCategories((prev) => [...prev, categoryName]);
      }
    }
  };

  const toggleSub = (category: string, sub: string) => {
    const label = `${category} - ${sub}`;
    const isChecked = selected.includes(label);

    if (isChecked) {
      dispatch({ type: "REMOVE_CATEGORY_SUB", payload: label });
    } else {
      dispatch({ type: "ADD_CATEGORY_SUB", payload: label });
    }

    const currentCategory = RiskCategory.find((c) => c.name === category);
    if (currentCategory) {
      const allSubs = currentCategory.sub_category.map(
        (s) => `${category} - ${s.name}`
      );

      const subSelected = allSubs.filter(
        (l) =>
          (l === label && !isChecked) || // if this sub is being selected
          (l !== label && selected.includes(l)) //  if this sub is already selected
      );

      setOpenCategories((prev) =>
        subSelected.length > 0
          ? [...new Set([...prev, category])]
          : prev.filter((c) => c !== category)
      );
    }
  };

  const filteredCategories = RiskCategory.filter((cat) => {
    const keyword = searchText.toLowerCase();
    const matchCat = cat.name.toLowerCase().includes(keyword);
    const matchSub = cat.sub_category.some((sub) =>
      sub.name.toLowerCase().includes(keyword)
    );
    return matchCat || matchSub;
  });

  return (
    <>
      <FilterSectionHeader
        icon={<LuChartColumn className="w-4 h-4" />}
        title="Risk Categories"
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />

      {isExpanded && (
        <div className="py-1 space-y-1 px-7">
          <label className="text-sm font-medium text-gray-600">
            Search Categories
          </label>
          <Input
            placeholder="Search categories or sub-categories..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full mt-1 mb-4"
          />

          {filteredCategories.map((cat) => {
            const subNames = cat.sub_category.map((s) => s.name);
            const fullLabels = subNames.map((sub) => `${cat.name} - ${sub}`);
            const isOpen = openCategories.includes(cat.name);
            const someSelected = fullLabels.some((label) =>
              selected.includes(label)
            );
            const hasOnlyOne = subNames.length === 1;

            return (
              <div key={cat.name}>
                <Checkbox
                  label={cat.name}
                  checked={
                    hasOnlyOne ? selected.includes(fullLabels[0]) : someSelected
                  }
                  onChange={() => toggleCategory(cat.name, subNames)}
                />
                {isOpen && (
                  <div className="mt-2 ml-6 space-y-1">
                    {cat.sub_category.map((sub) => {
                      const label = `${cat.name} - ${sub.name}`;
                      const matchesSearch =
                        sub.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                        cat.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase());

                      if (!matchesSearch) return null;

                      return (
                        <Checkbox
                          key={label}
                          label={sub.name}
                          checked={selected.includes(label)}
                          onChange={() => toggleSub(cat.name, sub.name)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pb-2" />
        </div>
      )}

      <div className="divider" />
    </>
  );
};

export default CategoriesFilter;
