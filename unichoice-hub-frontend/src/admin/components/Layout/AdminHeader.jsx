import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="fixed">
      <div className="flex lg:my-4">
        <div className="lg:hidden">
          <GiHamburgerMenu
            className="text-xl mt-2"
            onClick={() => setIsNavOpen((value) => !value)}
          />
        </div>
        <p className="hidden md:block text-[22px] font-bold md:ml-2 lg:ml-0">
          Student
        </p>
      </div>
      {isNavOpen && (
        <div className="bg-gray-200 fixed text-slate-500 z-20 w-[20vw]">
          <Link to="/admin/dashboard/university">
            <p>University</p>
          </Link>
          <Link to="/admin/dashboard/student">
            <p>Student</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
