import React from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import img1 from "../image/pexelsimage2.jpg";

const Home = () => {
  return (
    <div>
      <div
        className="flex items-center justify-center h-[70vh] bg-cover bg-center bg-[url('../image/herosection.jpg')]"
        // style={{
        //   backgroundImage:
        //     "linear-gradient(rgb(9 2 2 / 0%), rgb(0 0 0 / 37%)), url('./Images/herosection.jpg')",
        // }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Perfect University
          </h1>
          <p className="text-lg mb-8">
            Explore thousands of courses and programs to kickstart your academic
            journey.
          </p>
        </div>
      </div>
      {/*hero-section end */}
      <div className="mt-20 mb-20">
        <p className="text-[28px] flex justify-center font-bold py-4">
          Why Uni Choice Hub?
        </p>
        <div className="flex justify-evenly py-4 mx-36">
          <div className="mx-4">
            <FaGraduationCap className="text-4xl mx-auto mb-4" />
            <p>
              Forum posts across thousands of topics related to college planning
              and selection, chances for admission, campus life and more.
            </p>
          </div>
          <div className="mx-4">
            <FaRankingStar className="text-4xl mx-auto mb-4" />
            <p>
              Comparing colleges and exploring top-ranking institutions are
              essential steps in the journey of finding the right educational
              fit.
            </p>
          </div>
          <div className="mx-4">
            <FaUniversity className="text-4xl mx-auto mb-4" />
            <p>
              In-depth college and university profiles that provide admission
              stats, plus valuable info on student life, academics, cost and
              more.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center mt-10 mx-16 bg-slate-400">
        <div className="w-1/2 px-10">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              What can you do with BigFuture?
            </h2>
            <p className="text-lg mb-4">
              You can check out careers you’re interested in. You can find
              colleges based on what’s important to you.
            </p>
          </div>
          {/* Photo */}
        </div>
        <div className="w-1/2">
          <img src={img1} alt="this is an img" className="px-12 py-8" />
        </div>
      </div>
    </div>
  );
};

export default Home;
