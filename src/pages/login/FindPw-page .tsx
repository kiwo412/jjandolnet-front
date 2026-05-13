import IndexBackButton from "@/components/index/Index-back-button";
import TempJjandolLogo from "@/components/ui/tempJjandolLogo";
import { useSendTempPw } from "@/hooks/mutations/auth/use-find";
import { getErrorMessage } from "@/utils/error";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FindPwPage() {
  const navigate = useNavigate();

  const { mutate: sendTempPw, isPending: isSendPending } = useSendTempPw({
    onSuccess: () => {
      alert(
        `입력하신 이메일로 임시 비밀번호가 발송되었습니다.
        로그인 후 반드시 비밀번호를 변경해주세요.`,
      );
      navigate("/login");
    },
    onError: (error) => {
      const message = getErrorMessage(error, "메일 발송에 실패했습니다.");
      alert(message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = (data: { email: string }) => {
    sendTempPw(data.email);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-16rem)] p-4 pt-10 sm:pt-20">
      <div className="w-full max-w-[450px] p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <IndexBackButton />
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center mb-8 text-center">
            <TempJjandolLogo />
          </div>
        </div>

        {isSendPending ? (
          <div className="flex-1 flex flex-col justify-center items-center space-y-4 py-20">
            <Loader className="animate-spin w-10 h-10 text-orange-500" />
            <p className="text-gray-400 text-sm font-medium">
              임시 비밀번호를 생성하여 메일을 보내는 중입니다...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="pb-2">
              <h2 className="text-lg font-bold text-gray-800 ml-1 mb-1">
                비밀번호 찾기
              </h2>
              <p className="text-sm text-gray-500 font-medium ml-1">
                임시 비밀번호를 받을 로그인 이메일 주소를 입력해주세요.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 ml-1">
                이메일 주소
              </label>
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "올바른 이메일 형식이 아닙니다.",
                  },
                })}
                type="email"
                placeholder="example@jjandol.net"
                className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-[11px] ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              disabled={isSendPending}
              type="submit"
              className="cursor-pointer flex items-center justify-center w-full h-14 mt-8 text-base font-bold text-white bg-orange-500 rounded-xl transition-all hover:bg-orange-600 active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              임시 비밀번호 전송
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
