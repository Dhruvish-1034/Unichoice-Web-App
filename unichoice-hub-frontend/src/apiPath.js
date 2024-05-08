const baseUrl = "http://localhost:4000";

let apiPath = {
  getAllStudent: baseUrl + "/user/getAllStudent",
  deleteStudent: baseUrl + "/user",
  addStudent: baseUrl + "/user/addstudent",
  updateData: baseUrl + "/user/updatestudent",
  updateUniversity: baseUrl + "/university/updateUniversity",
  universityInformation: baseUrl + "/universityadmission/",
};

export default apiPath;
