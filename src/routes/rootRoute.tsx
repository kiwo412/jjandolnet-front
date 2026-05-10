import { Route, Routes } from "react-router-dom";
import GlobalLayout from "../components/layout/Global-layout";
import IndexPage from "../pages/Index";
import LoginPage from "../pages/login/Login-page";
import SignUpPage from "../pages/login/SignUp-page";
import PostPage from "../pages/post/Post-page";
import PostCreatePage from "../pages/post/Post-create-page";
import PostDetailPage from "../pages/post/Post-detail-page";
import PostEditPage from "../pages/post/Post-edit-page";
import Chart from "../pages/expense/Chart-page";
import Expense from "../pages/expense/Expense-page";
import MyPage from "@/pages/myPage/My-page";
import MyPageEdit from "@/pages/myPage/My-edit-page";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/posts" element={<PostPage />} />
        <Route path="/post/create" element={<PostCreatePage />} />
        <Route path="/post/edit/:id" element={<PostEditPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />

        <Route path="/expense" element={<Expense />} />

        <Route path="/chart" element={<Chart />} />

        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myPage/edit" element={<MyPageEdit />} />

        <Route path="/" element={<IndexPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  );
}
