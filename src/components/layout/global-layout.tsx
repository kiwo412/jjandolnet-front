import { Outlet } from "react-router-dom";
import { CategoryNav } from "./header/categoryNav";

export default function GlobalLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <nav className="container flex items-center justify-between h-16 px-4 mx-auto">
          <strong className="text-xl font-bold text-orange-600">
            JJandol Net
          </strong>

          <div className="flex items-center gap-2">
            <button className=" cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              로그인 및 회원가입
            </button>
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
