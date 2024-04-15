import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";
import University from "./pages/university/University";
import UniversityDetailPage from "./pages/university/UniversityDetailPage";
import AdminLogin from "./admin/Pages/AdminLogin";
import AdminDashboard from "./admin/Pages/AdminDashboard";
import StudentList from "./admin/components/Basic/StudentList";
import UniversityList from "./admin/components/Basic/UniversityList";
import ProtectedRoutes from "./components/Basic/ProtectedRoutes";

const Routers = () => {
  return (
    <Routes>
      {/* Here Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/university" element={<University />} />
      <Route path="/university/universitydetail" element={<UniversityDetailPage />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/admin/dashboard/" element={<AdminDashboard />}>
          <Route path="student" element={<StudentList />} />
          <Route path="university" element={< UniversityList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
