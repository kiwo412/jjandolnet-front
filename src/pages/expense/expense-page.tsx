import {
  useExpenseCategoryData,
  useMyCategoryData,
  useMyScoreData,
} from "@/hooks/queries/use-expense-data";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { ExpenseDialog } from "@/components/expense/expense-dialog";
import type { ExpenseCreateRequest, ExpenseEditRequest } from "@/types/expense";
import { getErrorMessage } from "@/utils/error";
import { useCreateExpense } from "@/hooks/mutations/expense/use-create-expense";
import { ExpenseList } from "@/components/expense/expense-list";
import ExpenseIncomeItem from "@/components/expense/expense-income-item";
import { formatYearMonth, SERVICE_START_DATE } from "@/utils/date";
import { useState } from "react";
import { useIncomeData } from "@/hooks/queries/use-income-data";
import type { incomeCreateOrEditRequest } from "@/types/income";
import { useCuIncome } from "@/hooks/mutations/income/use-cu-income";
import { formatAmountInput, parseAmount } from "@/utils/format";
import { useExpenseDialogStore } from "@/store/expenseStore";
import { useEditExpense } from "@/hooks/mutations/expense/use-edit-expense";
import { useDeleteExpense } from "@/hooks/mutations/expense/use-delete-expense";
import ExpenseGraphScore from "@/components/expense/expense-graph-score";
import ExpenseGraphCategory from "@/components/expense/expense-graph-type";

export default function Expense() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const yearMonthDate = formatYearMonth(currentDate);
  const today = new Date();
  const serviceStartDate = new Date(SERVICE_START_DATE);

  const isCurrentMonthFutureFlag =
    currentDate.getFullYear() > today.getFullYear() ||
    (currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() >= today.getMonth());

  const isCurrentMonthPastFlag =
    currentDate.getFullYear() < serviceStartDate.getFullYear() ||
    (currentDate.getFullYear() === serviceStartDate.getFullYear() &&
      currentDate.getMonth() <= serviceStartDate.getMonth());

  const {
    isOpen,
    closeModal,
    expense: selectedExpense,
  } = useExpenseDialogStore();

  const {
    data: expenseCategoryData,
    error: expenseCategoryError,
    isPending: isExpenseCategoryPending,
  } = useExpenseCategoryData();

  const {
    data: incomeData,
    error: incomeError,
    isPending: isIncomePending,
  } = useIncomeData(yearMonthDate);

  const {
    data: myScoreData,
    error: myScoreError,
    isPending: isMyScorePending,
  } = useMyScoreData(yearMonthDate);

  const {
    data: myCategoryData,
    error: myCategoryError,
    isPending: isMyCategoryPending,
  } = useMyCategoryData(yearMonthDate);

  const { mutate: createExpense, isPending: isCreatePending } =
    useCreateExpense({
      onSuccess: () => {
        alert("소비내역이 등록되었습니다.");
        closeModal();
      },
      onError: (error) => {
        const message = getErrorMessage(error, "소비내역 등록에 실패했습니다.");
        alert(message);
      },
    });

  const { mutate: editExpense, isPending: isEditPending } = useEditExpense({
    onSuccess: () => {
      alert("소비내역이 수정되었습니다.");
      closeModal();
    },
    onError: (error) => {
      const message = getErrorMessage(error, "소비내역 수정에 실패했습니다.");
      alert(message);
    },
  });

  const { mutate: deleteExpense, isPending: isDeletePending } =
    useDeleteExpense({
      onSuccess: () => {
        alert("소비내역이 삭제되었습니다.");
        closeModal();
      },
      onError: (error) => {
        const message = getErrorMessage(error, "소비내역 삭제에 실패했습니다.");
        alert(message);
      },
    });

  const { mutate: cuIncome, isPending: isCuIncomePending } = useCuIncome({
    onSuccess: () => {
      alert("수입이 저장되었습니다.");
    },
    onError: (error) => {
      const message = getErrorMessage(error, "수입 저장에 실패했습니다.");
      alert(message);
    },
  });

  if (expenseCategoryError || incomeError)
    return (
      <div className="text-red-500 text-center py-10">잘못된 접근입니다.</div>
    );
  if (isExpenseCategoryPending || isIncomePending)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    );

  const incomeInitialData = {
    ...incomeData,
    amount: incomeData?.amount
      ? formatAmountInput(String(incomeData.amount))
      : 0,
  };

  const handleSaveExpense = (formData: ExpenseCreateRequest) => {
    if (selectedExpense?.id) {
      const editData: ExpenseEditRequest = {
        id: selectedExpense.id,
        ...formData,
      };
      editExpense(editData);
    } else {
      createExpense(formData);
    }
  };

  const handleDeleteExpense = () => {
    deleteExpense({
      id: selectedExpense!.id,
      yearMonthDate: yearMonthDate,
    });
  };

  const prevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className={isCurrentMonthPastFlag ? "invisible" : "visible"}>
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-orange-500"
          >
            <div className="flex items-center gap-1">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:inline">
                이전달
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            {formatYearMonth(currentDate)}
          </span>
        </div>

        <div className={isCurrentMonthFutureFlag ? "invisible" : "visible"}>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-orange-500"
          >
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium hidden sm:inline">
                다음달
              </span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      <div>
        <ExpenseIncomeItem
          key={yearMonthDate}
          initialData={incomeInitialData}
          isPending={isCuIncomePending}
          onSubmit={(data: incomeCreateOrEditRequest) => {
            data.incomeDate = formatYearMonth(currentDate);
            data.amount = parseAmount(data.amount);
            cuIncome(data);
          }}
        />
      </div>

      <ExpenseDialog
        key={`${selectedExpense?.id || "create"}-${isOpen}`}
        isOpen={isOpen}
        onClose={closeModal}
        categories={expenseCategoryData || []}
        onSave={handleSaveExpense}
        onDelete={handleDeleteExpense}
        initialData={selectedExpense}
        currentDate={currentDate}
      />

      <ExpenseList
        yearMonthDate={yearMonthDate}
        isCreatePending={isCreatePending}
        isEditPending={isEditPending}
        isDeletePending={isDeletePending}
      />

      <ExpenseGraphScore
        myScoreData={myScoreData}
        isMyScorePending={isMyScorePending}
        isCreatePending={isCreatePending}
        isEditPending={isEditPending}
        myScoreError={myScoreError}
      />

      <ExpenseGraphCategory
        myCategoryData={myCategoryData}
        isMyCategoryPending={isMyCategoryPending}
        isCreatePending={isCreatePending}
        isEditPending={isEditPending}
        myCategoryError={myCategoryError}
      />
    </div>
  );
}
