import { Routes, Route, useLocation } from "react-router-dom";

import TeacherQueries from "./pages/TeacherQueries";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CoursesPage from "./components/courses/CoursesPage";
import CourseDetails from "./components/courses/CourseDetails";
import ResultsPage from "./pages/ResultsPage";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./components/dashboards/admin/DashboardHome";
import AdminLayout from "./layout/AdminLayout";
import PremiumSignInPage from "./pages/SignIn";
import RegisterPage from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ContactUs from "../src/components/dashboards/admin/ContactUs";
import ContactQueries from "../src/components/dashboards/admin/ContactQueries";
import CourseLearning from "../src/components/dashboards/admin/student/Learning/CourseLearning";
import Certificate from "./components/dashboards/admin/student/Certificate";
import TeacherCourseLearning from "./components/dashboards/admin/teacher/TeacherLearning/TeacherCourseLearning";
import UploadRecordedVideo from "./components/dashboards/admin/teacher/TeacherLearning/UploadRecordVideo";
import EditCourse from "./components/dashboards/admin/teacher/TeacherLearning/EditCourse";
//import LiveMeeting from "./components/dashboards/admin/student/Learning/LiveMeeting";
//import LessonNavigation from "./components/dashboards/admin/student/Learning/LessonNavigation";
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

element={<Certificate/>}

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

{/* <Route
    path="/live/:roomName"
    element={<LiveMeeting />}
/> */}
        {/* <Route path="/adminDashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute> } /> */}
        <Route path="/contact-us" element={<ContactUs />}/>
        <Route path="/login" element={<PremiumSignInPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
        
        <Route path="/admin/contacts" element={<ContactQueries />}/>
        <Route path="/teacher/queries" element={<ProtectedRoute> <TeacherQueries /></ProtectedRoute>}/>
        {/* <Route path="/dashboard" element={<DashboardPage />} />
 */}




       </Routes>
  {location.pathname !== "/adminDashboard" && (
    <Footer />
  )}
      
    </>
  );
}
