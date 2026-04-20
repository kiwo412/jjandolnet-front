export type User = {
  email: string;
  password: string;
  nickname: string;
  birthDate: string;
  gender: string;
};

export type useMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
