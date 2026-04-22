import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { createPost } from "../../../api/post";
import { QUERY_KEYS } from "../../../lib/constants";

export function useCreatePost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
