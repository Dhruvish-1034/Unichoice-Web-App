import React, { useEffect, useState } from "react";
import Axios from "axios";
import StudentList from "./StudentList";
import Select from "react-select";
import Swal from "sweetalert2";
import Loader from "../../../components/Basic/Loader";
import { toast } from "react-toastify";
import apiPath from "../../../apiPath";
import AddStudent from "./AddStudent";
import ReactPaginate from "react-paginate";
import { useImmer } from "use-immer";
import useDebounce from "../../../hooks/DebouncehHook";
import NoRecordFound from "../../components/Basic/NoRecordFound";

const initialVal = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  status: "",
  role: "Student",
};

const userStatus = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const limitOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const Student = () => {
  const [initialValues, setInitialValues] = useState(initialVal);
  const [studentData, setStudentData] = useState([]);
  const [viewStudentData, setViewStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModel] = useState(false);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [filterData, setFilterData] = useImmer({
    pageCount: 1,
    page: 1,
    limit: 10,
    totalData: 5,
    status: "",
    searchtext: "",
  });

  const debouceValue = useDebounce(filterData.searchtext, 2000);

  const fetchData = async (search) => {
    try {
      const response = await Axios.get(
        `${apiPath.getAllStudent}?page=${filterData.page}&limit=${filterData.limit}&search=${search}&status=${filterData.status}`
      );
      if (response?.data?.code === 200) {
        console.log(response?.data.data);
        setStudentData(response?.data);
        setFilterData((draft) => {
          draft.pageCount = response?.data?.pageCount;
        });
        showRecord(response.data.data);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
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
        setIsLoading(true);
        const response = await Axios.delete(`${apiPath.deleteStudent}/${id}`);
        if (response?.data?.code === 200) {
          setTimeout(() => {
            fetchData();
            toast.success(response?.data?.message);
            setIsLoading(false);
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (id) => {
    const userId = { id };
    studentData.data.forEach(function (element) {
      if (element._id === userId.id) {
        setViewStudentData([element]);
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (values) {
        const method = values._id ? Axios.put : Axios.post;
        const path = values._id ? apiPath.updateData : apiPath.addStudent;
        const response = await method(`${path}`, values);
        if (response && response?.status === 200) {
          if (response?.data?.code === 200) {
            toast.success(response?.data?.message);
            setInitialValues(initialVal);
            setShowModel(false);
            fetchData();
          } else if (response?.data?.code === 400) {
            toast.error(response?.data?.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setFilterData((draft) => {
      draft.page = selected + 1;
    });
  };

  const handleDataLimit = (selectedValue) => {
    setIsLoading(true);
    if (selectedValue) {
      setTimeout(() => {
        setFilterData((draft) => {
          draft.limit = selectedValue.value;
          draft.page = 1;
        });
        setIsLoading(false);
      }, 2000);
    } else {
      setFilterData((draft) => {
        draft.limit = 10;
      });
      setIsLoading(false);
    }
  };

  const handleUserStatus = (selectedValue) => {
    setIsLoading(true);
    if (selectedValue) {
      setTimeout(() => {
        setFilterData((draft) => {
          draft.status = selectedValue.value;
          draft.page = 1;
        });
        setIsLoading(false);
      }, 2000);
    } else {
      setFilterData((draft) => {
        draft.status = "";
      });
      setIsLoading(false);
    }
  };

  const showRecord = (data) => {
    data.length === 0 ? setNoRecordFound(true) : setNoRecordFound(false);
  };

  useEffect(() => {
    fetchData(debouceValue);
  }, [filterData, filterData.status, debouceValue]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <div className="lg:w-full xl:w-full pt-[42px]">
        <div className="flex md:flex-row justify-end mr-2 mb-3.5">
          <div>
            <button
              type="button"
              className="border ml-2 px-2  py-1 text-white bg-zinc-700"
              onClick={() => {
                setShowModel(true);
                setInitialValues(initialVal);
              }}
            >
              Add Student
            </button>
          </div>
        </div>
        <div className="flex justify-end mb-4 mr-2">
          <Select
            options={userStatus}
            isClearable
            placeholder="Filter by status"
            name="status"
            className="w-64 mr-4"
            onChange={handleUserStatus}
          />
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                name="search"
                className="block w-64 p-2 ps-4 text-sm text-black border border-gray-300 rounded"
                placeholder="Search"
                onChange={(e) =>
                  setFilterData((draft) => {
                    draft.searchtext = e.target.value;
                    draft.page = 1;
                  })
                }
              />
            </div>
          </form>
          <div>
            <Select
              options={limitOptions}
              className="w-42 ml-4"
              placeholder="Filter Data Limit"
              isClearable
              onChange={handleDataLimit}
            />
          </div>
        </div>
        <StudentList
          studentList={studentData}
          deleteData={handleDelete}
          viewData={handleView}
          viewStudentData={viewStudentData}
          setInitialValues={setInitialValues}
          initialValues={initialValues}
          setShowModel={setShowModel}
          showModal={showModal}
        />
        <AddStudent
          initialValues={initialValues}
          showModal={showModal}
          setShowModel={setShowModel}
          handleSubmit={handleSubmit}
          userStatus={userStatus}
          setInitialValues={setInitialValues}
        />
        {noRecordFound ? <NoRecordFound /> : ""}
        <ReactPaginate
          className="flex justify-end mr-64 gap-4 my-2.5"
          breakLabel="..."
          pageCount={filterData.pageCount}
          renderOnZeroPageCount={""}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default Student;
