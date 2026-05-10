import { useInfiniteComments } from "@/hooks/queries/use-posts-data";
import { Loader } from "lucide-react";
import CommentItem from "./Comment-item";

export default function CommentList({ postId }: { postId: number }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteComments(postId);

  if (isPending) return <Loader className="animate-spin mx-auto" />;

  const allComments = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <div className="space-y-6">
      {allComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
          >
            {isFetchingNextPage ? "불러오는 중..." : "댓글 더보기"}
          </button>
        </div>
      )}
    </div>
  );
}
