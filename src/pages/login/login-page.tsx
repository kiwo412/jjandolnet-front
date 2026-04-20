import { Link } from "react-router-dom";
import TempJjandolLogo from "../../components/ui/tempJjandolLogo";

export default function LoginPage() {
  return (
    // justify-center 대신 justify-start를 쓰고 상단 여백(pt-32)을 주어 살짝 아래로 배치
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-16rem)] p-4 pt-20 sm:pt-32">
      <div className="w-full max-w-[400px] p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <div className="flex flex-col items-center mb-8 text-center">
          <TempJjandolLogo />
        </div>

        <form className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="아이디"
              className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer flex items-center justify-center w-full h-12 mt-6 text-base font-bold text-white bg-orange-500 rounded-xl transition-all hover:bg-orange-600 active:scale-[0.98]"
          >
            로그인
          </button>
        </form>

        <div className="flex justify-center items-center gap-3 mt-8 text-xs text-gray-400">
          <Link to="/signUp" className="hover:text-gray-600 transition-colors">
            회원가입
          </Link>
          <span className="w-px h-2 bg-gray-200" />
          <Link
            to="/find-email"
            className="hover:text-gray-600 transition-colors"
          >
            아이디 찾기
          </Link>
          <span className="w-px h-2 bg-gray-200" />
          <Link
            to="/find-password"
            className="hover:text-gray-600 transition-colors"
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
}
