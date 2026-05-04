import { useExpenseList } from "@/hooks/queries/use-expense-data";
import { Loader } from "lucide-react";
import ExpenseItem from "./expense-item";
import "../../style/scroll.css";
import { useExpenseDialogStore } from "@/store/expenseStore";

export function ExpenseList({
  isCreatePending,
  isEditPending,
}: {
  isCreatePending: boolean;
  isEditPending: boolean;
}) {
  const { openModal } = useExpenseDialogStore();
  const { data, error, isPending } = useExpenseList();

  if (error)
    return (
      <div className="text-red-500 text-center py-10">잘못된 접근입니다.</div>
    );
  if (isPending || isCreatePending || isEditPending)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    );

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        소비 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">최근 소비 내역</h2>
        <button
          onClick={() => openModal(null)}
          className="cursor-pointer bg-orange-600 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-orange-700 transition-all duration-200 active:scale-95"
        >
          소비내역 등록
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="h-100 overflow-y-auto pr-2 custom-scrollbar border-b border-transparent">
          <div className="grid gap-3">
            {data.map((item, index) => {
              const isFirst =
                index === 0 || data[index - 1].expenseDate !== item.expenseDate;

              return (
                <ExpenseItem
                  key={item.id}
                  expense={item}
                  isFirstOfDay={isFirst}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
