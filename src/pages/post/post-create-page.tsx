import { useForm } from "react-hook-form";
import type { Post } from "../../types/post";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/mutations/post/use-create-post";

export default function PostCreatePage() {
  const navigate = useNavigate();

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      navigate("/posts", { replace: true });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleCancel = () => {
    navigate("/posts");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  // 2. 폼 제출 시 실행될 함수
  const onSubmit = (data: Post) => {
    data.category = "FREE";
    createPost(data);
  };

  return (
    <div>
      <div className="flex items-center whitespace-nowrap">
        <svg
          className="w-8 h-8 text-orange-600 mr-2 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>

        <strong className="text-3xl font-bold tracking-tight text-gray-950">
          <span className="text-orange-600">짠한 글 작성 </span>
        </strong>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <input
            {...register("title", {
              required: "제목을 입력해주세요.",
            })}
            disabled={isCreatePostPending}
            type="text"
            className="w-full h-12 px-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            placeholder="내용을 입력해주세요."
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="relative">
          <textarea
            {...register("content", {
              required: "내용을 입력해주세요.",
            })}
            disabled={isCreatePostPending}
            className="w-full h-60 p-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all resize-none"
            placeholder="내용을 입력해주세요."
          />
          {errors.content && (
            <p className="text-red-500 text-[11px] ml-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-4 gap-3">
          <button
            disabled={isCreatePostPending}
            type="submit"
            className="cursor-pointer bg-orange-600 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-orange-700 transition-all duration-200 tracking-tight active:scale-95"
          >
            작성완료
          </button>
          <button
            disabled={isCreatePostPending}
            onClick={handleCancel}
            className="cursor-pointer bg-white text-orange-600 border-2 border-orange-600 font-bold text-lg px-6 py-3 rounded-xl hover:bg-orange-50 transition-all duration-200 tracking-tight"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
