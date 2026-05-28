import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CoursesPage from "./components/courses/CoursesPage";
import CourseDetails from "./components/courses/CourseDetails";
import ResultsPage from "./pages/ResultsPage";
import DashboardLayout from "./layout/DasboardLayout";
import DashboardHome from "./components/dashboards/admin/DashboardHome";
import AdminLayout from "./layout/AdminLayout";

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
        <Route path="/dashboard" element={<DashboardLayout/>} />
        <Route path="/adminDashboard" element={<AdminLayout/>} />
       
        
        




      </Routes>

      <Footer />
    </>
  );
}
