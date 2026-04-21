export type useMutationCallback<T = any> = {
  onSuccess?: (data?: T) => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
