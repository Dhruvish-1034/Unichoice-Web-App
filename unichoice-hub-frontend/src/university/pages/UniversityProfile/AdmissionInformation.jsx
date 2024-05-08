import React, { useState } from "react";
import { useFormik, ErrorMessage } from "formik";
import { FormikProvider } from "formik";
import * as Yup from "yup";
import { parseCookies } from "nookies";
import Axios from "axios";
import Select from "react-select";
import apiPath from "../../../apiPath";
import CkEditor from "../../components/Basic/CkEditor";
import {
  courseName,
  tutionFees,
  seatIntakes,
  marksRequired,
  acceptingExams,
} from "../../../lib/regex";
import {
  handleOnBlur,
  handleOnchange,
} from "../../../components/Basic/regexValidation";
import { toast } from "react-toastify";

const initialValues = {
  courseName: "",
  totalFees: "",
  seatIntakes: "",
  aboutAdmission: "",
  marksRequired: "",
  acceptingExams: "",
  courseInput: "",
  previousYear: "",
  currentYear: "",
};

const validationSchema = Yup.object().shape({
  courseName: Yup.string().required("Course Name is Required!"),
  totalFees: Yup.string().required("Total Fees Website is Required!"),
  seatIntakes: Yup.string().required("Seat Intake is Required!"),
  marksRequired: Yup.string().required("Marks are Required!"),
  acceptingExams: Yup.string().required("Accepting Exams is Required!"),
});

