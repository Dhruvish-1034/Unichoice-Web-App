import React from "react";
import { useFormik, ErrorMessage } from "formik";
import { FormikProvider } from "formik";
import { FaEye } from "react-icons/fa";
import { useImmer } from "use-immer";
import Select from "react-select";
import { FaRegEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import {
  firstNameRegex,
  lastNameRegex,
  phoneNumberRegex,
} from "../../../lib/regex";
import {
  handleOnchange,
  handleOnBlur,
} from "../../../components/Basic/regexValidation";

const AddStudent = ({
  initialValues,
  setInitialValues,
  showModal,
  setShowModel,
  handleSubmit,
  userStatus,
}) => {
  const [showPassword, setShowPassword] = useImmer({ password: false });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is Required!")
      .matches(/[^0-9]/, "Name should not contain any Numbers")
      .matches(/[\w]/, "Name should not have special charater"),
    lastName: Yup.string()
      .required("Last Name is Required!")
      .matches(/[^0-9]/, "Name should not contain any Numbers")
      .matches(/[\w]/, "Name should not have special charater"),
    email: Yup.string().required("Email is Required!"),
    status: Yup.string().required("Status is Required!"),
    phoneNumber: Yup.string().required("Phone Number is Required!"),
    password: initialValues._id
      ? ""
      : Yup.string()
          .required("Password is Required!")
          .min(8, "Password should be 8 chars minimum.")
          .max(16, "Password should be 16 chars maximum.")
          .matches(/[a-zA-Z]/, "Password should contain at least one character")
          .matches(/[0-9]/, "Password should contain Numbers")
          .matches(/[^\w]/, "Password requires a special character"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => {
                setShowModel(!showModal);
                setInitialValues(initialValues);
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="p-4">
                <div>
                  <h3 className="text-xl font-bold mb-4">Student Details</h3>
                  <div className="text-gray-600">
                    <FormikProvider value={formik}>
                      <div className="w-full">
                        <form onSubmit={formik.handleSubmit}>
                          <div className="grid grid-cols-1">
                            <div className="mb-3">
                              <label className="block" htmlFor="firstName">
                                First Name:
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                onChange={(e) =>
                                  handleOnchange(e, firstNameRegex, formik)
                                }
                                onBlur={(e) => handleOnBlur(e, formik)}
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
                                onChange={(e) =>
                                  handleOnchange(e, lastNameRegex, formik)
                                }
                                onBlur={(e) => handleOnBlur(e, formik)}
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
                                type="text"
                                id="email"
                                name="email"
                                disabled={initialValues._id ? true : false}
                                value={formik.values.email}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "email",
                                    e?.target.value
                                  );
                                }}
                                onBlur={(e) => handleOnBlur(e, formik)}
                                className="h-10 pl-2 border rounded w-full"
                                placeholder="Enter Email"
                              />
                              <ErrorMessage
                                name="email"
                                className="text-[#ca4a4a]"
                                component="p"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="block" lastName="status">
                                Status:
                              </label>
                              <Select
                                options={userStatus}
                                isClearable
                                placeholder="User Status"
                                name="status"
                                className="w-full"
                                value={userStatus.find(
                                  (status) =>
                                    status.value === formik.values.status
                                )}
                                onChange={(e) =>
                                  formik.setFieldValue("status", e?.value)
                                }
                              />
                              <ErrorMessage
                                name="status"
                                className="text-[#ca4a4a]"
                                component="p"
                              />
                            </div>
                            <div className=" mb-3">
                              <label className="block" htmlFor="phoneNumber">
                                Phone Number:
                              </label>
                              <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={(e) =>
                                  handleOnchange(e, phoneNumberRegex, formik)
                                }
                                onBlur={(e) => handleOnBlur(e, formik)}
                                className="h-10 pl-2 border rounded w-full"
                                placeholder="Enter Phone Number"
                              />
                              <ErrorMessage
                                name="phoneNumber"
                                className="text-[#ca4a4a]"
                                component="p"
                              />
                            </div>
                            {!initialValues._id && (
                              <div className="mb-3 relative">
                                <label className="block" htmlFor="password">
                                  Password:
                                </label>
                                <input
                                  type={
                                    showPassword.password ? "text" : "password"
                                  }
                                  id="password"
                                  name="password"
                                  disabled={initialValues._id ? true : false}
                                  value={formik.values.password}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "password",
                                      e?.target.value
                                    );
                                  }}
                                  onBlur={(e) => handleOnBlur(e, formik)}
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
                                  {showPassword.password ? (
                                    <FaEye />
                                  ) : (
                                    <FaRegEyeSlash />
                                  )}
                                </button>
                                <ErrorMessage
                                  name="password"
                                  className="text-[#ca4a4a]"
                                  component="p"
                                />
                              </div>
                            )}
                            <div className="mt-4 flex justify-end">
                              <button
                                type="submit"
                                className=" border text-white bg-gray-500 hover:bg-gray-600 rounded-md py-2 px-4 mr-4"
                              >
                                {initialValues._id ? "Update" : "Add"}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowModel(false);
                                  setInitialValues(initialValues);
                                }}
                                className="text-white bg-gray-500 hover:bg-gray-600 rounded-md py-2 px-4"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </FormikProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
