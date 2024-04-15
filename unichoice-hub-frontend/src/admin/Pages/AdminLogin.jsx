import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { FormikProvider } from "formik";
import { toast } from "react-toastify";
import { parseCookies, setCookie } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { CiMap } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Loading from "../../components/Basic/Loader";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required!"),
  password: Yup.string().required("Password is Required!"),
});

const initialVal = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  const cookies = parseCookies();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await Axios.post(
        "http://localhost:4000/admin/login",
        values
      );
      if (response && response?.status === 200) {
        if (response?.data?.code === 200) {
          console.log(response);
          setCookie(null, "admin", response.data.data, {});
          console.log({ cookies });
          toast.success(response?.data?.message);
          setTimeout(() => navigate("/admin/dashboard"), 2000);
        } else if (response?.data?.code === 401) {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: initialVal,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <FormikProvider value={formik}>
        <div className="flex h-screen">
          {/* left section */}
          <div className="hidden w-6/12 lg:flex justify-center text-gray-300 items-center bg-slate-700">
            <div>
              <p className="text-[24px]">Discover top ranked universities!</p>
              <div className="flex my-6">
                <FaGlobeAmericas className="text-[42px] my-1 mr-4 text-black" />
                <div>
                  <p className="font-bold">
                    9000+
                    <span className="block leading-4 font-normal">
                      University
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex my-6">
                <GiSpellBook className="text-[42px] my-1 mr-4 text-black" />
                <div>
                  <p className="font-bold">
                    144567
                    <span className="block leading-4 font-normal">
                      Programs
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex my-6">
                <SlCalender className="text-[42px] my-1 mr-4 text-black" />
                <div>
                  <p className="font-bold">
                    150+
                    <span className="block leading-4 font-normal">
                      Events every year
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex my-6">
                <CiMap className="text-[42px] my-1 mr-4 text-black" />
                <div>
                  <p className="font-bold">
                    9000+
                    <span className="block leading-4 font-normal">Country</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* rigt Section */}
          <div className="w-full lg:w-6/12 flex justify-center items-center">
            <div className="md:w-80 sm:w-80 w-80">
              <div className="flex">
                <img src="/" alt="img"></img>
                <h1 className="text-[26px] font-bold">
                  <Link to="/">UniChoice Hub</Link>
                </h1>
              </div>
              <h1 className="text-[26px] mt-4 text-[#344054] bold">
                Admin Login
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="block mt-3 mb-1" htmlFor="email">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    className="h-10 pl-2 border rounded w-full"
                    placeholder="Enter Email"
                  />
                  <ErrorMessage
                    name="email"
                    className="text-[#ca4a4a]"
                    component="p"
                  />
                </div>
                <div className="mb-3 relative">
                  <label className="block mb-1" htmlFor="password">
                    Password:
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    className="h-10 pl-2 border rounded w-full"
                    placeholder="Enter Password"
                  />
                  <button
                    type="button"
                    className="absolute top-10 right-3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                  </button>
                  <ErrorMessage
                    name="password"
                    className="text-[#ca4a4a]"
                    component="p"
                  />
                </div>
                {/* <div className="flex justify-between">
                    <Link to="/auth/signup">Signup</Link>
                    <Link>Forgot password?</Link>
                  </div> */}
                <button
                  type="submit"
                  className="w-full border mt-6 bg-[#005C69] text-white p-1"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </FormikProvider>
    </div>
  );
};

export default AdminLogin;
