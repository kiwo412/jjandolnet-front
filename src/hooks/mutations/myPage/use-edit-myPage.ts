import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { useMutationCallback } from "../../../types/common";
import { QUERY_KEYS } from "../../../lib/constants";
import { editMyPage } from "@/api/myPage";
import { setNickname } from "@/store/authStore";

export function useEditMyPage(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editMyPage,
    onSuccess: (res, variables) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      //주스탠드 전역 스토어의 닉네임 업데이트
      if (variables.nickname) {
        setNickname(variables.nickname);
      }

      const keysToInvalidate = [
        QUERY_KEYS.myPage,
        QUERY_KEYS.post.list(0).slice(0, 2),
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
