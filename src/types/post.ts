export type Post = {
  category: "FREE" | "NOTICE";
  id: number;
  title: string;
  content: string;
  viewCount: number;
  nickname: string;
  createdAt: string;
};

export type PostCreateRequest = Pick<Post, "title" | "content" | "category">;
