import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";
import University from "./pages/university/University";
import UniversityDetailPage from "./pages/university/UniversityDetailPage";

const Routers = () => {
  return (
    <Routes>
      {/* Here Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/university" element={<University />} />
      <Route path="/university/universitydetail" element={<UniversityDetailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
