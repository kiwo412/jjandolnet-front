import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { usePost } from "../../hooks/queries/use-posts-data";
import { Calendar, Eye, Loader, User } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { useDeletePost } from "../../hooks/mutations/post/use-delete-post";
import { useAuthStore } from "../../store/authStore";
import { getErrorMessage } from "../../utils/error";
import CommentForm from "@/components/post/Comment-form";

export default function PostDetailPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number(id) : 0;

  const uuid = useAuthStore.getState().uuid;

  const { mutate: deletePost, isPending: isDeletePending } = useDeletePost({
    onSuccess: () => {
      alert("삭제되었습니다.");
      navigate("/posts", { replace: true });
    },
    onError: (error) => {
      const message = getErrorMessage(error, "게시글 삭제에 실패했습니다.");
      alert(message);
      //    error.ts로 분리
      //   if (axios.isAxiosError(error)) {
      //     // 서버가 보낸 커스텀 에러 메시지 처리
      //     const serverMessage = error.response?.data?.message;
      //     alert(serverMessage || "게시글 삭제에 실패했습니다.");
      //   } else {
      //     //네트워크 단절이나 기타 알 수 없는 에러 처리
      //     alert("서버와 통신 중 오류가 발생했습니다.");
      //   }
    },
  });

  const { data, error, isPending } = usePost(postId);

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

  const {
    title,
    content,
    viewCount,
    nickname,
    uuid: postUuid,
    createdAt,
  } = data;

  const handleCancel = () => {
    const page = searchParams.get("page") || "0";
    const filter = searchParams.get("filter") || "title";
    const keyword = searchParams.get("keyword") || "";

    navigate(
      `/posts?page=${page}&filter=${filter}&keyword=${encodeURIComponent(keyword)}`,
    );
  };

  const handleEdit = () => {
    navigate(`/post/edit/${postId}`);
  };

  const handleDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      deletePost(postId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="bg-orange-50 text-orange-600 px-4 py-1 rounded-full text-sm font-bold">
              No. {id}
            </span>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {/* {new Date(createdAt).toLocaleDateString()} */}
                {createdAt}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {viewCount}
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
            {title}
          </h1>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <span className="font-semibold text-gray-700">{nickname}</span>
          </div>

          <Separator className="mb-10 bg-gray-300" />

          <div className="prose prose-orange max-w-none min-h-[300px] text-gray-800 leading-relaxed text-lg">
            {content}
          </div>

          <Separator className="my-10 bg-gray-300" />

          <section className="mt-10">
            <CommentForm postId={postId} />
          </section>

          <div className="flex justify-end mt-4 gap-3">
            {postUuid === uuid && (
              <div className="flex gap-3">
                <button
                  disabled={isPending || isDeletePending}
                  onClick={handleEdit}
                  className="cursor-pointer bg-orange-600 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-orange-700 transition-all duration-200 tracking-tight active:scale-95"
                >
                  수정
                </button>

                <button
                  disabled={isPending || isDeletePending}
                  onClick={handleDelete}
                  className="cursor-pointer bg-red-600 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-red-700 transition-all duration-200 tracking-tight active:scale-95 disabled:bg-red-400 disabled:cursor-not-allowed"
                >
                  삭제
                </button>
              </div>
            )}
            <button
              disabled={isPending || isDeletePending}
              onClick={handleCancel}
              className="cursor-pointer bg-white text-orange-600 border-2 border-orange-600 font-bold text-lg px-6 py-3 rounded-xl hover:bg-orange-50 transition-all duration-200 tracking-tight"
            >
              목록으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
