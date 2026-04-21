import { useMutation } from "@tanstack/react-query";
import { signInWithPassword } from "../../../api/auth";
import type { useMutationCallback } from "../../../types/common";

export function useSignInWithPassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onSuccess: (data) => {
      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
