import React from "react";
import Select from "react-select";
import { useFormik, ErrorMessage } from "formik";
import { parseCookies } from "nookies";
import { FormikProvider } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import apiPath from "../../../apiPath";
import CkEditor from "../../components/Basic/CkEditor";
import {
  handleOnBlur,
  handleOnchange,
} from "../../../components/Basic/regexValidation";
import {
  totalCoursesRegex,
  totalFacultyRegex,
  totalSeatsRegex,
  totalStudentsRegex,
  universityNameRegex,
  universityWebsiteRegex,
} from "../../../lib/regex";

const initialValues = {
  universityName: "",
  universityWebsite: "",
  state: "",
  city: "",
  researchOutput: "",
  aboutUniversity: "",
  universityStatus: "",
  totalFaculty: "",
  totalSeats: "",
  totalCourses: "",
  totalStudents: "",
  universityImage: "",
  universityLogo: "",
};

const validationSchema = Yup.object().shape({
  universityName: Yup.string().required("University Name is Required!"),
  universityWebsite: Yup.string().required("University Website is Required!"),
  city: Yup.string().required("City is Required!"),
  state: Yup.string().required("State is Required!"),
  totalCourses: Yup.string().required("Total Courses is Required!"),
  researchOutput: Yup.string().required("Research Output is Required!"),
  totalFaculty: Yup.string().required("Total Faculty is Required!"),
  totalStudents: Yup.string().required("Total Student is Required!"),
  universityStatus: Yup.string().required("University Status is Required!"),
});

const stateOptions = [
  { value: "Gujarat", label: "Gujarat" },
  { value: "Rajasthan", label: "Rajasthan" },
];

const universityStatus = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
];

const cityOptions = [
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Gandhinagar", label: "Gandhinagar" },
];

const researchOutput = [
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Very High", label: "Very High" },
];

const handleSubmit = async (value) => {
  try {
    const cookies = parseCookies();
    const user = cookies.user ? JSON.parse(cookies?.user) : "";

    const data = new FormData();
    for (const key in value) {
      data.append(key, value[key]);
    }

    for (var pair of data.entries()) {
      console.log(pair[0] + "," + pair[1]);
    }

    const response = await Axios.put(
      `${apiPath.updateUniversity}?userId=${user.userId}&universityId=${user.universityId}`,
      data
    );
  } catch (error) {
    console.error(error);
  }
};

const editorConfig = {
  ckfinder: {
    uploadUrl: "",
  },
};

