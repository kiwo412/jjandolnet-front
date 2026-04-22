import {
  Megaphone,
  UserCircle,
  PiggyBank,
  LayoutList,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  { id: "notice", label: "짠한공지", icon: Megaphone },
  { id: "myPage", label: "내 정보", icon: UserCircle },
  { id: "expense", label: "짠돌력", icon: PiggyBank },
  { id: "posts", label: "짠한게시판", icon: LayoutList },
  { id: "rank", label: "짠한 랭킹", icon: Trophy },
];

export function CategoryNav() {
  const navigate = useNavigate();

  const handleNavigate = (menuId: string) => {
    navigate(`/${menuId}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-8 bg-white shadow-sm rounded-xl">
      {categories.map((category) => (
        <button
          onClick={() => handleNavigate(category.id)}
          key={category.id}
          className="cursor-pointer group flex flex-col items-center justify-center w-24 h-24 transition-all duration-200 rounded-lg hover:bg-gray-50 active:scale-95"
        >
          <div className="flex items-center justify-center p-3 mb-2 border border-gray-100 rounded-2xl group-hover:border-orange-500 group-hover:bg-orange-50">
            <category.icon
              className="w-8 h-8 text-gray-600 transition-colors group-hover:text-orange-500"
              strokeWidth={1.5}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
            {category.label}
          </span>
        </button>
      ))}
    </div>
  );
}
