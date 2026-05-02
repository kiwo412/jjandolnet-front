import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { deletePost } from "../../../api/post";
import { QUERY_KEYS } from "../../../lib/constants";

export function useDeletePost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.list(0).slice(0, 2),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
