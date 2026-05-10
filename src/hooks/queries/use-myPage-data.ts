import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../lib/constants";
import type { AxiosError } from "axios";
import type { CustomAxiosErrorResponse } from "@/utils/error";
import type { MyPageResponse } from "@/types/myPage";
import { getMyPage } from "@/api/myPage";

export const useMyPageData = () => {
  return useQuery<MyPageResponse, AxiosError<CustomAxiosErrorResponse>>({
    queryKey: QUERY_KEYS.myPage,
    queryFn: () => getMyPage(),
    staleTime: Infinity,
  });
};
