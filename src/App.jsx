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


export default function App() {
  return (
    <>
      {window.location.pathname !== "/adminDashboard" && (
  <Navbar />
)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/adminDashboard" element={<Dashboard/>} />
        <Route path="/teacherDashboard" element={<TeacherDashboard/>}/>
        <Route path="/studentDashboard" element={<StudentDashboard/>}/>
       
        
        




      </Routes>

      <Footer />
    </>
  );
}
