import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { QUERY_KEYS } from "../../../lib/constants";
import { cuIncome } from "@/api/income";

export function useCuIncome(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cuIncome,
    onSuccess: (res, variables) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      const keysToInvalidate = [
        QUERY_KEYS.income.list(variables.incomeDate),
        QUERY_KEYS.expense.myScore(variables.incomeDate),
        QUERY_KEYS.expense.myCategory(variables.incomeDate),
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
