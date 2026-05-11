import { useLocation, useNavigate, Navigate } from "react-router-dom";
import TempJjandolLogo from "../../components/ui/tempJjandolLogo";
import { MailCheck } from "lucide-react";
import IndexBackButton from "@/components/index/index-back-button";

export default function FindIdSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  if (!email) {
    alert("잘못된 접근입니다.");
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-16rem)] p-4 pt-10 sm:pt-20">
      <div className="w-full max-w-[450px] p-8 bg-white border border-gray-100 rounded-3xl shadow-sm text-center">
        <IndexBackButton />
        <div className="flex flex-col items-center mb-10">
          <TempJjandolLogo />
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
            <MailCheck className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          아이디를 찾았습니다!
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          입력하신 정보와 일치하는 이메일 주소입니다.
        </p>

        <div className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-10">
          <span className="text-lg font-bold text-gray-900 break-all">
            {email}
          </span>
        </div>

        <button
          onClick={() => navigate("/login", { replace: true })}
          className="cursor-pointer flex items-center justify-center w-full h-14 text-base font-bold text-white bg-orange-500 rounded-xl transition-all hover:bg-orange-600 active:scale-[0.98]"
        >
          로그인하러 가기
        </button>

        <div className="mt-6">
          <button
            onClick={() => navigate("/findPw")}
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-4"
          >
            비밀번호가 기억나지 않으시나요?
          </button>
        </div>
      </div>
    </div>
  );
}
