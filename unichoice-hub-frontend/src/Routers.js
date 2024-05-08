import React from "react";
import { Route, Routes } from "react-router-dom";
import { parseCookies } from "nookies";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";
import UniversityPage from "./pages/university/UniversityPage";
import UniversityDetailPage from "./pages/university/UniversityDetailPage";
import AdminLogin from "./admin/Pages/auth/AdminLogin";
import AdminDashboard from "./admin/Pages/AdminDashboard";
import Student from "./admin/Pages/student/Student";
import UniversityList from "./admin/Pages/university/UniversityList";
import ProtectedRoutes from "./components/Basic/ProtectedRoutes";
import UniversityDashboard from "./university/pages/UniversityDashboard";
import UniversityProfile from "./university/pages/UniversityProfile/UniversityProfile";
import AdmissionInformation from "./university/pages/UniversityProfile/AdmissionInformation";

const Routers = () => {
  const cookies = parseCookies()
  const user = cookies.user ? JSON.parse(cookies?.user) : "";

  return (
    <Routes>
      {/* Here Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/university" element={<UniversityPage />} />
      <Route path="/university/universitydetail" element={<UniversityDetailPage />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoutes />}>
        {user.role === "Admin" && (
          <Route path="/admin/dashboard/" element={<AdminDashboard />}>
            <Route index element={<Student />} />
            <Route path="university" element={< UniversityList />} />
          </Route>
        )}

        {user.role === "University" && (
          <Route path="/university/dashboard" element={<UniversityDashboard />}>
            <Route index element={<UniversityProfile />} />
            <Route path="admissioninformation" element={<AdmissionInformation />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
};

export default Routers;
