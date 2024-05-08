import { React, useState } from "react";
import { useFormik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Axios from "axios";
import { FormikProvider } from "formik";
import { FaGlobeAmericas } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { LuMousePointerClick } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useImmer } from "use-immer";
import Loading from "../../components/Basic/Loader";
import { useNavigate } from "react-router-dom";
import {
  firstNameRegex,
  lastNameRegex,
  phoneNumberRegex,
} from "../../lib/regex";

const intialVal = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  role: "Student",
  universityName: "",
  universityWebsite: "",
  status: "Active",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is Required!")
    .matches(/[^0-9]/, "Name should not contain any Numbers")
    .matches(/[\w]/, "Name should not have special charater"),
  lastName: Yup.string()
    .required("Last Name is Required!")
    .matches(/[^0-9]/, "Name should not contain any Numbers")
    .matches(/[\w]/, "Name should not have special charater"),
  email: Yup.string()
    .required("Email is Required!")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter correct Email"
    ),
  phoneNumber: Yup.string().required("phone Number is Required!"),
  password: Yup.string()
    .required("Password is Required!")
    .min(8, "Password should be 8 chars minimum.")
    .max(16, "Password should be 16 chars maximum.")
    .matches(/[a-zA-Z]/, "Password should contain at least one character")
    .matches(/[0-9]/, "Password should contain Numbers")
    .matches(/[^\w]/, "Password requires a special character"),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required!")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  universityName: Yup.string().matches(/[^0-9]/, "Numbers are not allowed"),
  universityWebsite: Yup.string().url("Invalid URL format"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useImmer({
    password: false,
    confirmPassword: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await Axios.post("http://localhost:4000/signup", values);
      if (response && response?.status === 200) {
        if (response?.data?.code === 200) {
          navigate("/auth/login");
          toast.success(response?.data?.message);
        } else if (response?.data?.code === 400) {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong !!");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: intialVal,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <FormikProvider value={formik}>
        <div className="flex lg:flex  h-[calc(100vh_-_64px)]">
          <div className="hidden w-6/12 justify-center items-center bg-slate-700 text-gray-300 lg:flex">
            <div>
              <p className="text-[24px] pb-4">Why should I create an account</p>
              <div className="flex my-6">
                <FaGlobeAmericas className="text-[42px] mr-4 text-black" />
                <p className="py-2">Be the first to know of new rankings</p>
              </div>
              <div className="flex my-6">
                <GiSpellBook className="text-[42px] mr-4 text-black" />
                <p className="py-4">Get access to members-only content</p>
              </div>
              <div className="flex my-6">
                <SlCalender className="text-[42px] mr-4 text-black" />
                <p className="py-2">Register for our free student events</p>
              </div>
              <div className="flex my-6">
                <LuMousePointerClick className="text-[42px] mr-4 text-black" />
                <p className="py-2">Join to Apply colleges online</p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="w-full mt-40 sm:mt-0 lg:w-6/12 flex justify-center items-center">
            <div className="w-80  sm:w-8/12">
              <div className="flex">
                <div className=" pt-4 block">
                  <img src="/" alt="img"></img>
                </div>
                <h1 className="text-[26px] font-bold">
                  <Link to="/">UniChoice Hub</Link>
                </h1>
              </div>
              <p className="mt-1 text-[26px] sm:mt-6">Signup</p>
              <p className="mb-2 mt-4">
                <span className="text-[#718284] text-[14px] pr-2">
                  Already have an account?
                </span>
                <Link to="/auth/login">Login</Link>
              </p>

              <hr />

              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:mt-6 sm:gap-x-6">
                  <div className=" sm:col-span-2 mb-3">
                    <label htmlFor="role" className="block">
                      Slelect a Role:
                    </label>
                    <select
                      name="role"
                      id="role"
                      className="border rounded w-full h-8"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.onBlur}
                    >
                      <option value="Student">Student</option>
                      <option value="University">University</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block" htmlFor="firstName">
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      onChange={(e) => {
                        const inputValue = e?.target?.value;
                        const isValid = firstNameRegex.test(inputValue);
                        const fieldName = e?.target?.name;
                        if (isValid || !inputValue)
                          formik.setFieldValue([fieldName], inputValue);
                      }}
                      onBlur={(e) => {
                        let fieldName = e?.target?.name;
                        formik.setFieldValue(
                          fieldName,
                          formik.values[fieldName]?.trim()
                        );
                      }}
                      value={formik.values.firstName}
                      className="h-10 pl-2 border rounded w-full"
                      placeholder="Enter First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      className="text-[#ca4a4a]"
                      component="p"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block" htmlFor="lastName">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      onChange={(e) => {
                        const inputValue = e?.target?.value;
                        const isValid = lastNameRegex.test(inputValue);
                        const fieldName = e?.target?.name;
                        if (isValid || !inputValue)
                          formik.setFieldValue([fieldName], inputValue);
                      }}
                      onBlur={(e) => {
                        let fieldName = e?.target?.name;
                        formik.setFieldValue(
                          fieldName,
                          formik.values[fieldName]?.trim()
                        );
                      }}
                      value={formik.values.lastName}
                      className="h-10 pl-2 border rounded w-full"
                      placeholder="Enter Last Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      className="text-[#ca4a4a]"
                      component="p"
                    />
                  </div>
                  <div className=" mb-3">
                    <label className="block" htmlFor="email">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={(e) => {
                        formik.setFieldValue("email", e?.target.value);
                      }}
                      onBlur={(e) => {
                        let fieldName = e?.target?.name;
                        formik.setFieldValue(
                          fieldName,
                          formik.values[fieldName]?.trim()
                        );
                      }}
                      className="h-10 pl-2 border rounded w-full"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      className="text-[#ca4a4a]"
                      component="p"
                    />
                  </div>
                  <div className=" mb-3">
                    <label className="block" htmlFor="phoneNumber">
                      Phone Number:
                    </label>
                    <input
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={(e) => {
                        const inputValue = e?.target?.value;
                        const isValid = phoneNumberRegex.test(inputValue);
                        const fieldName = e?.target?.name;
                        if (isValid || !inputValue)
                          formik.setFieldValue([fieldName], inputValue);
                      }}
                      onBlur={(e) => {
                        let fieldName = e?.target?.name;
                        formik.setFieldValue(
                          fieldName,
                          formik.values[fieldName]?.trim()
                        );
                      }}
                      className="h-10 pl-2 border rounded w-full"
                      placeholder="Enter Phone Number"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      className="text-[#ca4a4a]"
                      component="p"
                    />
                  </div>
                  <div className="mb-3 relative">
                    <label className="block" htmlFor="password">
                      Password:
                    </label>
                    <input
                      type={showPassword.password ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={(e) => {
                        formik.setFieldValue("password", e?.target.value);
                      }}
                      onBlur={(e) => {
                        let fieldName = e?.target?.name;
                        formik.setFieldValue(
                          fieldName,
                          formik.values[fieldName]?.trim()
                        );
                      }}
                      className=" h-10 pl-2 border rounded w-full"
                      placeholder="Enter Password"
                    />
                    <button
                      type="button"
                      className="absolute top-9 right-3"
                      onClick={() =>
                        setShowPassword((draft) => {
                          draft.password = !showPassword.password;
                        })
                      }
                    >
                      {showPassword.password ? <FaEye /> : <FaRegEyeSlash />}
                    </button>
                    <ErrorMessage
                      name="password"
                      className="text-[#ca4a4a]"
                      component="p"
                    />
                  </div>
                  <div className=" mb-3 relative">
                    <label className="block" htmlFor="confirmPassword">
                      Confirm Password:
                    </label>
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      id="confirmpass"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "confirmPassword",
                          e?.target.value
                        );
                      }}
                      onBlur={(e) => {
                        let fieldName = e?.target?.name;
                        formik.setFieldValue(
                          fieldName,
                          formik.values[fieldName]?.trim()
                        );
                      }}
                      className=" h-10 pl-2 border rounded w-full"
                      placeholder="Enter Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute top-9 right-3"
                      onClick={() =>
                        setShowPassword((draft) => {
                          draft.confirmPassword = !showPassword.confirmPassword;
                        })
                      }
                    >
                      {showPassword.confirmPassword ? (
                        <FaEye />
                      ) : (
                        <FaRegEyeSlash />
                      )}
                    </button>
                    <ErrorMessage
                      name="confirmpass"
                      className="text-[#ca4a4a]"
                      component="p"
                    />
                  </div>
                </div>
                {formik.values.role === "University" && (
                  <div className="grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-2 sm:gap-6">
                    <div className="mb-3">
                      <label className="block" htmlFor="universityName">
                        University Name:
                      </label>
                      <input
                        type="text"
                        id="universityName"
                        name="universityName"
                        value={formik.values.universityName}
                        onChange={formik.handleChange}
                        onBlur={(e) => {
                          let fieldName = e?.target?.name;
                          formik.setFieldValue(
                            fieldName,
                            formik.values[fieldName]?.trim()
                          );
                        }}
                        className=" h-10 pl-2 border rounded w-full"
                        placeholder="Enter University Name"
                        required
                      />
                      <ErrorMessage
                        name="universityName"
                        className="text-[#ca4a4a]"
                        component="p"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block" htmlFor="universityWebsite">
                        University Website:
                      </label>
                      <input
                        type="url"
                        id="universityWebsite"
                        name="universityWebsite"
                        onChange={formik.handleChange}
                        value={formik.values.universityWebsite}
                        onBlur={(e) => {}}
                        className=" h-10 pl-2 border rounded w-full"
                        placeholder="Enter university Website"
                        required
                      />
                      <ErrorMessage
                        name="universityWebsite"
                        className="text-[#ca4a4a]"
                        component="p"
                      />
                    </div>
                  </div>
                )}
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full border mt-6 bg-[#005C69] text-white p-1"
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </FormikProvider>
    </div>
  );
};

export default SignUp;
