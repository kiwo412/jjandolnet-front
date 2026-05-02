import { Route, Routes } from "react-router-dom";
import GlobalLayout from "../components/layout/global-layout";
import IndexPage from "../pages";
//import AdminLayout from "../components/layout/admin-layout";
//import AdminRoutes from "./admin-routes";
import LoginPage from "../pages/login/login-page";
import SignUpPage from "../pages/login/signUp-page";
import PostPage from "../pages/post/post-page";
import PostCreatePage from "../pages/post/post-create-page";
import PostDetailPage from "../pages/post/post-detail-page";
import PostEditPage from "../pages/post/post-edit-page";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        {/* <Route element={<UserAndGuestLayout />}>{UserRoutes()}</Route> */}
        <Route path="/posts" element={<PostPage />} />
        <Route path="/post/create" element={<PostCreatePage />} />
        <Route path="/post/edit/:id" element={<PostEditPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />

        {/* <Route element={<AdminLayout />}>{AdminRoutes()}</Route> */}

        <Route path="/" element={<IndexPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  );
}
