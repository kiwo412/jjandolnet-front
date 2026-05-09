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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Loader } from "lucide-react";
import type { ChartGraphMainProps } from "@/types/expense";

export default function ChartGraphMain({
  monthDate,
  isError,
  isPending,
  data,
}: ChartGraphMainProps) {
  // 데이터 길이에 따른 동적 너비 계산
  const chartWidth = Math.max(data.length * 60, 700);

  return (
    <Card className="border-2 border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
      <CardHeader className="border-b bg-white py-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-bold text-orange-500">
            {monthDate}월 평균 짠한 차트
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 bg-white">
        <div className="w-full overflow-x-auto custom-scrollbar">
          {isError ? (
            <div className="h-[350px] flex flex-col items-center justify-center space-y-3 text-red-500">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="font-bold text-[15px]">문제가 생겼습니다.</p>
              <p className="text-sm text-gray-400">관리자에게 문의 바랍니다.</p>
            </div>
          ) : data.length === 0 ? (
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
              className="h-[350px] p-6 relative"
            >
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                  <Loader className="animate-spin text-orange-500" />
                </div>
              )}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
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
                    formatter={(value: any) => [
                      `${Number(value).toLocaleString()}원`,
                      "평균 소비",
                    ]}
                  />
                  <Bar
                    dataKey="average"
                    radius={[10, 10, 0, 0]}
                    barSize={40}
                    minPointSize={5}
                  >
                    {data.map((_, index) => (
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
  );
}
