import axios from "axios";

/**
 * Axios 에러 객체에서 서버가 보낸 메시지를 안전하게 추출하는 유틸리티
 */
export const getErrorMessage = (
  error: unknown,
  defaultMessage: string,
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};