const scholarships = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const AdmissionInformation = () => {
  const cookies = parseCookies();
  const user = cookies.user.length > 0 ? JSON.parse(cookies?.user) : "";
  const [cutOff, setCutOff] = useState({
    courseInput: "",
    currentYear: "",
    previousYear: "",
    id: "",
  });
  const [courseCutOff, setCourseCutOff] = useState([]);

  const handleInputChange = (e, fieldName) => {
    setCutOff((draft) => ({
      ...draft,
      [fieldName]: e.target.value,
    }));
  };

  const handleAddCuttoff = () => {
    if (cutOff.id === "") {
      setCutOff((draft) => {
        draft.id = Date.now();
        setCourseCutOff([...courseCutOff, cutOff]);
      });
    } else {
      const updateInformation = courseCutOff.map((data) =>
        data.id === cutOff.id ? cutOff : data
      );
      setCourseCutOff(updateInformation);
    }
    setCutOff({
      courseInput: "",
      currentYear: "",
      previousYear: "",
      id: "",
    });
  };

  const handleUpdate = (id) => {
    courseCutOff.forEach((data) => {
      if (data.id === id) {
        setCutOff(data);
      }
    });
  };

  const handleDelete = (id) => {
    const updatedCourseCutOff = courseCutOff.filter((data) => data.id !== id);
    setCourseCutOff(updatedCourseCutOff);
  };

  const handleSubmit = async (values) => {
    try {
      console.log(courseCutOff);
      console.log(values);
      let course = [];
      let current = [];
      let previos = [];
      courseCutOff.map((item) => {
        course.push(item.courseInput);
        current.push(item.currentYear);
        previos.push(item.previousYear);
      });

      values = {
        ...values,
        courseInput: course,
        currentYear: current,
        previousYear: previos,
      };

      const response = await Axios.put(
        `${apiPath.universityInformation}?universityId=${user.universityId}`,
        values
      );
      if (response && response?.status === 200) {
        if (response?.data?.code === 200) {
          toast.success(response?.data?.message);
        } else if (response?.data?.code === 400) {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editorConfig = {
    ckfinder: {
      uploadUrl: "",
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 grid-flow-row sm:grid-cols-2 sm:mt-6 sm:gap-x-6">
          <p className="font-bold col-span-2 my-6">Course Title</p>
          <div className="mb-3">
            <label className="block" htmlFor="courseName">
              Course Title:
            </label>
            <input
              type="text"
              id="courseName"
              value={formik.values.courseName}
              onChange={(e) => handleOnchange(e, courseName, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              name="courseName"
              placeholder="Enter Course"
              className="h-10 pl-2 border rounded w-full"
            />
            <ErrorMessage
              name="courseName"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-3">
            <label className="block" htmlFor="totalFees">
              Total Tution Fees:
            </label>
            <input
              type="text"
              id="totalFees"
              name="totalFees"
              value={formik.values.totalFees}
              onChange={(e) => handleOnchange(e, tutionFees, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              placeholder="Enter Total Fees"
              className="h-10 pl-2 border rounded w-full"
            />
            <ErrorMessage
              name="totalFees"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-3">
            <label className="block" htmlFor="seatIntakes">
              Seats Intake:
            </label>
            <input
              type="text"
              id="seatIntakes"
              name="seatIntakes"
              value={formik.values.seatIntakes}
              onChange={(e) => handleOnchange(e, seatIntakes, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              placeholder="Enter Seat Intake"
              className="h-10 pl-2 border rounded w-full"
            />
            <ErrorMessage
              name="seatIntakes"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-3">
            <label className="block" htmlFor="scholarships">
              Scholarships:
            </label>
            <Select
              options={scholarships}
              isClearable
              name="scholarships"
              placeholder="Select Scolarship"
              value={scholarships.find(
                (status) => status.value === formik.values.scholarships
              )}
              onChange={(e) => formik.setFieldValue("scholarships", e?.value)}
            />
            <ErrorMessage
              name="scholarships"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-3 col-span-2">
            <label className="block" htmlFor="aboutAdmission">
              About Admission:
            </label>
            <CkEditor
              config={editorConfig}
              data={
                formik?.values?.aboutAdmission
                  ? formik?.values?.aboutAdmission
                  : "<p></p>"
              }
              name="aboutAdmission"
              onChange={(event, editor) => {
                const data = editor.getData();
                formik?.setFieldValue("aboutAdmission", data);
              }}
              onBlur={() => {
                formik?.setFieldValue(
                  "aboutAdmission",
                  formik?.values?.aboutAdmission?.trim()
                );
              }}
            />
          </div>
          <p className="font-bold col-span-2 my-6">Eligibility Criteria</p>
          <div className="mb-3">
            <label className="block" htmlFor="marksRequired">
              Marks Required:
            </label>
            <input
              type="text"
              id="marksRequired"
              value={formik.values.marksRequired}
              onChange={(e) => handleOnchange(e, marksRequired, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              placeholder="Enter Marks Required"
              name="marksRequired"
              className="h-10 pl-2 border rounded w-full"
            />
            <ErrorMessage
              name="marksRequired"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <div className="mb-3">
            <label className="block" htmlFor="acceptingExams">
              Accepting Exams:
            </label>
            <input
              type="text"
              id="acceptingExams"
              value={formik.values.acceptingExams}
              onChange={(e) => handleOnchange(e, acceptingExams, formik)}
              onBlur={(e) => handleOnBlur(e, formik)}
              placeholder="Enter Accepting Exams"
              name="acceptingExams"
              className="h-10 pl-2 border rounded w-full"
            />
            <ErrorMessage
              name="acceptingExams"
              className="text-[#ca4a4a]"
              component="p"
            />
          </div>
          <p className="font-bold col-span-2 my-6">Cut-offs</p>
          <div className="grid col-span-2 grid-cols-4 row-span-1">
            <div className="mb-3">
              <label className="block" htmlFor="courseInput">
                Course:
              </label>
              <input
                type="text"
                id="courseInput"
                name="courseInput"
                value={cutOff.courseInput}
                onChange={(e) => handleInputChange(e, e.target.name)}
                placeholder="Enter Course"
                className="h-10 pl-2 border rounded w-full"
              />
            </div>
            <div className="mb-3 mx-auto">
              <label className="block" htmlFor="previousYear">
                Previous Year:
              </label>
              <input
                type="text"
                id="previousYear"
                value={cutOff.previousYear}
                onChange={(e) => handleInputChange(e, e.target.name)}
                name="previousYear"
                placeholder="Enter Cutoffs"
                className="h-10 pl-2 border rounded w-42"
              />
            </div>
            <div className="mb-3 mx-auto">
              <label className="block" htmlFor="currentYear">
                Current Year:
              </label>
              <input
                type="text"
                id="currentYear"
                name="currentYear"
                value={cutOff.currentYear}
                onChange={(e) => handleInputChange(e, e.target.name)}
                placeholder="Enter Cutoffs"
                className="h-10 pl-2 border rounded w-42"
              />
            </div>
            <div className="mt-8 mb-3">
              <button type="button" className="mx-4" onClick={handleAddCuttoff}>
                Add
              </button>
            </div>
          </div>
          <div className="col-span-2">
            {courseCutOff.length > 0 &&
              courseCutOff.map((value) => (
                <div className="grid grid-cols-5 grid-flow-row">
                  <div> {value.courseInput}</div>
                  <div> {value.previousYear}</div>
                  <div> {value.currentYear}</div>
                  <button
                    type="button"
                    className="border"
                    onClick={() => handleUpdate(value.id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="border"
                    onClick={() => handleDelete(value.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <button
            type="submit"
            className="text-white bg-gray-500 hover:bg-gray-600 rounded-md py-2 px-4"
          >
            Add
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default AdmissionInformation;
