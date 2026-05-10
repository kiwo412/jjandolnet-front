import { useCreateComment } from "@/hooks/mutations/post/use-create-post";
import { getErrorMessage } from "@/utils/error";
import { useState } from "react";
import CommentList from "./Comment-list";

export default function CommentForm({ postId }: { postId: number }) {
  const [content, setContent] = useState("");
  const { mutate, isPending, error } = useCreateComment({
    onSuccess: () => {
      alert("댓글이 등록 되었습니다.");
    },
    onError: (error) => {
      const message = getErrorMessage(error, "댓글 등록에 실패했습니다.");
      alert(message);
    },
  });

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ postId, content });
    setContent("");
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreateComment} className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
            댓글
          </h2>
          <button
            type="submit"
            disabled={isPending}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-300 transition-colors"
          >
            {isPending ? "등록 중..." : "댓글 등록"}
          </button>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 남겨보세요..."
          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
          rows={1}
        />
      </form>
      <CommentList postId={postId} />
    </div>
  );
}
