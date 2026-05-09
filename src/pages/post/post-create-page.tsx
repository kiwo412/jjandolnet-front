import type { Post } from "../../types/post";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/mutations/post/use-create-post";
import PostForm from "../../components/post/Post-form";
import { getErrorMessage } from "../../utils/error";

export default function PostCreatePage() {
  const navigate = useNavigate();

  const { mutate: createPost, isPending: isCreatePending } = useCreatePost({
    onSuccess: () => {
      navigate("/posts", { replace: true });
    },
    onError: (error) => {
      const message = getErrorMessage(error, "게시글 생성에 실패했습니다.");
      alert(message);
    },
  });

  return (
    <PostForm
      mode="create"
      isPending={isCreatePending}
      onSubmit={(data: Post) => {
        data.category = "FREE";
        createPost(data);
      }}
      onCancel={() => navigate("/posts")}
    />
  );
}
