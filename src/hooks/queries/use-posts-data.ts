// hooks/queries/usePosts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../../api/post";
import { QUERY_KEYS } from "../../lib/constants";

export const usePosts = (page: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: () => fetchPost(page),
    staleTime: Infinity,
  });
};
