import { useState } from "react"; // 1. useState 추가
import { useEditComment } from "@/hooks/mutations/post/use-edit-post";
import { useAuthStore } from "@/store/authStore";
import type { CommentItemProps } from "@/types/post";
import { getErrorMessage } from "@/utils/error";
import { useDeleteComment } from "@/hooks/mutations/post/use-delete-post";

export default function CommentItem({ comment, postId }: CommentItemProps) {
  const currentUserUuid = useAuthStore((state) => state.uuid);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { mutate: editComment, isPending: isEditCommentPending } =
    useEditComment({
      onSuccess: () => {
        alert("댓글이 수정되었습니다.");
        setIsEditing(false);
      },
      onError: (error) => {
        const message = getErrorMessage(error, "댓글 수정에 실패했습니다.");
        alert(message);
      },
    });

  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment({
      onSuccess: () => {
        alert("댓글이 삭제되었습니다.");
      },
      onError: (error) => {
        const message = getErrorMessage(error, "댓글 삭제를 실패했습니다.");
        alert(message);
      },
    });

  const handleEditOpen = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleSubmit = () => {
    if (!editContent.trim()) return alert("내용을 입력해주세요.");
    editComment({
      id: comment.id,
      postId: postId,
      content: editContent,
    });
  };

  const handleDelete = () => {
    deleteComment({
      id: comment.id,
      postId: postId,
    });
  };

  return (
    <div className="flex flex-col gap-2 pb-6 border-b border-gray-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">{comment.nickname}</span>
          <span className="text-xs text-gray-400">
            {comment.createdAt.replace("T", " ").split(".")[0]}
          </span>
        </div>

        {comment.uuid === currentUserUuid && !isEditing && (
          <div className="flex gap-3">
            <button
              onClick={handleEditOpen}
              type="button"
              className="text-gray-400 text-sm hover:underline"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="text-red-400 text-sm hover:underline"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2 space-y-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSubmit}
              disabled={isEditCommentPending || isDeleteCommentPending}
              className="text-sm px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-300"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              disabled={isEditCommentPending || isDeleteCommentPending}
              className="text-sm px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded-md"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 leading-relaxed">{comment.content}</p>
      )}
    </div>
  );
}
