import type { Expense } from "@/types/expense";
import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

export const useExpenseDialogStore = create(
  devtools(
    combine(
      {
        expense: null as Expense | null,
        isOpen: false,
      },
      (set) => ({
        openModal: (argExpense?: Expense | null) =>
          set(
            {
              expense: argExpense,
              isOpen: true,
            },
            false,
            "expense/openModal",
          ),
        closeModal: () =>
          set({ expense: null, isOpen: false }, false, "expense/closeModal"),
      }),
    ),
    { name: "expenseDialogStore" },
  ),
);

export const useExpenseDialogActions = () => {
  const openModal = useExpenseDialogStore((state) => state.openModal);
  const closeModal = useExpenseDialogStore((state) => state.closeModal);

  return { openModal, closeModal };
};
