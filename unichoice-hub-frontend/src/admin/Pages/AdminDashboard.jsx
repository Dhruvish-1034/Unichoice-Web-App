import React from "react";
import SideBar from "../components/Layout/SideBar";
import AdminHeader from "../components/Layout/AdminHeader";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-6">
      <SideBar />
      <div className="col-span-6 lg:col-span-5 mx-4">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
