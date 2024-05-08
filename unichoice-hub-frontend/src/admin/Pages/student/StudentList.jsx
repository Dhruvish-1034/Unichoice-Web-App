import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdChangeCircle, MdPersonRemoveAlt1 } from "react-icons/md";
import Modal from "../../components/Basic/Modal";
import AddStudent from "./AddStudent";

const StudentList = ({
  viewStudentData,
  studentList,
  deleteData,
  setInitialValues,
  initialValues,
  viewData,
  setShowModel,
  showModel,
}) => {
  const [showViewModal, setShowViewModel] = useState(false);
  return (
    <>
      <div className="lg:w-auto xl:w-full">
        <table className="border-collapse w-[100%]">
          <thead>
            <tr>
              <th className="border border-gray-400 py-2 text-center">Name</th>
              <th className="border border-gray-400 py-2 text-center">Email</th>
              <th className="border border-gray-400 py-2 text-center">
                Status
              </th>
              <th className="border border-gray-400 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          {studentList?.data?.length > 0 &&
            studentList?.data.map((element) => (
              <tbody className="text-center">
                <tr>
                  <td className="border border-gray-400 px-4 py-2">
                    {element?.firstName + " " + element?.lastName}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {element?.email}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {element?.status}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <button
                      type="button"
                      className="font-bold py-2 px-4 rounded mr-2"
                      onClick={() => {
                        viewData(element._id);
                        setShowViewModel(true);
                      }}
                    >
                      <FaEye className="text-[19px]" />
                    </button>
                    <button
                      type="button"
                      className="font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setInitialValues(element);
                        setShowModel(!showModel);
                      }}
                    >
                      <MdChangeCircle className="text-[19px]" />
                    </button>
                    <button
                      type="button"
                      className="font-bold py-2 px-4 rounded mr-2"
                      onClick={() => {
                        deleteData(element._id);
                      }}
                    >
                      <MdPersonRemoveAlt1 className="text-[19px]" />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
        <Modal
          viewStudentData={viewStudentData}
          showViewModal={showViewModal}
          setShowViewModel={setShowViewModel}
        />
      </div>
      {showModel && <AddStudent />}
    </>
  );
};

export default StudentList;
