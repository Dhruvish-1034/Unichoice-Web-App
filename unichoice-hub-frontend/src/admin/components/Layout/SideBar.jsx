import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

const SideBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="hidden lg:block h-[100vh]  bg-gray-200 pl-6 pr-6 pt-6 text-slate-500">
      <div className="grid grid-cols-1 lg:gap-y-[48vh] xl:gap-y-[61vh]">
        <div>
          <div className="flex pb-14">
            {/* <img src="/" alt="logo" /> */}
            <p className="font-bold text-[24px] text-black">UniChoice Hub</p>
          </div>
          <Link to="university">
            <p className="active:bg-slate-500 hover:bg-slate-400 hover:text-white  rounded-sm h-9 pt-1 pl-2">
              University
            </p>
          </Link>
          <Link to="student">
            <p className="active:bg-slate-500 hover:bg-slate-400 hover:text-white rounded-sm h-9 pt-1 pl-2">
              Students
            </p>
          </Link>
          <p className="active:bg-slate-500 hover:bg-slate-400 hover:text-white rounded-sm h-9 pt-1 pl-2">
            Openings
          </p>
        </div>
        <div className="relative">
          <hr />
          <div className="flex mt-3">
            <img
              src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3778876.jpg&fm=jpg&_gl=1*rk88hi*_ga*MTA3MTgzNjk1LjE3MTE3Nzk4NDY.*_ga_8JE65Q40S6*MTcxMjk4NTk3Ny4xMy4xLjE3MTI5ODcyMjMuMC4wLjA."
              alt="img"
              className="w-12  h-10"
            />
            <p className="font-bold ml-2 text-black">Johhn Doe</p>
            <IoMdArrowDropdown
              className="text-xl mt-1 ml-12"
              onClick={() => setIsNavOpen((value) => !value)}
            />
          </div>
          {isNavOpen && (
            <div className="absolute bottom-10 left-48 w-24 text-white pl-2 bg-gray-400">
              <Link to="/admin/login">
                <p>Log Out</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
