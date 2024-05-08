import React from "react";
import UniversityHeader from "../components/Layout/UniversityHeader";
import UniversitySidebar from "../components/Layout/UniversitySidebar";
import { Outlet } from "react-router-dom";

const UniversityDashboard = () => {
  return (
    <div className="grid grid-cols-6">
      <UniversitySidebar />
      <div className="col-span-6 lg:col-span-5 mx-4">
        <UniversityHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default UniversityDashboard;
