import type { Post } from "../../types/post";

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="group flex flex-col p-5 mb-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
          No. {post.id}
        </span>
        <span className="text-xs text-gray-400">{post.createdAt}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
        {post.title}
      </h3>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2">
          {/* <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-gray-500 font-bold">
              {post.nickname[0]}
            </span>
          </div> */}
          <span className="text-sm font-medium text-gray-600">
            {post.nickname}
          </span>
        </div>

        <div className="flex items-center text-gray-400 text-xs">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          {post.viewCount}
        </div>
      </div>
    </div>
  );
}
