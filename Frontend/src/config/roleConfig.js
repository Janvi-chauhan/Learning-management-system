import DashboardHome from "../components/dashboards/user/components/DashboardHome";
import Courses from "../components/dashboards/user/components/Courses";
import Assignments from "../components/dashboards/user/components/Assignments";
import Projects from "../components/dashboards/user/components/Projects";
import Fees from "../components/dashboards/user/components/Fees";
import Profile from "../components/dashboards/user/components/Profile";

import AdminDashboard from "../components/dashboards/admin/DashboardHome";
import StudentManager from "../components/dashboards/admin/student/StudentManager";
import TeacherManager from "../components/dashboards/admin/teacher/TeacherManager";
import CourseManager from "../components/dashboards/admin/CourseManager";
import PaymentsManager from "../components/dashboards/admin/PaymentsManager";
import Placements from "../components/dashboards/admin/Placements";
import ContactUs from "../components/dashboards/admin/ContactUs";
import ContactQueries from "../components/dashboards/admin/ContactQueries";




export const roleConfig = {
  
  // ================= STUDENT =================

  student: {
    sidebarItems: [
      "dashboard",
      "courses",
      "assignments",
      "projects",
      "payments",
      "profile",
      
    ],

    componentMap: {
      dashboard: DashboardHome,

      assignments: Assignments,

      courses: Courses,

      projects: Projects,

      profile: Profile,

      payments: Fees,
    },
  },

  // ================= TEACHER =================

  teacher: {
    sidebarItems: [
      "dashboard",
      "courses",
      "assignments",
      "projects",
      "profile",
    ],

    componentMap: {
      dashboard: DashboardHome,

      assignments: Assignments,

      courses: Courses,

      projects: Projects,

      profile: Profile,
    },
  },

  // ADMIN //

  admin: {
  sidebarItems: [
    "dashboard",
    "students",
    "teachers",
    "courses",
    "payments",
    "placements",
    "contactUs",
  ],

  componentMap: {
    dashboard: AdminDashboard,
    students: StudentManager,
    teachers: TeacherManager,
    courses: CourseManager,
    payments: PaymentsManager,
    placements: Placements,
    contactUs: ContactUs,

  },
},
};