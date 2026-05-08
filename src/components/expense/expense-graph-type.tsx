import type { ExpenseGraphCategoryProps, MyCategory } from "@/types/expense";
import { Loader, Zap } from "lucide-react";
import { Pie, PieChart } from "recharts";

const COLOR_PALETTE = [
  "#F97316", // Orange
  "#22C55E", // Green
  "#3B82F6", // Blue
  "#A855F7", // Purple
  "#EC4899", // Pink
  "#EAB308", // Yellow
  "#14B8A6", // Teal
  "#EF4444", // Red
  "#0EA5E9", // Sky Blue
  "#6366F1", // Indigo
];

export default function ExpenseGraphCategory({
  myCategoryData,
  isMyCategoryPending,
  isCreatePending,
  isEditPending,
  myCategoryError,
}: ExpenseGraphCategoryProps) {
  const isPending = isMyCategoryPending || isCreatePending || isEditPending;

  const category = myCategoryData?.categories ?? [];
  const status = myCategoryData?.status ?? false;

  const chartData =
    status && Array.isArray(category)
      ? category.map((item: MyCategory, index: number) => ({
          name: item.name,
          value: item.expense,
          percent: item.percent,
          fill: COLOR_PALETTE[index % COLOR_PALETTE.length],
        }))
      : [{ name: "No Data", value: 1, fill: "#E5E7EB" }];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
      {status === false ? (
        <div className="flex-1 text-center py-10 text-gray-500">
          이번 달 수입/지출을 입력하고 소비 항목별 비율을 확인해보세요!
        </div>
      ) : isPending ? (
        <div className="flex-1 justify-center items-center py-10">
          <Loader className="animate-spin w-8 h-8 text-orange-500" />
        </div>
      ) : (
        <>
          <div className="relative flex-shrink-0 w-[100px] h-[100px] flex items-center justify-center">
            <PieChart width={100} height={100}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={45}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                cornerRadius={10}
                animationDuration={1000}
                stroke="none"
              />
            </PieChart>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-50 rounded-lg">
                <Zap className="w-4 h-4 text-orange-500" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">
                소비 항목 비율
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {Array.isArray(category) &&
                category.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            COLOR_PALETTE[index % COLOR_PALETTE.length],
                        }}
                      />
                      <span className="text-xs text-gray-600 truncate max-w-[80px]">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-900">
                      {item.percent}%
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
