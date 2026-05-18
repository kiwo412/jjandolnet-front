import type { ChartGraphSubProps } from "@/types/expense";
import { Loader } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent } from "../ui/card";
import { getNickname } from "@/store/authStore";
import { formatAmountInput } from "@/utils/format";

export default function ChartGraphSub1({
  isError,
  isPending,
  data,
  filter,
}: ChartGraphSubProps) {
  const category = data?.category;
  const message = data?.message ?? "데이터를 불러올 수 없습니다.";
  const percent = data?.percent ?? 0;
  // const categoryAverage = (data?.categoryAverage ?? 0).toLocaleString();
  // const myTotal = (data?.myTotal ?? 0).toLocaleString();
  const categoryAverage = String(data?.categoryAverage ?? 0);
  const myTotal = String(data?.myTotal ?? 0);

  const nickname = getNickname();

  const isUnregistered = !category || data?.percent === 0.0;

  const chartData = [
    { name: "Usage", value: percent || 0 },
    { name: "Remaining", value: Math.max(0, 100 - (percent || 0)) },
  ];

  const COLORS = [percent > 100 ? "#EF4444" : "#F97316", "#3B82F6"];

  return (
    <Card className="border border-gray-100 rounded-[24px] shadow-sm overflow-hidden">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-center min-h-[160px]">
        {isPending ? (
          <div className="flex-1 flex justify-center items-center">
            <Loader className="animate-spin w-8 h-8 text-orange-500" />
          </div>
        ) : isUnregistered ? (
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <p className="text-gray-400 text-[15px] font-medium leading-relaxed px-4">
              {message}
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="relative flex-shrink-0 w-32 h-32 flex items-center justify-center">
              <PieChart width={128} height={128}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                  cornerRadius={6}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-gray-900 text-xl">
                  {Number((100 - (percent || 0)).toFixed(1))}%
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="space-y-1">
                <div className="text-gray-600 text-[15px] leading-relaxed">
                  이번 달{" "}
                  <span className="font-semibold text-[#F97316]">
                    {category}
                  </span>{" "}
                  {filter === "addr" ? "에 거주하는 사람들의 " : ""}
                  평균 소비는{" "}
                  <span className="font-semibold text-[#F97316]">
                    {formatAmountInput(categoryAverage)}
                  </span>{" "}
                  원 이었고,
                  <br />
                  <span className="font-semibold text-[#F97316]">
                    {nickname}
                  </span>{" "}
                  님의 소비는{" "}
                  <span
                    className={`font-semibold ${
                      Number(myTotal) > Number(categoryAverage)
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  >
                    {formatAmountInput(myTotal)}
                  </span>{" "}
                  원 이었어요.
                  <br />
                  <p
                    className={`mt-2 font-bold ${
                      Number(myTotal) > Number(categoryAverage)
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
