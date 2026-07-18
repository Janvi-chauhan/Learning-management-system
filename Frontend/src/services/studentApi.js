import api from "./api";

export const getDashboardStats = () =>
  api.get("/student/dashboard");

export const getStudentCourses = () =>
  api.get("/student/courses");

export const getAssignments = () =>
  api.get("/student/assignments");

export const getProjects = () =>
  api.get("/student/projects");

export const getPayments = () =>
  api.get("/student/payments");

export const getProfile = () =>
  api.get("/student/profile");

// export const getAssignmentSubmission = () =>
//   api.post("/student/assignment-submissions");