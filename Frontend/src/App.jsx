import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CoursesPage from "./components/courses/CoursesPage";
import CourseDetails from "./components/courses/CourseDetails";
import ResultsPage from "./pages/ResultsPage";
import DashboardLayout from "./layout/DasboardLayout";
import DashboardHome from "./components/dashboards/admin/DashboardHome";
import AdminLayout from "./layout/AdminLayout";
import PremiumSignInPage from "./pages/SignIn";
import RegisterPage from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/adminDashboard" && (
  <Navbar />
)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/dashboard" element={ <ProtectedRoute> 
          <DashboardLayout/> 
          </ProtectedRoute>} />
        <Route path="/adminDashboard" element={<ProtectedRoute>
          <AdminLayout/>
          </ProtectedRoute> } />
        <Route path="/login" element={<PremiumSignInPage/>} />
        <Route path="/register" element={<RegisterPage/>} />



       
        
        




      </Routes>
  {location.pathname !== "/adminDashboard" && (
    <Footer />
  )}
      
    </>
  );
}
