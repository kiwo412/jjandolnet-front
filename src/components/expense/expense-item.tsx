import { useExpenseDialogStore } from "@/store/expenseStore";
import type { ExpenseItemProps } from "@/types/expense";

export default function ExpenseItem({
  expense,
  isFirstOfDay,
}: ExpenseItemProps) {
  const openModal = useExpenseDialogStore((state) => state.openModal);

  return (
    <div className="w-full">
      {/* 날짜 구분선: 새로운 날짜가 시작될 때만 렌더링 */}
      {isFirstOfDay && (
        <div className="flex items-center gap-3 my-5 px-1">
          <div className="flex-1 h-[1px] bg-gray-100"></div>
          <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded-full">
            {expense.expenseDate}
          </span>
          <div className="flex-1 h-[1px] bg-gray-100"></div>
        </div>
      )}

      <div
        onClick={() => openModal(expense)}
        className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-50 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center text-[11px] font-bold leading-tight min-w-[45px]">
            {expense.category.name.split("/").map((part, index) => (
              <span
                key={index}
                className={`whitespace-nowrap ${index === 0 ? "text-orange-600" : "text-gray-400"}`}
              >
                {part}
              </span>
            ))}
          </div>

          <div className="flex flex-col">
            {/* <span className="text-xs text-gray-400 font-medium">
              {expense.createdAt.split("T")[1].substring(0, 5)}
            </span> */}
            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
              {expense.memo}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">
            {expense.amount.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
