import { useForm } from "react-hook-form";
import {
  UserPen,
  Lock,
  Briefcase,
  MapPin,
  ChevronLeft,
  Save,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useMyPageData } from "@/hooks/queries/use-myPage-data";
import { getNickname } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import type { EditFormData } from "@/types/myPage";
import {
  useSignUpAddrData,
  useSignUpJobData,
} from "@/hooks/queries/use-sign-up-data";
import { useEditMyPage } from "@/hooks/mutations/myPage/use-edit-myPage";
import { getErrorMessage } from "@/utils/error";

export default function MyPageEdit() {
  const navigate = useNavigate();
  const currentNickname = getNickname();
  const {
    data: myPageData,
    error: myPageError,
    isPending: isMyPagePending,
  } = useMyPageData();

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

  const { mutate: editMyPage, isPending: isEditMyPagePending } = useEditMyPage({
    onSuccess: () => {
      alert("내 정보가 수정되었습니다.");
      navigate("/myPage");
    },
    onError: (error) => {
      const message = getErrorMessage(error, "내 정보 수정에 실패했습니다.");
      alert(message);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditFormData>({
    values: {
      nickname: currentNickname || "",
      jobId: myPageData?.job.id || "",
      addressId: myPageData?.address.id || "",
    },
  });

  // 비밀번호 일치 여부 확인을 위해 watch 사용
  const password = watch("password");

  if (isMyPagePending || isAddrPending || isJobPending)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    );
  if (myPageError || addrError || jobError)
    return (
      <div className="text-red-500 text-center py-10">잘못된 접근입니다.</div>
    );

  const onSubmit = (data: EditFormData) => {
    editMyPage(data);
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">정보 수정</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5"
      >
        <div className="space-y-2">
          <Label icon={<UserPen size={18} />} text="닉네임" />
          <input
            {...register("nickname", {
              required: "닉네임은 필수입니다.",
              minLength: { value: 2, message: "최소 2자 이상 입력해주세요." },
              maxLength: {
                value: 10,
                message: "최대 10자까지만 가능합니다.",
              },
            })}
            disabled={
              isMyPagePending ||
              isAddrPending ||
              isJobPending ||
              isEditMyPagePending
            }
            className={`w-full px-4 py-3 rounded-xl border ${errors.nickname ? "border-red-500" : "border-gray-200"} focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all`}
          />
          {errors.nickname && (
            <ErrorMessage message={errors.nickname.message} />
          )}
        </div>

        <div className="pt-2 border-t border-gray-50 space-y-4">
          <div className="space-y-2">
            <Label icon={<Lock size={18} />} text="새 비밀번호" />
            <input
              type="password"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다.",
                },
              })}
              disabled={
                isMyPagePending ||
                isAddrPending ||
                isJobPending ||
                isEditMyPagePending
              }
              placeholder="변경할 비밀번호 (미입력 시 유지)"
              className={`w-full px-4 py-3 rounded-xl border ${errors.password ? "border-red-500" : "border-gray-200"} focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all`}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>

          <div className="space-y-2">
            <Label icon={<Lock size={18} />} text="비밀번호 확인" />
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  !password ||
                  value === password ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              disabled={
                isMyPagePending ||
                isAddrPending ||
                isJobPending ||
                isEditMyPagePending
              }
              placeholder="한 번 더 입력해주세요"
              className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? "border-red-500" : "border-gray-200"} focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all`}
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label icon={<Briefcase size={18} />} text="직업" />
          <select
            {...register("jobId", { required: "직업을 선택해주세요." })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white transition-all appearance-none"
          >
            <option value="">직업을 선택하세요</option>
            {jobData.map((j) => (
              <option key={j.id} value={j.id}>
                {j.name}
              </option>
            ))}
            disabled=
            {isMyPagePending ||
              isAddrPending ||
              isJobPending ||
              isEditMyPagePending}
          </select>
          {errors.jobId && <ErrorMessage message={errors.jobId.message} />}
        </div>

        <div className="space-y-2">
          <Label icon={<MapPin size={18} />} text="거주지역" />
          <select
            {...register("addressId", { required: "거주지역을 선택해주세요." })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white transition-all appearance-none"
          >
            <option value="">지역을 선택하세요</option>
            {addrData.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
            disabled=
            {isMyPagePending ||
              isAddrPending ||
              isJobPending ||
              isEditMyPagePending}
          </select>
          {errors.addressId && (
            <ErrorMessage message={errors.addressId.message} />
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            disabled={
              isMyPagePending ||
              isAddrPending ||
              isJobPending ||
              isEditMyPagePending
            }
            type="submit"
            className="flex-1 py-4 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            저장하기
          </button>
          <button
            disabled={
              isMyPagePending ||
              isAddrPending ||
              isJobPending ||
              isEditMyPagePending
            }
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-4 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

function Label({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
      {icon} {text}
    </label>
  );
}

function ErrorMessage({ message }: { message?: string }) {
  return (
    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
      <AlertCircle size={12} /> {message}
    </p>
  );
}
