import { Route, Routes } from "react-router-dom";
import GlobalLayout from "../components/layout/global-layout";
import IndexPage from "../pages";
import UserAndGuestLayout from "../components/layout/userAndGuest-layout";
import UserRoutes from "./user-routes";
import AdminLayout from "../components/layout/admin-layout";
import AdminRoutes from "./admin-routes";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<UserAndGuestLayout />}>{UserRoutes()}</Route>

        <Route element={<AdminLayout />}>{AdminRoutes()}</Route>

        <Route path="/" element={<IndexPage />} />
      </Route>
    </Routes>
  );
}
