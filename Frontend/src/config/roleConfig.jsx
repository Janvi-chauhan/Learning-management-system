import {
  BookOpen,
  ClipboardList,
  Users,
  Calendar,
  IndianRupee,
} from "lucide-react";
import DashboardHome from "../components/dashboards/user/components/DashboardHome";
import Courses from "../components/dashboards/user/components/DashboardHome";
import Assignments from "../components/dashboards/user/components/Assignments";
import Projects from "../components/dashboards/user/components/Projects";
import Fees from "../components/dashboards/user/components/Fees";
import Profile from "../components/dashboards/user/components/Profile";

export const roleConfig = {
  student: {
  sidebar: [
    "dashboard",
    "courses",
    "assignments",
    "projects",
    "payments",
    "profile",
  ],

  componentMap: {
    dashboard: DashboardHome,
    courses: Courses,
    assignments: Assignments,
    projects: Projects,
    payments: Fees,
    profile: Profile,
  },
},

teacher: {
  sidebar: [
    "dashboard",
    "courses",
    "assignments",
    "projects",
    "profile",
  ],

  componentMap: {
    dashboard: DashboardHome,
    courses: Courses,
    assignments: Assignments,
    projects: Projects,
    profile: Profile,
  },
},

}