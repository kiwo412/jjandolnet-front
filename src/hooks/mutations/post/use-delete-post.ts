import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { deletePost } from "../../../api/post";

export function useDeletePost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.invalidateQueries({
        queryKey: ["post", "list"],
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
