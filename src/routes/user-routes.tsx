import { Route } from "react-router-dom";
import Uag from "../pages/uag";

export default function UserRoutes() {
  return <Route path="/uag" element={<Uag />} />;
}
