import { useMutation } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { findId } from "@/api/signUp";

export function useFindId(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: findId,
    onSuccess: (data) => {
      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
