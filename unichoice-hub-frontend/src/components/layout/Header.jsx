import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import hamburger from "../../image/menu.png";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <img src="/nav-icon.png" alt="Nav Icon" className="w-8 h-8 mr-2" />
          <Link to="/">
            <span className="font-bold text-xl">UniChoice Hub</span>
          </Link>
        </div>
        <div>
          <Link to="/university" className="hidden md:inline">
            University
          </Link>
        </div>
        <div>
          <Link to="/auth/login" className="mr-4 hidden md:inline">
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded hidden md:inline"
          >
            Sign Up
          </Link>
          <div className="md:hidden ">
            <img
              src={hamburger}
              className=" h-8"
              alt="icon"
              onClick={() => setIsNavOpen((prev) => !prev)}
            />
          </div>
        </div>
      </nav>
      {isNavOpen && (
        <div className="w-full  bg-gray-800 text-white pl-4 pr-2">
          <Link to="/university">
            <p className="py-1">University</p>
          </Link>
          <Link to="/auth/login">
            <p className="py-1">Login</p>
          </Link>
          <Link to="/auth/signup">
            <p className="py-1">Signup</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
