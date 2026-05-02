import { useQuery } from "@tanstack/react-query";
import type { address, job } from "../../types/signUp";
import { QUERY_KEYS } from "../../lib/constants";
import { fetchAddress, fetchJob } from "../../api/signUp";

export const useSignUpAddrData = () => {
  return useQuery<address[]>({
    queryKey: QUERY_KEYS.address.list(),
    queryFn: () => fetchAddress(),
    staleTime: Infinity,
  });
};

export const useSignUpJobData = () => {
  return useQuery<job[]>({
    queryKey: QUERY_KEYS.job.list(),
    queryFn: () => fetchJob(),
    staleTime: Infinity,
  });
};
