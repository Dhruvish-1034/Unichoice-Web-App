import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdChangeCircle, MdPersonRemoveAlt1 } from "react-icons/md";
import { toast } from "react-toastify";
import Select from "react-select";
import Swal from "sweetalert2";

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStudentDetails, setStudentDetails] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:4000/admin/studentlist/?page=${page}&limit=${limit}`
      );
      if (response?.data?.code === 200) {
        setStudentData(response.data);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await Axios.delete(
          `http://localhost:4000/admin/deletestudent/${id}`
        );
        if (response?.data?.code === 200) {
          fetchData();
          toast.success(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewData = async (id) => {
    try {
      const response = await Axios.get(
        `http://localhost:4000/admin/viewstudent/${id}`
      );
      if (response) {
        console.log(response);
        setStudentDetails([response?.data?.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const userStatus = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  useEffect(() => {
    fetchData();
  }, [pagination]);

  return (
    <div className="fixed  h-[100vh] lg:w-auto xl:w-[80%] overflow-y-auto">
      <div className="flex md:flex-row justify-end mr-2 mb-3.5">
        <div>
          <button
            type="submit"
            className="border ml-2 px-2  py-1 text-white bg-zinc-700"
          >
            Add University
          </button>
        </div>
      </div>
      <div className="flex justify-end mb-4 mr-2">
        <Select
          options={userStatus}
          placeholder="Filter by status"
          className="w-64 mr-4"
        />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search"
          className="border col-span-1 w-60 rounded h-10 pl-2 "
        />
      </div>
      <table className="border-collapse w-[100%]">
        <thead>
          <tr>
            <th className="border border-gray-400 py-2 text-center">ID</th>
            <th className="border border-gray-400 py-2 text-center">Name</th>
            <th className="border border-gray-400 py-2 text-center">Email</th>
            <th className="border border-gray-400 py-2 text-center">Role</th>
            <th className="border border-gray-400 py-2 text-center">Status</th>
            <th className="border border-gray-400 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentData?.data?.length > 0 &&
            studentData?.data?.map((element) => (
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  {element._id}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {element.fullName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {element.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {element.role}
                </td>
                <td className="border border-gray-400 px-4 py-2">Active</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <button
                    type="button"
                    className="font-bold py-2 px-4 rounded mr-2"
                    onClick={() => {
                      setShowModal((value) => !value);
                      viewData(element._id);
                    }}
                  >
                    <FaEye className="text-[19px]" />
                  </button>
                  <button type="button" className="font-bold py-2 px-4 rounded">
                    <MdChangeCircle className="text-[19px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteData(element._id)}
                    className="font-bold py-2 px-4 rounded mr-2"
                  >
                    <MdPersonRemoveAlt1 className="text-[19px]" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showModal &&
        viewStudentDetails?.map((element) => (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div
                className="fixed inset-0 transition-opacity"
                onClick={handleClose}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="p-4">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Student Details</h3>
                    <div className="text-gray-600">
                      <p>
                        <span className="font-bold py-4">Id:</span>
                        {element._id}
                      </p>
                      <p>
                        <span className="font-bold py-4">Name:</span>
                        {element.fullName}
                      </p>
                      <p>
                        <span className="font-bold py-4">Email:</span>
                        {element.email}
                      </p>
                      <p>
                        <span className="font-bold py-4">Role:</span>
                        {element.role}
                      </p>
                      <p>
                        <span className="font-bold py-4">Phone Number:</span>
                        {element.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleClose}
                      className="text-white bg-gray-500 hover:bg-gray-600 rounded-md px-4 py-2 mr-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div></div>
    </div>
  );
};

export default StudentList;
