import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { editComment, editPost } from "../../../api/post";
import { QUERY_KEYS } from "../../../lib/constants";

export function useEditPost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPost,
    onSuccess: (_, variables) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.invalidateQueries({
        queryKey: ["post", "list"],
      });

      const postId = variables.id;
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.detail(postId),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

export function useEditComment(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editComment,
    onSuccess: (res, variables) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      const postId = variables.postId;
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.comment(postId),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
