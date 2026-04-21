import { Link, Outlet, useNavigate } from "react-router-dom";
import { CategoryNav } from "./header/categoryNav";
import TempJjandolLogo from "../ui/tempJjandolLogo";
import {
  getIsLogInState,
  authlogoutActions,
  useLogout,
} from "../../store/authStore";

export default function GlobalLayout() {
  const navigate = useNavigate();
  //로그아웃 리렌더링을 위한 정적방식 아닌 셀렉터 방식.
  const logout = useLogout();
  const loginState = getIsLogInState();

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      authlogoutActions.logout();
      //logout();
      //navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <nav className="container flex items-center justify-between h-16 px-4 mx-auto">
          <TempJjandolLogo />

          <div className="flex items-center gap-2">
            {loginState ? (
              <button
                onClick={handleLogout}
                className="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/login"
                className="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                로그인 및 회원가입
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto mb-8">
          <CategoryNav />
        </div>

        <Outlet />
      </main>

      <footer className="py-6 border-t border-gray-200 bg-white">
        <div className="container px-4 mx-auto text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} JJandol Net. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
