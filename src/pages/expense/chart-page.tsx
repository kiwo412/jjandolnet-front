import { useState } from "react";
import { formatMonth } from "@/utils/date";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useExpenseCategoryData,
  useMainChartData,
} from "@/hooks/queries/use-expense-data";
import { Loader } from "lucide-react";

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

  const actualChartData = mainChartData?.mainChartValues || [];

  const chartWidth = Math.max(actualChartData.length * 60, 700);

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
      <Card className="border-2 border-gray-100 rounded-[20px] shadow-sm bg-white overflow-hidden">
        <CardContent className="p-3 px-5">
          <div className="flex flex-row items-center justify-between h-11">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-1.5 h-4 bg-orange-500 rounded-full" />
              <span className="text-[15px] font-extrabold text-gray-800">
                필터
              </span>
            </div>

            <div className="flex items-center gap-6">
              <RadioGroup
                defaultValue="age"
                onValueChange={(value) =>
                  setFilter(value as "age" | "job" | "addr")
                }
                className="grid grid-cols-3 gap-1 bg-gray-100/80 p-1 rounded-[12px] w-[400px] leading-none"
              >
                {[
                  { id: "age", label: "나이", value: "age" },
                  { id: "job", label: "직업", value: "job" },
                  { id: "addr", label: "지역", value: "addr" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-center"
                  >
                    <RadioGroupItem
                      value={item.value}
                      id={item.id}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={item.id}
                      className={`w-full flex items-center justify-center h-8 rounded-[9px] text-[13px] font-bold cursor-pointer transition-all ${
                        filter === item.value
                          ? "bg-white text-orange-600 shadow-sm border border-gray-200/50"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {item.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="w-[160px]">
                <Select
                  defaultValue="all"
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full rounded-[12px] border-gray-200 bg-white text-[13px] font-bold focus:ring-orange-500 h-9 px-3">
                    <SelectValue placeholder="소비 항목" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[14px] border-gray-100 shadow-xl">
                    <SelectItem value="all" className="text-[13px] font-medium">
                      전체 항목
                    </SelectItem>
                    {categoryList?.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={String(item.id)}
                        className="text-[13px] font-medium"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-2 border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
        <CardHeader className="border-b bg-white py-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold">
              {monthDate}월 평균 짠한 차트
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white">
          <div className="w-full overflow-x-auto custom-scrollbar">
            {mainChartError ? (
              <div className="h-[350px] flex flex-col items-center justify-center space-y-3 text-red-500">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="font-bold text-[15px]">문제가 생겼습니다.</p>
                <p className="text-sm text-gray-400">
                  관리자에게 문의 바랍니다.
                </p>
              </div>
            ) : actualChartData.length === 0 ? (
              <div className="h-[350px] flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                  <span className="text-3xl">🏜️</span>
                </div>
                <p className="font-bold text-gray-800 text-[16px]">
                  조회된 데이터가 없어요
                </p>
                <p className="text-sm text-gray-400">
                  다른 필터를 선택해보시겠어요?
                </p>
              </div>
            ) : (
              <div
                style={{ width: `${chartWidth}px` }}
                className="h-[350px] p-6"
              >
                {isMainChartPending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                    <Loader className="animate-spin text-orange-500" />
                  </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={actualChartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      dy={10}
                      interval={0}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "#f9fafb" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value: any) => {
                        const numericValue = Number(value) || 0;
                        return [
                          `${numericValue.toLocaleString()}원`,
                          "평균 소비",
                        ];
                      }}
                    />
                    <Bar
                      dataKey="average"
                      radius={[10, 10, 0, 0]}
                      barSize={40}
                      minPointSize={5}
                    >
                      {actualChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 3 ? "#FF4500" : "#ffedd5"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4">
        <Card className="border-2 border-gray-100 rounded-[24px] shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full border-[8px] border-orange-500 flex items-center justify-center shrink-0">
              <span className="font-bold text-orange-600 text-xl">75%</span>
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="font-bold text-lg text-gray-800">
                소비 항목별 비중
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                현재{" "}
                <span className="text-orange-600 font-semibold underline">
                  식비
                </span>{" "}
                지출이 전체의 40%를 차지하고 있습니다. 짠돌 점수가 상승했습니다!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100 rounded-[24px] shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full border-[8px] border-emerald-500 flex items-center justify-center shrink-0">
              <span className="font-bold text-emerald-600 text-xl">22%</span>
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="font-bold text-lg text-gray-800">
                내 소득 대비 소비 비율
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                사용자님의 소득 수준 대비 저축률이{" "}
                <span className="font-semibold text-emerald-600 italic">
                  상위 5%
                </span>
                에 해당합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
