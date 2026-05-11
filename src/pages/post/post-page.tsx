import { useState } from "react";
import { Loader } from "lucide-react";
import PostItem from "../../components/post/Post-item";
import { usePosts } from "../../hooks/queries/use-posts-data";
import type { Post, PostTempCondition } from "../../types/post";
import { getIsLogInState } from "../../store/authStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PostFilter from "@/components/post/Post-filter";

export default function PostPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //검색조건 화면 표시용 state
  const [tempCondition, setTempCondition] = useState<PostTempCondition>(() => {
    const filter = (searchParams.get("filter") ||
      "title") as PostTempCondition["filter"];
    const keyword = searchParams.get("keyword") || "";
    return {
      filter: filter,
      keyword: keyword,
    };
  });

  const currentFilter = (searchParams.get("filter") ||
    "title") as PostTempCondition["filter"];
  const currentKeyword = searchParams.get("keyword") || "";
  const currentPage = Number(searchParams.get("page")) || 0;

  const { data, error, isPending } = usePosts({
    page: currentPage,
    filter: currentFilter,
    keyword: currentKeyword,
  });

  if (error)
    return (
      <div className="text-red-500 text-center py-10">잘못된 접근입니다.</div>
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

  const handlePageChange = (pageIdx: number) => {
    setSearchParams({
      filter: currentFilter,
      keyword: currentKeyword,
      page: pageIdx.toString(),
    });
  };

  const handleDetailPage = (id: number) => {
    navigate(
      `/post/${id}?page=${currentPage}&filter=${currentFilter}&keyword=${encodeURIComponent(currentKeyword)}`,
    );
  };

  const handleLoginCheck = () => {
    if (!getIsLogInState()) {
      alert("로그인이 필요합니다!");
      return false;
    }
    navigate("/post/create");
  };

  const handleSearchClick = () => {
    setSearchParams({
      filter: tempCondition.filter,
      keyword: tempCondition.keyword,
      page: "0",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-end mb-6 mt-2 ml-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            <span className="text-orange-500">
              짠한 우리들의 이야기 나눠 봐요.
            </span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">오늘 하루도 고생했어요.</p>
        </div>

        <Button
          onClick={handleLoginCheck}
          className="bg-orange-600 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-orange-700 transition-all duration-200 tracking-tight active:scale-95"
        >
          글쓰기
        </Button>
      </div>
      <PostFilter
        condition={tempCondition}
        onConditionChange={setTempCondition}
        onSearch={handleSearchClick}
      />
      <div className="mt-4">
        {content.length > 0 ? (
          content.map((post: Post) => (
            <PostItem
              key={post.id}
              post={post}
              onItemClick={(id) => handleDetailPage(id)}
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
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
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
                  onClick={() => handlePageChange(pageIdx)}
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
            onClick={() =>
              handlePageChange(Math.min(totalPages - 1, currentPage + 1))
            }
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
