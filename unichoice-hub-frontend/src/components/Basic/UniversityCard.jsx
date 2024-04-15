import React from "react";
import uiversityImage from "../../image/uni-image.jpg";
import universityLogo from "../../image/uni-logo.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { BiAddToQueue } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { GoTrophy } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";

const UniversityCard = () => {
  return (
    <div className="shadow-md mb-6 rounded">
      <div className="lg:flex block">
        <img
          src={uiversityImage}
          alt="university-img"
          className="lg:h-[25vh] lg:w-[21vw] lg:m-6 lg:mb-3 rounded w-full max-h-[38vh]"
        />
        <div>
          <div className="flex">
            <img
              src={universityLogo}
              className="lg:h-[12vh] lg:w-[6vw] ml-4 lg:ml-0 border max-h-[12vh] max-w-[28vw] mt-6"
              alt="uni-logo"
            />
            <p className="mt-6 lg:ml-6 ml-2 font-bold">
              <Link to="/university/universitydetail">
                New LJ University of Engineering and Technology
              </Link>
            </p>
          </div>
          <div className="flex mt-2 ml-4 lg:ml-0">
            <IoLocationOutline className="mt-1" />
            <p>Ahmedabad,Gujarat,India</p>
          </div>
          <hr className="block mt-4 mb-4 lg:hidden" />
          <div>
            <div className="grid grid-cols-2 lg:flex lg:justify-between mt-2 lg:w-6/12 ml-6 lg:ml-0">
              <div>
                <p>University Ranking</p>
                <div className="flex">
                  <GoTrophy className="mt-2" />
                  <p className="font-bold pt-0.5 pl-1">1000</p>
                </div>
              </div>
              <div>
                <p>Review</p>
                <div className="flex">
                  <CiStar className="mt-2" />
                  <p className="font-bold pt-0.5 pl-0.5">4</p>
                </div>
              </div>
            </div>
            <hr className="block mt-4 lg:mt-0 lg:hidden" />
          </div>
        </div>
      </div>
      <div className="ml-6 lg:mb-4 grid lg:grid-cols-6 grid-cols-2 my-2 gap-4">
        <div>
          <p>
            Status<span className="block font-bold ">Public</span>
          </p>
        </div>
        <p className="border-lg-hidden lg:border-l-2">
          <div className="lg:px-4">
            <span>Research Output</span>
            <span className="block font-bold">Very High</span>
          </div>
        </p>
        <p className="border-lg-hidden lg:border-l-2">
          <div className="lg:px-4">
            Student/Faculty Ratio
            <span className="block font-bold">21</span>
          </div>
        </p>
        <p className="border-lg-hidden lg:border-l-2">
          <div className="lg:px-4">
            Scholarships
            <span className="block font-bold">Yes</span>
          </div>
        </p>
        <p className="border-lg-hidden lg:border-l-2">
          <div className="lg:px-4">
            Size
            <span className="block font-bold">M</span>
          </div>
        </p>
        <p className="border-lg-hidden lg:border-l-2">
          <div className="lg:px-4">
            Total Faculty
            <span className="block font-bold">30</span>
          </div>
        </p>
      </div>
      <hr />
      <div className="sm:flex justify-between mx-4 py-3">
        <button
          className="border text-blue-500 border-blue-500 hover:bg-gray-50 ml-1 rounded lg:w-max  w-max p-2"
          type="button"
        >
          View University
        </button>
        <div className="flex mt-2 ml-2">
          <BiAddToQueue className="mt-1.5 mr-2" />
          <p>Compare</p>
          <CiHeart className="mt-1.5 mr-2 ml-10" />
          <p>Shortlist</p>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
