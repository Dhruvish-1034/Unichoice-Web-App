import React from "react";
import Select from "react-select";
import UniversityCard from "../../components/Basic/UniversityCard";

const courses = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Information Technology", label: "Information Technology" },
];

const location = [
  { value: "Gujarat", label: "Gujarat" },
  { value: "Punjab", label: "Punjab" },
];

const universityType = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
];

const UniversityPage = () => {
  return (
    <div className="flex justify-center mt-[18vh]">
      <div className="w-9/12">
        <p className="text-[18px]">University and Programs</p>
        <p className="text-[30px] font-bold">6378 Universities</p>
        <div className="grid grid-flow-row md:grid-cols-3 grid-cols-1 mt-14 mb-10 p-4 gap-y-5">
          <div>
            <input
              type="search"
              id="search"
              name="search"
              className="border md:w-[20vw] w-full h-10 pl-2"
              placeholder="Search"
            />
          </div>
          <div>
            <Select
              options={courses}
              placeholder="Courses"
              className="md:w-[20vw]"
            />
          </div>
          <div>
            <Select
              options={location}
              placeholder="Loaction"
              className="md:w-[20vw]"
            />
          </div>
          <div>
            <Select
              options={universityType}
              placeholder="University type"
              className="md:w-[20vw]"
            />
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-1">
          <UniversityCard />
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
