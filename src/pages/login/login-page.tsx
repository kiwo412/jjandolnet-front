import { Link, useNavigate } from "react-router-dom";
import TempJjandolLogo from "../../components/ui/tempJjandolLogo";
import { useSignInWithPassword } from "../../hooks/mutations/auth/use-sign-in-with-password";
import type { LoginRequest, Token } from "../../types/auth";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onSuccess: (data) => {
        const token: Token = data.data.data;
        useAuthStore.getState().setToken(token.accessToken);
        navigate("/", { replace: true });
      },
      onError: (error) => {
        alert(error.message);
        // setEmail("");
        // setPassword("");
        //react-hook-form
        reset();
      },
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginRequest>();

  // 2. 폼 제출 시 실행될 함수
  const onSubmit = (data: LoginRequest) => {
    signInWithPassword(data);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-16rem)] p-4 pt-20 sm:pt-32">
      <div className="w-full max-w-[400px] p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <div className="flex flex-col items-center mb-8 text-center">
          <TempJjandolLogo />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <input
              {...register("email", {
                required: "아이디를 입력해주세요.",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
                  message:
                    "아이디 형식이 올바르지 않습니다. ex) example@email.com",
                },
              })}
              disabled={isSignInWithPasswordPending}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="example@email.com"
              className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이어야 합니다.",
                },
              })}
              disabled={isSignInWithPasswordPending}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
            {errors.password && (
              <p className="text-red-500 text-[11px] ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isSignInWithPasswordPending}
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
