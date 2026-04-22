export const QUERY_KEYS = {
  post: {
    all: ["post"],
    list: ["post", "list"],
    userList: (userId: string) => ["post", "userList", userId],
    byid: (postId: number) => ["post", "list", postId],
  },
};

export const BUCKET_NAME = "uploads";
