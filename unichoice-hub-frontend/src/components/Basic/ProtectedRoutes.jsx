import { parseCookies } from "nookies";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const cookies = parseCookies();

  const adminCookie = cookies.admin;
  const token = adminCookie ? true : false;
  return token ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoutes;
