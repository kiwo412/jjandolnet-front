import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
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

// 임시 데이터 (월별 짠돌 점수)
const data = [
  { name: "10대", score: 400 },
  { name: "20대", score: 300 },
  { name: "30대", score: 550 },
  { name: "40대", score: 700 },
  { name: "50대", score: 480 },
  { name: "60대 이상", score: 600 },
  { name: "70대", score: 480 },
  { name: "80대", score: 480 },
  { name: "90대", score: 480 },
  { name: "100대", score: 480 },
];

export default function Chart() {
  // 최소 800px, 데이터 한개당 60px
  const chartWidth = Math.max(data.length * 60, 800);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* 메인 그래프 영역 */}
      <Card className="border-2 border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
        <CardHeader className="border-b bg-white">
          <CardTitle className="text-lg font-bold">
            월간 짠돌력 그래프
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          {/* 가로 스크롤을 허용하는 컨테이너 */}
          <div className="w-full overflow-x-auto custom-scrollbar">
            {/* 데이터 수에 따라 너비가 결정되는 내부 div */}
            <div style={{ width: `${chartWidth}px` }} className="h-[350px] p-6">
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
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dy={10}
                    interval={0} // 모든 라벨이 다 보이도록 설정
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "#f9fafb" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="score" radius={[10, 10, 0, 0]} barSize={32}>
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 3 ? "#FF4500" : "#ffedd5"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 라디오 그룹 영역 */}
          <div className="p-6 bg-gray-50/30 flex justify-center">
            <RadioGroup defaultValue="age-option" className="w-full max-w-2xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-sm font-bold text-gray-600">
                    나이별
                  </span>
                  <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border shadow-sm">
                    <RadioGroupItem
                      value="age-option"
                      id="age-1"
                      className="text-orange-600 border-orange-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-sm font-bold text-gray-600">
                    직업별
                  </span>
                  <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border shadow-sm">
                    <RadioGroupItem
                      value="job-option"
                      id="job-1"
                      className="text-orange-600 border-orange-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-sm font-bold text-gray-600">
                    거주지역별
                  </span>
                  <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border shadow-sm">
                    <RadioGroupItem
                      value="loc-option"
                      id="loc-1"
                      className="text-orange-600 border-orange-600"
                    />
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* 하단 원그래프 및 분석 문구 영역 */}
      <div className="grid grid-cols-1 gap-4">
        {/* 원그래프 1 */}
        <Card className="border-2 border-gray-100 rounded-[24px] shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full border-[12px] border-orange-500 flex items-center justify-center shrink-0">
              <span className="font-bold text-orange-600 text-xl">75%</span>
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="font-bold text-lg text-gray-800">
                소비 항목별 비중
              </h3>
              <p className="text-gray-500 leading-relaxed">
                현재{" "}
                <span className="text-orange-600 font-semibold underline">
                  식비
                </span>{" "}
                지출이 전체의 40%를 차지하고 있습니다. 지난달 대비 외식 횟수를
                3회 줄여 짠돌 점수가 상승했습니다!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 소득 기준 소비비율 원그래프 */}
        <Card className="border-2 border-gray-100 rounded-[24px] shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full border-[12px] border-emerald-500 flex items-center justify-center shrink-0">
              <span className="font-bold text-emerald-600 text-xl">22%</span>
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="font-bold text-lg text-gray-800">
                내 소득 대비 소비 비율
              </h3>
              <p className="text-gray-500 leading-relaxed">
                사용자님의 소득 수준 대비 저축률이{" "}
                <span className="font-semibold text-emerald-600 text-lg italic">
                  상위 5%
                </span>
                에 해당합니다. 불필요한 고정 지출을 잘 방어하고 계시네요.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