const UniversityProfile = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} enctype="multipart/form-data">
        <div className="grid grid-cols-1 grid-flow-row sm:grid-cols-2 sm:mt-6 sm:gap-x-6">
          <div className="mb-4">
            <label className="block" htmlFor="universityImage">
              University Image:
            </label>
            <input
              type="file"
              id="universityImage"
              name="universityImage"
              onChange={(e) =>
                formik.setFieldValue("universityImage", e?.target?.files[0])
              }
              className="h-10 pl-2 border"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="universityLogo">
              University Logo:
            </label>
            <input
              type="file"
              id="UniversityLogo"
              name="UniversityLogo"
              onChange={(e) =>
                formik.setFieldValue("universityLogo", e?.target?.files[0])
              }
              className="h-10 pl-2 border"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="universityName">
              University Name:
            </label>
            <input
              type="text"
              id="universityName"
              name="universityName"
              value={formik.values.universityName}
              onChange={(e) => handleOnchange(e, universityNameRegex, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              className="h-10 pl-2 border rounded w-full"
              placeholder="Enter University Name"
            />
            <ErrorMessage
              name="universityName"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="universityWebsite">
              University Website:
            </label>
            <input
              type="url"
              id="universityWebsite"
              name="universityWebsite"
              value={formik.values.universityWebsite}
              onChange={(e) =>
                handleOnchange(e, universityWebsiteRegex, formik)
              }
              onBlur={(e) => handleOnBlur(e, formik)}
              className="h-10 pl-2 border rounded w-full"
              placeholder="Enter University Website"
            />
            <ErrorMessage
              name="universityWebsite"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="state">
              State:
            </label>
            <Select
              options={stateOptions}
              isClearable
              name="state"
              placeholder={"Select State"}
              value={stateOptions.find(
                (status) => status.value === formik.values.city
              )}
              onChange={(e) => formik.setFieldValue("state", e?.value)}
            />
            <ErrorMessage
              name="state"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="city">
              City:
            </label>
            <Select
              options={cityOptions}
              isClearable
              name="city"
              value={cityOptions.find(
                (status) => status.value === formik.values.city
              )}
              onChange={(e) => formik.setFieldValue("city", e?.value)}
              placeholder={"Select City"}
            />
            <ErrorMessage
              name="city"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="totalFaculty">
              Total Faculty:
            </label>
            <input
              type="text"
              id="totalFaculty"
              placeholder="Enter Total Faculty"
              value={formik.values.totalFaculty}
              onChange={(e) => handleOnchange(e, totalFacultyRegex, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              name="totalFaculty"
              className="h-10 pl-2 border w-full rounded"
            />
            <ErrorMessage
              name="totalFaculty"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="totalStudents">
              Total Student:
            </label>
            <input
              type="text"
              id="totalStudents"
              placeholder="Enter Total Students"
              name="totalStudents"
              value={formik.values.totalStudents}
              onChange={(e) => handleOnchange(e, totalStudentsRegex, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              className="h-10 pl-2 border w-full rounded"
            />
            <ErrorMessage
              name="totalStudents"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="researchOutput">
              Research Output:
            </label>
            <Select
              options={researchOutput}
              value={researchOutput.find(
                (status) => status.value === formik.values.scholarships
              )}
              onChange={(e) => formik.setFieldValue("researchOutput", e?.value)}
              isClearable
              name="researchOutput"
              id="researchOutput"
            />
            <ErrorMessage
              name="researchOutput"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="totalCourses">
              Total Courses:
            </label>
            <input
              type="text"
              name="totalCourses"
              placeholder="Enter Total Courses"
              id="totalCourses"
              value={formik.values.totalCourses}
              onChange={(e) => handleOnchange(e, totalCoursesRegex, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              className="h-10 pl-2 border w-full rounded"
            />
            <ErrorMessage
              name="totalCourses"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="universityStatus">
              University Status:
            </label>
            <Select
              options={universityStatus}
              isClearable
              value={universityStatus.find(
                (status) => status.value === formik.values.universityStatus
              )}
              onChange={(e) =>
                formik.setFieldValue("universityStatus", e?.value)
              }
              name="univeristyStatus"
              id="universityStatus"
            />
            <ErrorMessage
              name="universityStatus"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="totalSeats">
              Toatal Seats:
            </label>
            <input
              type="text"
              id="totalSeats"
              placeholder="Enter Total Seats"
              name="totalSeats"
              value={formik.values.totalSeats}
              onChange={(e) => handleOnchange(e, totalSeatsRegex, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              className="h-10 pl-2 border w-full rounded"
            />
            <ErrorMessage
              name="totalSeats"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-3 col-span-2">
            <label className="block" htmlFor="aboutUniversity">
              About University:
            </label>
            <CkEditor
              config={editorConfig}
              data={
                formik?.values?.aboutUniversity
                  ? formik?.values?.aboutUniversity
                  : "<p></p>"
              }
              name="aboutUniversity"
              onChange={(event, editor) => {
                const data = editor.getData();
                formik?.setFieldValue("aboutUniversity", data);
              }}
              onBlur={() => {
                formik?.setFieldValue(
                  "aboutUniversity",
                  formik?.values?.aboutUniversity?.trim()
                );
              }}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gray-500 hover:bg-gray-600 rounded-md py-2 px-4"
          >
            Update
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default UniversityProfile;
