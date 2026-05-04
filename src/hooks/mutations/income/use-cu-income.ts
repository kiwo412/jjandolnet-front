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
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.income.list(variables.incomeDate),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
