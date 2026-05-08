import type { ExpenseGraphScoreProps } from "@/types/expense";
import { Loader, Zap } from "lucide-react";
import { Pie, PieChart } from "recharts";

export default function ExpenseGraphScore({
  myScoreData,
  isMyScorePending,
  isCreatePending,
  isEditPending,
  myScoreError,
}: ExpenseGraphScoreProps) {
  const isPending = isMyScorePending || isCreatePending || isEditPending;

  const score = myScoreData?.score ?? 0;
  const feedback = myScoreData?.feedback ?? "";
  const status = myScoreData?.status ?? false;

  const isNegative = score < 0;

  const getScoreColor = (score: number) => {
    if (score >= 51) return "text-blue-600";
    if (score <= 20) return "text-red-600";
    return "text-gray-600";
  };

  const chartData = isNegative
    ? [
        { name: "Score", value: 0, fill: "#EF4444" },
        { name: "Remaining", value: 100, fill: "#E5E7EB" },
      ]
    : [
        {
          name: "Score",
          value: score,
          fill: score <= 20 ? "#EF4444" : "#F97316",
        },
        { name: "Remaining", value: 100 - score, fill: "#E5E7EB" },
      ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
      {status === false ? (
        <div className="flex-1 text-center py-10 text-gray-500">{feedback}</div>
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
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                cornerRadius={10}
                animationDuration={1000}
                stroke="none"
              />
            </PieChart>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-gray-900 leading-none">
                {score}
              </span>
              <span className="text-[10px] text-gray-500 font-medium mt-1">
                점
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-50 rounded-lg">
                <Zap className="w-4 h-4 text-orange-500" />
              </div>
              <h4 className="font-semibold text-gray-900">짠돌력 피드백</h4>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              이번 달 당신의 짠돌력은{" "}
              <span className={`font-bold ${getScoreColor(score)}`}>
                100점 만점에 {score}점
              </span>
              {score > 20 ? " 이네요!" : " 입니다"}
              <br className="hidden sm:inline" />
              <span className={`font-bold mt-1 block ${getScoreColor(score)}`}>
                {feedback}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
