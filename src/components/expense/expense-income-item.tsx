import { Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import type { Income, IncomeFormProps } from "@/types/income";
import { formatAmountInput } from "@/utils/format";

export default function ExpenseIncomeItem({
  initialData,
  isPending,
  onSubmit,
}: IncomeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Income>({
    defaultValues: initialData,
  });

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
          <div className="p-2 bg-green-50 rounded-lg">
            <Wallet className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">
            이번 달 나의 총 수입은?
          </h3>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              id="income-amount"
              type="text"
              {...register("amount", {
                required: "금액을 입력해주세요.",
                validate: (value) => {
                  const numericValue = Number(String(value).replace(/,/g, ""));
                  if (isNaN(numericValue) || numericValue <= 0) {
                    return "금액은 0보다 커야 합니다.";
                  }
                  return true;
                },
                pattern: {
                  value: /^[1-9][0-9,]*$/,
                  message: "0으로 시작할 수 없으며 숫자만 입력 가능합니다.",
                },
                onChange: (e) => {
                  const { value } = e.target;

                  const onlyNumber = value
                    .replace(/[^0-9]/g, "")
                    .replace(/^0+/, "");
                  e.target.value = formatAmountInput(onlyNumber);
                },
              })}
              disabled={isPending}
              className="w-full h-11 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-right pr-10 font-bold text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-sm">
              원
            </span>

            {errors.amount && (
              <p className="text-red-500 text-[10px] absolute -bottom-5 left-1 whitespace-nowrap">
                {errors.amount.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="px-5 h-11 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.95] whitespace-nowrap flex-shrink-0"
            disabled={isPending}
          >
            저장
          </button>
        </form>
      </div>
    </div>
  );
}
