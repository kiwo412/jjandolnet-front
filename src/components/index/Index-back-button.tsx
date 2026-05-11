import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IndexBackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="absolute left-4 top-7 p-2 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all cursor-pointer"
      title="메인으로 돌아가기"
    >
      <ChevronLeft size={28} strokeWidth={2.5} />
    </button>
  );
}
