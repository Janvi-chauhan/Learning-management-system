import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CoursesPage from "./components/courses/CoursesPage";
import CourseDetails from "./components/courses/CourseDetails";
import ResultsPage from "./pages/ResultsPage";
import Dashboard from "./dashboards/adminDashboard";
import TeacherDashboard from "./dashboards/teacherDashboard";
import StudentDashboard from "./dashboards/studentDashboard";
import ManageTeachers from "./components/dashboards/admin/TeacherManager";
import ManageStudents from "./components/dashboards/admin/StudentManager";
import ManagePayments from "./components/dashboards/admin/PaymentsManager";
import ManageCourses from "./components/dashboards/admin/CourseManager";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/adminDashboard" element={<Dashboard/>} />
        <Route path="/teacherDashboard" element={<TeacherDashboard/>}/>
        <Route path="/studentDashboard" element={<StudentDashboard/>}/>
        <Route path="/adminDashboard/teachers" element={<ManageTeachers/>}/>
        <Route path="/adminDashboard/students" element={<ManageStudents/>}/>
        <Route path="/adminDashboard/payments" element={<ManagePayments/>}/>
        <Route path="/adminDashboard/courses" element={<ManageCourses/>}/>




      </Routes>

      <Footer />
    </>
  );
}
