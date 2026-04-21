import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { User } from "../../types/auth";
import { getMaxBirthDate } from "../../utils/date";
import TempJjandolLogo from "../../components/ui/tempJjandolLogo";
import { useSignUp } from "../../hooks/mutations/auth/use-sign-up";

export default function SignUpPage() {
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      alert("회원가입이 완료되었습니다!");
      navigate("/login", { replace: true });
    },
    onError: () => {
      alert("회원가입에 실패했습니다. 관리자 문의 : kiwo412@google.com");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  // 2. 폼 제출 시 실행될 함수
  const onSubmit = (data: User) => {
    signUp(data);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-16rem)] p-4 pt-10 sm:pt-20">
      <div className="w-full max-w-[450px] p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center mb-8 text-center">
            <TempJjandolLogo />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 ml-1">
              이메일
            </label>
            <input
              {...register("email", {
                required: "이메일은 필수입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
              disabled={isSignUpPending}
              type="email"
              placeholder="example@email.com"
              className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 ml-1">
              비밀번호
            </label>
            <input
              {...register("password", {
                required: "비밀번호는 필수입니다.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이어야 합니다.",
                },
              })}
              disabled={isSignUpPending}
              type="password"
              placeholder="8자 이상"
              className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
            {errors.password && (
              <p className="text-red-500 text-[11px] ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 ml-1">
              닉네임
            </label>
            <input
              {...register("nickname", {
                required: "닉네임은 필수입니다.",
                minLength: { value: 2, message: "최소 2자 이상 입력해주세요." },
                maxLength: {
                  value: 10,
                  message: "최대 10자까지만 가능합니다.",
                },
              })}
              disabled={isSignUpPending}
              type="text"
              placeholder="사용하실 닉네임을 입력하세요"
              className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
            {errors.nickname && (
              <p className="text-red-500 text-[11px] ml-1">
                {errors.nickname.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 ml-1">
              생년월일(14세 이상 가입 가능합니다.)
            </label>
            <input
              {...register("birthDate", {
                required: "생년월일을 선택해주세요.",
              })}
              disabled={isSignUpPending}
              type="date"
              // 14세 미만은 아예 선택 불가능하게 설정
              max={getMaxBirthDate(14)}
              onKeyDown={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-[11px] ml-1">
                {errors.birthDate.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 ml-1">
              성별
            </label>
            <div className="flex gap-2">
              {[
                { label: "남성", value: "M" },
                { label: "여성", value: "F" },
              ].map((gender) => (
                <label
                  key={gender.value}
                  className="flex-1 flex items-center justify-center h-12 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-600 cursor-pointer hover:bg-orange-50 hover:border-orange-200 has-[:checked]:bg-orange-50 has-[:checked]:border-orange-500 has-[:checked]:text-orange-600 transition-all"
                >
                  <input
                    {...register("gender", {
                      required: "성별을 선택해주세요.",
                    })}
                    disabled={isSignUpPending}
                    type="radio"
                    name="gender"
                    value={gender.value}
                    className="sr-only"
                  />
                  {gender.label}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-[11px] ml-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <button
            disabled={isSignUpPending}
            type="submit"
            className="cursor-pointer flex items-center justify-center w-full h-14 mt-8 text-base font-bold text-white bg-orange-500 rounded-xl transition-all hover:bg-orange-600 active:scale-[0.98]"
          >
            회원 가입
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-gray-600 font-semibold hover:underline"
            >
              로그인하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
