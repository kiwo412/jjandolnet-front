import { useMutation } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { findId, sendTempPw } from "@/api/signUp";

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

export function useSendTempPw(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: sendTempPw,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
