import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { QUERY_KEYS } from "../../../lib/constants";
import { createExpense } from "@/api/expense";

export function useCreateExpense(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpense,
    onSuccess: (res, variable) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      const yearMonthDate = variable.expenseDate.slice(0, 7);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.expense.list(yearMonthDate),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.expense.myScore(yearMonthDate),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.expense.myCategory(yearMonthDate),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
