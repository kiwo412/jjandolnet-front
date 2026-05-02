import { useState } from "react";
import { Loader } from "lucide-react"; // Assuming Loader is a component from lucide-react
import CreatePostButton from "../../components/post/create-post-button";
import PostItem from "../../components/post/post-item";
import { usePosts } from "../../hooks/queries/use-posts-data";
import type { Post } from "../../types/post";
import { getIsLogInState } from "../../store/authStore";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PostPage() {
  //console.log("uuid : " + useAuthStore.getState().uuid);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = searchParams.get("page");
    return savedPage ? Number(savedPage) : 0;
  });

  const { data, error, isPending } = usePosts(currentPage);

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

  const { content, totalPages, number, first, last } = data;

  const getPageNumbers = () => {
    const maxButtons = 5;
    let start = Math.max(0, number - Math.floor(maxButtons / 2));
    const end = Math.min(totalPages - 1, start + maxButtons - 1);

    // 끝부분에서 버튼 5개를 채우기 위한 보정
    if (end - start + 1 < maxButtons) {
      start = Math.max(0, end - maxButtons + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pagesToShow = getPageNumbers();

  //예외 값 방어.
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
  };

  const handleDetailPage = ({ id, page }: { id: number; page: number }) => {
    navigate(`/post/${id}?page=${page}`);
  };

  const handleLoginCheck = () => {
    if (!getIsLogInState()) {
      alert("로그인이 필요합니다!");
      return false;
    }
    return true;
  };

  return (
    <div className="container mx-auto p-4">
      <CreatePostButton onCreateClick={handleLoginCheck} />
      <div className="mt-4">
        {content.length > 0 ? (
          content.map((post: Post) => (
            <PostItem
              key={post.id}
              post={post}
              onItemClick={(id) => handleDetailPage({ id, page: currentPage })}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            게시글이 없습니다.
          </div>
        )}
      </div>

      {/* pagenation */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={first || isPending}
            className="px-4 py-2 bg-orange-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            이전
          </button>
          <span className="text-lg font-medium">
            <div className="flex items-center gap-2">
              {pagesToShow.map((pageIdx) => (
                <button
                  key={pageIdx}
                  onClick={() => setCurrentPage(pageIdx)}
                  disabled={isPending}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    number === pageIdx
                      ? "bg-orange-500 text-white font-bold"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {pageIdx + 1}
                </button>
              ))}
            </div>
          </span>
          <button
            onClick={handleNextPage}
            disabled={last || isPending}
            className="px-4 py-2 bg-orange-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
