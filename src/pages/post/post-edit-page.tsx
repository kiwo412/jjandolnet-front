import type { Post } from "../../types/post";
import { useNavigate, useParams } from "react-router-dom";
import { useEditPost } from "../../hooks/mutations/post/use-edit-post";
import PostForm from "../../components/post/post-form";
import { usePost } from "../../hooks/queries/use-posts-data";
import { Loader } from "lucide-react";
import { getErrorMessage } from "../../utils/error";

export default function PostEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number(id) : 0;

  const { mutate: editPost, isPending: isEditPending } = useEditPost({
    onSuccess: () => {
      alert("수정 되었습니다.");
      navigate(`/post/${postId}`, { replace: true });
    },
    onError: (error) => {
      const message = getErrorMessage(error, "게시글 수정이 실패했습니다.");
      alert(message);
    },
  });

  const { data, error, isPending } = usePost(postId);

  if (error)
    return (
      <div className="text-red-500 text-center py-10">
        잠시 후 다시 시도해 주세요.
      </div>
    );
  if (isPending)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    );

  return (
    <PostForm
      mode="edit"
      initialData={data}
      isPending={isEditPending}
      onSubmit={(data: Post) => {
        data.category = "FREE";
        editPost(data);
      }}
      onCancel={() => navigate(-1)}
    />
  );
}
