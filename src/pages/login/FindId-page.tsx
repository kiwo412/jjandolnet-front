import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { FindIdRequest } from "../../types/auth";
import { getMaxBirthDate } from "../../utils/date";
import TempJjandolLogo from "../../components/ui/tempJjandolLogo";
import { Loader } from "lucide-react";
import {
  useSignUpAddrData,
  useSignUpJobData,
} from "../../hooks/queries/use-sign-up-data";
import { getErrorMessage } from "@/utils/error";
import { useFindId } from "@/hooks/mutations/auth/use-find";
import IndexBackButton from "@/components/index/index-back-button";

export default function FindIdPage() {
  const navigate = useNavigate();

  const { mutate: findId, isPending: isFindIdPending } = useFindId({
    onSuccess: (data) => {
      navigate("/findId/success", {
        state: { email: data },
        replace: true,
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error, "아이디 찾기에 실패했습니다.");
      alert(message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindIdRequest>();

  const onSubmit = (data: FindIdRequest) => {
    findId(data);
  };

  const {
    data: addrData,
    error: addrError,
    isPending: isAddrPending,
  } = useSignUpAddrData();

  const {
    data: jobData,
    error: jobError,
    isPending: isJobPending,
  } = useSignUpJobData();

  if (addrError || jobError)
    return (
      <div className="text-red-500 text-center py-10">
        잠시 후 다시 시도해 주세요.
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-16rem)] p-4 pt-10 sm:pt-20">
      <div className="w-full max-w-[450px] p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <IndexBackButton />
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center mb-8 text-center">
            <TempJjandolLogo />
          </div>
        </div>

        {isAddrPending || isJobPending || isFindIdPending ? (
          <div className="flex-1 flex flex-col justify-center items-center space-y-4 py-20">
            <Loader className="animate-spin w-10 h-10 text-orange-500" />
            <p className="text-gray-400 text-sm font-medium">
              정보를 불러오는 중입니다...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="pb-2">
              <p className="text-sm text-gray-500 font-medium ml-1">
                가입 정보를 입력해 주세요.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 ml-1">
                생년월일
              </label>
              <input
                {...register("birthDate", {
                  required: "생년월일을 선택해주세요.",
                })}
                disabled={isFindIdPending}
                type="date"
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

            <div className="grid grid-cols-2 gap-3 space-y-0">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 ml-1">
                  거주 지역
                </label>
                <select
                  {...register("addressId", {
                    required: "지역을 선택해주세요.",
                  })}
                  disabled={isFindIdPending || isAddrPending}
                  className="w-full h-12 px-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all appearance-none"
                >
                  <option value="">지역 선택</option>
                  {addrData?.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.name}
                    </option>
                  ))}
                </select>
                {errors.addressId && (
                  <p className="text-red-500 text-[11px] ml-1">
                    {errors.addressId.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 ml-1">
                  직업
                </label>
                <select
                  {...register("jobId", { required: "직업을 선택해주세요." })}
                  disabled={isFindIdPending || isJobPending}
                  className="w-full h-12 px-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all appearance-none"
                >
                  <option value="">직업 선택</option>
                  {jobData?.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.name}
                    </option>
                  ))}
                </select>
                {errors.jobId && (
                  <p className="text-red-500 text-[11px] ml-1">
                    {errors.jobId.message}
                  </p>
                )}
              </div>
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
                      disabled={isFindIdPending}
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
              disabled={isFindIdPending}
              type="submit"
              className="cursor-pointer flex items-center justify-center w-full h-14 mt-8 text-base font-bold text-white bg-orange-500 rounded-xl transition-all hover:bg-orange-600 active:scale-[0.98]"
            >
              아이디 찾기
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
