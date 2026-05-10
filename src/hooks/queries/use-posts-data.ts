import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchComments, fetchPost, fetchPosts } from "../../api/post";
import { QUERY_KEYS } from "../../lib/constants";
import type {
  Comment,
  PaginatedResponse,
  Post,
  PostSearchRequest,
} from "../../types/post";

export const usePosts = (postSearchRequest: PostSearchRequest) => {
  return useQuery<PaginatedResponse<Post>>({
    queryKey: QUERY_KEYS.post.list(postSearchRequest),
    queryFn: () => fetchPosts(postSearchRequest),
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

export const useInfiniteComments = (postId: number) => {
  return useInfiniteQuery<PaginatedResponse<Comment>>({
    queryKey: QUERY_KEYS.post.comment(postId),
    queryFn: ({ pageParam = 0 }) => fetchComments(postId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    staleTime: 0,
  });
};
