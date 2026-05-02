// hooks/queries/usePosts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchPosts } from "../../api/post";
import { QUERY_KEYS } from "../../lib/constants";
import type { PaginatedResponse, Post } from "../../types/post";

export const usePosts = (page: number) => {
  return useQuery<PaginatedResponse<Post>>({
    queryKey: QUERY_KEYS.post.list(page),
    queryFn: () => fetchPosts(page),
    staleTime: 0,
  });
};

export const usePost = (postId: number) => {
  return useQuery<Post>({
    queryKey: QUERY_KEYS.post.detail(postId),
    queryFn: () => fetchPost(postId),
    staleTime: 0,
  });
};
