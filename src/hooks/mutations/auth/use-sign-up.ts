import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../api/auth";
import type { useMutationCallback } from "../../../types/common";

export function useSignUp(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
