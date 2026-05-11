import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIsLogInState } from "@/store/authStore";
import FeatureCard from "@/components/index/Feature-card";

export default function IndexPage() {
  const navigate = useNavigate();
  const logState = getIsLogInState();

  const handleLoginCheck = () => {
    if (logState) navigate("/expense");
    else navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white pt-6 pb-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-6">
              <Zap size={14} />
              <span>가장 현명한 소비 습관, 짠돌넷</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              아끼는 즐거움, <br />
              <span className="text-orange-500">기록하면 더 커집니다.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-7 leading-relaxed max-w-xl">
              작고 소중한 내돈. 소비를 기록하다보면 어디서 아껴야 할지 보일
              거에요.
              <br />
              이번 달 소비를 기록하고, 나의 짠돌력과 평균을 비교해보세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleLoginCheck}
                className="h-14 px-8 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-200 transition-all hover:-translate-y-1"
              >
                지금 기록하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-3xl" />
      </section>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-500 mb-8 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-gray-100">
            💡
          </span>
          짠돌이가 된다면 이런 걸 이용할 수 있어요
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap className="text-yellow-500" />}
            title="짠돌력 측정"
            description="나의 소비를 등록하고 짠돌력을 측정해 볼 수 있어요. 나의 짠돌력은 몇점 일까요?"
          />
          <FeatureCard
            icon={<MessageSquare className="text-blue-500" />}
            title="짠한 게시판"
            description="나만 알기 아까운 절약 꿀팁과 짠한 일상을 공유하며 함께 소통해요. "
          />
          <FeatureCard
            icon={<TrendingUp className="text-green-500" />}
            title="짠한 차트"
            description="나의 소비를 사람들의 소비와 비교해 볼 수 있어요. "
          />
        </div>
      </div>
    </div>
  );
}
