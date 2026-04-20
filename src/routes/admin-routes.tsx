import { Route } from "react-router-dom";
import Ad from "../pages/ad";

export default function AdminRoutes() {
  return <Route path="/ad" element={<Ad />} />;
}
