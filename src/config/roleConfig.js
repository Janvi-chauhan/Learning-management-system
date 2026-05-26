import DashboardHome from "../components/dashboards/user/components/DashboardHome";
import Courses from "../components/dashboards/user/components/Courses";
import Assignments from "../components/dashboards/user/components/Assignments";
import Projects from "../components/dashboards/user/components/Projects";
import Fees from "../components/dashboards/user/components/Fees";
import Profile from "../components/dashboards/user/components/Profile";

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
};