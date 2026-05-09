import { useState } from "react";
import { formatMonth } from "@/utils/date";
import {
  useExpenseCategoryData,
  useMainChartData,
  useSubChart1Data,
} from "@/hooks/queries/use-expense-data";
import { Loader } from "lucide-react";
import ChartFilter from "@/components/chart/Chart-filter";
import ChartGraphMain from "@/components/chart/Chart-graph-main";
import ChartGraphSub from "@/components/chart/Chart-graph-sub";

export default function Chart() {
  const [filter, setFilter] = useState<"age" | "job" | "addr">("age");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const today = new Date();
  const monthDate = formatMonth(today);

  const {
    data: categoryList,
    error: categoryError,
    isPending: isCategoryPending,
  } = useExpenseCategoryData();

  const {
    data: mainChartData,
    error: mainChartError,
    isPending: isMainChartPending,
  } = useMainChartData({
    filter,
    selectedCategory: selectedCategory === "all" ? 0 : Number(selectedCategory),
  });

  const {
    data: subChart1Data,
    error: subChart1Error,
    isPending: isSubChart1Pending,
  } = useSubChart1Data({
    filter,
    selectedCategory: selectedCategory === "all" ? 0 : Number(selectedCategory),
  });

  const actualChartData = mainChartData?.mainChartValues || [];

  if (categoryError)
    return (
      <div className="text-red-500 text-center py-10">잘못된 접근입니다.</div>
    );
  if (isCategoryPending)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <ChartFilter
        filter={filter}
        onFilterChange={setFilter}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryList={categoryList}
      />

      <ChartGraphMain
        monthDate={monthDate}
        isError={!!mainChartError}
        isPending={isMainChartPending}
        data={actualChartData}
      />

      <div className="grid grid-cols-1 gap-4">
        <ChartGraphSub
          data={subChart1Data}
          isError={!!subChart1Error}
          isPending={isSubChart1Pending}
          filter={filter}
        />
      </div>
    </div>
  );
}
