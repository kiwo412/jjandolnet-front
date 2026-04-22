import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function CreatePostButton() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/post/create");
  };

  return (
    <div className="flex justify-end w-full">
      <Button
        onClick={handleButtonClick}
        className="bg-orange-600 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-orange-700 transition-all duration-200 tracking-tight active:scale-95"
      >
        글쓰기
      </Button>
    </div>
  );
}
