import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { QUERY_KEYS } from "../../../lib/constants";
import { editExpense } from "@/api/expense";

export function useEditExpense(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editExpense,
    onSuccess: (res, variable) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      const yearMonthDate = variable.expenseDate.slice(0, 7);

      const keysToInvalidate = [
        QUERY_KEYS.expense.list(yearMonthDate),
        QUERY_KEYS.expense.myScore(yearMonthDate),
        QUERY_KEYS.expense.myCategory(yearMonthDate),
        QUERY_KEYS.expense.mainChart(),
        QUERY_KEYS.expense.subChart1(),
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key, refetchType: "active" });
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
