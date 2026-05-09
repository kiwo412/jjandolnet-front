import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { QUERY_KEYS } from "../../../lib/constants";
import { deleteExpense } from "@/api/expense";

export function useDeleteExpense(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      yearMonthDate,
    }: {
      id: number;
      yearMonthDate: string;
    }) => deleteExpense(id),
    onSuccess: (res, variable) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      const month = variable.yearMonthDate.slice(0, 7);

      const keysToInvalidate = [
        QUERY_KEYS.expense.list(month),
        QUERY_KEYS.expense.myScore(month),
        QUERY_KEYS.expense.myCategory(month),
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
