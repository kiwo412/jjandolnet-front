export const QUERY_KEYS = {
  post: {
    all: ["post"],
    list: (page: number) => ["post", "list", { page }],
    detail: (postId: number) => ["post", "detail", postId],
    userList: (userId: string) => ["post", "userList", userId],
  },
};

export const BUCKET_NAME = "uploads";
