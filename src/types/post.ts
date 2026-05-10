export type PaginatedResponse<T> = {
  content: T[];
  totalPages: number;
  number: number;
  first: boolean;
  last: boolean;
};

export type Post = {
  category: category;
  id: number;
  title: string;
  content: string;
  viewCount: number;
  nickname: string;
  uuid: string;
  createdAt: string;
};

export type PostFormProps = {
  mode: "create" | "edit";
  initialData?: Post;
  isPending?: boolean;
  onSubmit: (data: Post) => void;
  onCancel: () => void;
};

export type PostItemProps = {
  post: Post;
  onItemClick: (id: number) => void;
};

export type PostTempCondition = {
  filter: "title" | "content" | "nickname";
  keyword: string;
};

export type PostSearchRequest = PostTempCondition & {
  page: number;
};

export type PostFilterProps = {
  condition: PostTempCondition | undefined;
  onConditionChange: (newCondition: PostTempCondition) => void;
  onSearch: () => void;
};

export type PostCreateRequest = Pick<Post, "title" | "content" | "category">;

export type PostEditRequest = Pick<Post, "id" | "title" | "content">;

export type category = "FREE" | "NOTICE";
