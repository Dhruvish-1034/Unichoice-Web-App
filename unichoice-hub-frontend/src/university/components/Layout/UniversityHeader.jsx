import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const UniversityHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      <div>
        <div className="flex justify-between lg:my-4 ">
          <div className="flex">
            <div className="lg:hidden">
              <GiHamburgerMenu
                className="text-xl mt-2"
                onClick={() => setIsNavOpen((value) => !value)}
              />
            </div>
            <p className="hidden md:block text-[22px] font-bold md:ml-2 lg:ml-0">
              Dashboard
            </p>
          </div>
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
    </>
  );
};

export default UniversityHeader;
