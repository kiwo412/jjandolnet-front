import axios from "axios";
import type { PostCreateRequest } from "../types/post";
import api from "./api";

export const fetchPost = async (page: number) => {
  try {
    const response = await api.get("/api/v1/post", {
      params: {
        page: page,
        //size: size,
        size: 10,
        sort: "createdAt,desc",
      },
    });
    console.log("response : ", response);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("게시글 조회 실패", error.response?.data || error.message);
    } else {
      console.error("게시글 조회 실패", error);
    }

    throw error;
  }
};

export const createPost = async (post: PostCreateRequest) => {
  try {
    const response = await api.post("/api/v1/post", post);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("게시글 작성 실패", error.response?.data || error.message);
    } else {
      console.error("게시글 작성 실패", error);
    }

    throw error;
  }
};
