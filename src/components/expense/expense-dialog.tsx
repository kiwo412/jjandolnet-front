import { useEffect, useState } from "react";
import { getTodayDate, SERVICE_START_DATE } from "@/utils/date";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { ExpenseCreateRequest, ExpenseDialogProps } from "@/types/expense";
import { formatAmountInput, parseAmount } from "@/utils/format";

// react-hook-form 없이 state로 하는 경우
export function ExpenseDialog({
  categories,
  onSave,
  onDelete,
  isOpen,
  onClose,
  initialData,
}: ExpenseDialogProps) {
  const [formData, setFormData] = useState({
    categoryId: initialData ? String(initialData.category.id) : "",
    amount: initialData ? formatAmountInput(String(initialData.amount)) : "",
    memo: initialData?.memo || "",
    expenseDate: initialData?.expenseDate || getTodayDate(),
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose();
    }
  };

  const handleSubmit = () => {
    //전송 전 콤마 제거
    const numericAmount = parseAmount(formData.amount);

    if (!formData.categoryId) {
      alert("소비유형을 선택해주세요.");
      return;
    }

    if (!formData.amount || numericAmount <= 0) {
      alert("금액을 정확히 입력해주세요.");
      return;
    }

    if (formData.memo.length > 25) {
      alert("메모는 25자를 넘을수 없습니다.");
      return;
    }

    if (!formData.expenseDate) {
      alert("소비날짜를 선택해주세요.");
      return;
    }

    const submitData: ExpenseCreateRequest = {
      categoryId: Number(formData.categoryId),
      amount: numericAmount,
      expenseDate: formData.expenseDate,
      memo: formData.memo,
    };

    onSave(submitData);
    handleOpenChange(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  const isEditMode = !!initialData;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-xl font-bold text-orange-600 text-center">
            {isEditMode ? "소비내역 수정" : "소비내역 등록"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-left">
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-semibold text-sm">
              소비유형
            </label>
            <select
              id="category"
              className="border p-3 rounded-xl outline-none focus:border-orange-500 transition-all"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              <option value="">선택</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="font-semibold text-sm">
              소비금액
            </label>
            <input
              id="amount"
              type="text"
              placeholder="0"
              className="border p-3 rounded-xl outline-none focus:border-orange-500 transition-all"
              value={formData.amount}
              onChange={(e) =>
                //바뀔때마다 숫자 세자리 콤마 포맷팅
                setFormData({
                  ...formData,
                  amount: formatAmountInput(e.target.value),
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="memo"
              className="flex items-baseline font-semibold text-sm"
            >
              메모
              <span className="text-[11px] text-gray-400 ml-2 font-normal">
                * 메모는 25자까지 가능합니다.
              </span>
            </label>
            <input
              id="memo"
              type="text"
              className="border p-3 rounded-xl outline-none focus:border-orange-500 transition-all"
              value={formData.memo}
              onChange={(e) =>
                setFormData({ ...formData, memo: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="date"
              className="flex items-baseline font-semibold text-sm"
            >
              소비날짜
              <span className="text-[11px] text-gray-400 ml-2 font-normal">
                * 2026.01 부터 가능합니다.
              </span>
            </label>
            <input
              id="date"
              type="date"
              max={getTodayDate()}
              min={SERVICE_START_DATE}
              className="border p-3 rounded-xl outline-none focus:border-orange-500 transition-all"
              value={formData.expenseDate}
              onChange={(e) =>
                setFormData({ ...formData, expenseDate: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-3 w-full">
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors"
            >
              {isEditMode ? "수정하기" : "등록하기"}
            </button>
            {isEditMode ? (
              <button
                onClick={handleDelete}
                className="flex-1 cursor-pointer bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md hover:bg-red-700 transition-all duration-200 tracking-tight active:scale-95 disabled:bg-red-400 disabled:cursor-not-allowed whitespace-nowrap"
              >
                삭제
              </button>
            ) : (
              ""
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
