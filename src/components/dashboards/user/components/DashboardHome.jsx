import DashboardCards from "./DashboardCard";
import DashboardCharts from "./DashboardCharts";
import ActivityPanel from "./ActivityPanel";

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
  const dashboardConfig = {
    student: {
      title: "Student Dashboard",

      subtitle:
        "Track your learning progress and activities.",

      cards: [
        {
          title: "Enrolled Courses",
          value: "08",
          icon: BookOpen,
          color: "#FF0000",
        },

        {
          title: "Assignments",
          value: "12",
          icon: ClipboardList,
          color: "#000000",
        },

        {
          title: "Attendance",
          value: "92%",
          icon: CalendarCheck,
          color: "#FF0000",
        },

        {
          title: "Pending Fees",
          value: "₹12K",
          icon: IndianRupee,
          color: "#000000",
        },
      ],
    },

    teacher: {
      title: "Teacher Dashboard",

      subtitle:
        "Manage students, classes, and analytics.",

      cards: [
        {
          title: "Active Courses",
          value: "05",
          icon: BookOpen,
          color: "#FF0000",
        },

        {
          title: "Assignments",
          value: "18",
          icon: ClipboardList,
          color: "#000000",
        },

        {
          title: "Students",
          value: "320",
          icon: Users,
          color: "#FF0000",
        },

        {
          title: "Performance",
          value: "+18%",
          icon: TrendingUp,
          color: "#000000",
        },
      ],
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
          <DashboardCharts role={role} />
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