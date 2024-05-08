import React from "react";

const Modal = ({ viewStudentData, showViewModal, setShowViewModel }) => {
  return (
    <div>
      {showViewModal &&
        viewStudentData?.map((element) => (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div
                className="fixed inset-0 transition-opacity"
                onClick={() => setShowViewModel(!showViewModal)}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="p-4">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Student Details</h3>
                    <div className="text-gray-600">
                      <p className="py-2">
                        <span className="font-bold py-4">Id:</span>
                        {element?._id}
                      </p>
                      <p className="py-2">
                        <span className="font-bold py-4">Full Name:</span>
                        {element?.firstName + " " + element?.lastName}
                      </p>
                      <p className="py-2">
                        <span className="font-bold py-4">Email:</span>
                        {element?.email}
                      </p>
                      <p className="py-2">
                        <span className="font-bold py-4">Role:</span>
                        {element?.role}
                      </p>
                      <p className="py-2">
                        <span className="font-bold py-4">Phone Number:</span>
                        {element?.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setShowViewModel(!showViewModal)}
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
    </div>
  );
};

export default Modal;
