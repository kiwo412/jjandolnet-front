import type {
  PostCreateRequest,
  PostEditRequest,
  PostSearchRequest,
} from "../types/post";
import api from "./api";

export const fetchPosts = async (postSearchRequest: PostSearchRequest) => {
  const { page, filter, keyword } = postSearchRequest;

  const response = await api.get("/api/v1/post", {
    params: {
      page: page,
      size: 5,
      sort: "createdAt,desc",
      filter: filter,
      keyword: keyword,
    },
  });
  return response.data.data;
};

export const fetchPost = async (postId: number) => {
  const response = await api.get(`/api/v1/post/${postId}`);
  return response.data.data;
};

export const createPost = async (post: PostCreateRequest) => {
  const response = await api.post("/api/v1/post", post);
  return response.data;
};

export const editPost = async (post: PostEditRequest) => {
  const response = await api.put("/api/v1/post", post);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await api.delete(`/api/v1/post/${postId}`);

  //예외처리는 tanstackquery의 뮤테이션으로 던지고 여기선 순수 데이터만 처리하기로.
  // try {
  //   const response = await api.delete(`/api/v1/post/${postId}`);
  //   return response.data;
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     const errorMessage =
  //       error.response?.data?.message || "게시글 삭제에 실패했습니다.";
  //   } else {

  //   }

  //   throw error;
  // }
};
