import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import TeacherQueries from "./pages/TeacherQueries";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CoursesPage from "./components/courses/CoursesPage";
import CourseDetails from "./components/courses/CourseDetails";
import ResultsPage from "./pages/ResultsPage";
import AdminLayout from "./layout/AdminLayout";
import PremiumSignInPage from "./pages/SignIn";
import RegisterPage from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ContactUs from "./components/dashboards/admin/ContactUs";
import ContactQueries from "./components/dashboards/admin/ContactQueries";
import CourseLearning from "./components/dashboards/admin/student/Learning/CourseLearning";
import Certificate from "./components/dashboards/admin/student/Certificate";
import TeacherCourseLearning from "./components/dashboards/admin/teacher/TeacherLearning/TeacherCourseLearning";
import UploadRecordedVideo from "./components/dashboards/admin/teacher/TeacherLearning/UploadRecordVideo";
import EditCourse from "./components/dashboards/admin/teacher/TeacherLearning/EditCourse";
import Testimonials from "./components/dashboards/admin/Testimonials";
import Subscribe from "./components/dashboards/admin/Subscribe";

import FloatingButtons from "./components/FloatingButtons";
import ChatBot from "./components/ChatBot";
import ScrollToHash from "./components/ScrollToHash";

export default function App() {
  const location = useLocation();

  const [openChat, setOpenChat] = useState(false);

  // Show WhatsApp & ChatBot ONLY on Home page
  const showFloatingButtons = location.pathname === "/";

  return (
    <>
      <ScrollToHash />

      {/* Navbar */}
      {location.pathname !== "/adminDashboard" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/courses" element={<CoursesPage />} />

        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route path="/results" element={<ResultsPage />} />

        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/course/:courseId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CourseLearning />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate/:id"
          element={<Certificate />}
        />

        <Route
          path="/teacher/course/:courseId"
          element={<TeacherCourseLearning />}
        />

        <Route
          path="/teacher/course/:courseId/upload"
          element={<UploadRecordedVideo />}
        />

        <Route
          path="/teacher/course/:courseId/edit"
          element={<EditCourse />}
        />

        <Route
          path="/admin/testimonials"
          element={<Testimonials />}
        />

        <Route
          path="/contact-us"
          element={<ContactUs />}
        />

        <Route
          path="/login"
          element={<PremiumSignInPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/contacts"
          element={<ContactQueries />}
        />

        <Route
          path="/teacher/queries"
          element={
            <ProtectedRoute>
              <TeacherQueries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/subscribers"
          element={<Subscribe />}
        />
      </Routes>

      {/* Floating Buttons ONLY on Home Page */}
      {showFloatingButtons && (
        <>
          <FloatingButtons
            onChatClick={() => setOpenChat(true)}
          />

          {openChat && (
            <ChatBot
              onClose={() => setOpenChat(false)}
            />
          )}
        </>
      )}

      {/* Footer */}
      {location.pathname !== "/adminDashboard" && (
        <Footer />
      )}
    </>
  );
}