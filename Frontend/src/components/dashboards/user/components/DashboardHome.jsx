import { useEffect, useState } from "react";

import DashboardCards from "./DashboardCard";
import DashboardCharts from "./DashboardCharts";
import ActivityPanel from "./ActivityPanel";

import api from "../../../../services/api";
import {
  BookOpen,
  ClipboardList,
  CalendarCheck,
  Users,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

import { motion } from "framer-motion";

export default function DashboardHome({
  role = "student",
}) {

  const [stats, setStats] = useState({
    // Student
  totalCourses: 0,

  completedAssignments: 0,

  totalProjects: 0,

  totalPayments: 0,

  // Teacher

  totalAssignments: 0,

  totalStudents: 0,

  performance: 0,
});

  const fetchDashboardStats = async () => {
  try {
    const response = await api.get(
      "/student/dashboard"
    );
    const courseResponse = await api.get("/student/courses/stats");

    console.log(
      "Dashboard Stats:",
      response.data
    );
    console.log("Course Stats:", courseResponse.data);

    setStats({...response.data.data,
      totalCourses: courseResponse.data.data.enrolled,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchTeacherDashboardStats =
  async () => {
    try {
      const response =
        await api.get(
          "/teacher/dashboard"
        );

      setStats(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  if (role === "student") {
    fetchDashboardStats();
  }

  if (role === "teacher") {
    fetchTeacherDashboardStats();
  }
}, [role]);

  const dashboardConfig = {
    student: {
      title: "Student Dashboard",

      subtitle:
        "Track your learning progress and activities.",

      cards: [
{
  title: "Enrolled Courses",
  value: stats.totalCourses,
  progress: stats.courseProgress,
  icon: BookOpen,
  color: "#FF0000",
},

{
  title: "Assignments",
  value: stats.completedAssignments,
  progress: stats.assignmentProgress,
  icon: ClipboardList,
  color: "#000000",
},

{
  title: "Projects",
  value: stats.totalProjects,
  progress: stats.projectProgress,
  icon: CalendarCheck,
  color: "#FF0000",
},

{
  title: "Payments",
  value: `₹${stats.totalPayments}`,
  progress: stats.paymentProgress,
  icon: IndianRupee,
  color: "#000000",
},
]
},

    teacher: {
  title: "Teacher Dashboard",

  subtitle:
    "Manage students, classes, and analytics.",

  cards: [
{
  title: "Active Courses",
  value: stats.totalCourses,
  progress: stats.courseProgress,
  icon: BookOpen,
  color: "#FF0000",
},

{
  title: "Assignments",
  value: stats.totalAssignments,
  progress: stats.assignmentProgress,
  icon: ClipboardList,
  color: "#000000",
},

{
  title: "Students",
  value: stats.totalStudents,
  progress: stats.studentProgress,
  icon: Users,
  color: "#FF0000",
},

{
  title: "Performance",
  value: `${stats.performance}%`,
  progress: stats.performanceProgress,
  icon: TrendingUp,
  color: "#000000",
},
]
},
};

  const config =
    dashboardConfig[role] ||
    dashboardConfig.student;

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-white
        px-6
        py-7
      "
    >
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-8"
        >
          {/* WORKSPACE TAG */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              mb-4
              rounded-full
              bg-white
              border-2
              border-red-600
              shadow-sm
            "
          >
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-red-600
              "
            />

            <span
              className="
                text-sm
                font-semibold
                text-black
                capitalize
              "
            >
              {role} Workspace
            </span>
          </div>

          {/* HEADING */}

          <h1
            className="
              text-5xl
              font-bold
              tracking-tight
              text-black
            "
          >
            {config.title}
          </h1>

          {/* SUBTITLE */}

          <p
            className="
              text-black/70
              mt-3
              text-lg
              max-w-2xl
            "
          >
            {config.subtitle}
          </p>
        </motion.div>

        {/* DASHBOARD CARDS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.5,
          }}
          className="mb-8"
        >
          <DashboardCards cards={config.cards} />
        </motion.div>

        {/* CHARTS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
          className="mb-8"
        >
          <DashboardCharts
            role={role}
            stats={stats}
          />
        </motion.div>

        {/* ACTIVITY PANEL */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
        >
          <ActivityPanel role={role} />
        </motion.div>
      </div>
    </div>
  );
}