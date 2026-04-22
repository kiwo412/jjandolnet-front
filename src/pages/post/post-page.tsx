import { Loader } from "lucide-react";
import CreatePostButton from "../../components/post/create-post-button";
import PostItem from "../../components/post/post-item";
import { usePosts } from "../../hooks/queries/use-posts-data";
import type { Post } from "../../types/post";

export default function PostPage() {
  const { data, error, isPending } = usePosts(0);

  if (error) return <div>임시에러</div>;
  if (isPending) return <Loader className="animate-spin" />;

  console.log("data : ", data.content);

  //id, title, viewcount, nickname createdAt
  return (
    <div>
      {data.content.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <CreatePostButton />
    </div>
  );
}
