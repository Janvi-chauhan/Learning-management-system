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
  // ================= ROLE CONFIG =================

  const dashboardConfig = {
    // ================= STUDENT =================

    student: {
      title: "Student Dashboard",

      subtitle:
        "Track your learning progress and activities.",

      cards: [
        {
          title: "Enrolled Courses",
          value: "08",
          icon: BookOpen,

          gradient:
            "from-[#ff4a3d] to-[#ffb347]",
        },

        {
          title: "Assignments",
          value: "12",
          icon: ClipboardList,

          gradient:
            "from-[#ff8c42] to-[#ffb347]",
        },

        {
          title: "Attendance",
          value: "92%",
          icon: CalendarCheck,

          gradient:
            "from-[#ff7a59] to-[#ffb347]",
        },

        {
          title: "Pending Fees",
          value: "₹12K",
          icon: IndianRupee,

          gradient:
            "from-[#ff5e62] to-[#ff9966]",
        },
      ],
    },

    // ================= TEACHER =================

    teacher: {
      title: "Teacher Dashboard",

      subtitle:
        "Manage students, classes, and analytics.",

      cards: [
        {
          title: "Active Courses",
          value: "05",
          icon: BookOpen,

          gradient:
            "from-[#ff4a3d] to-[#ffb347]",
        },

        {
          title: "Assignments",
          value: "18",
          icon: ClipboardList,

          gradient:
            "from-[#ff8c42] to-[#ffb347]",
        },

        {
          title: "Students",
          value: "320",
          icon: Users,

          gradient:
            "from-[#ff7a59] to-[#ffb347]",
        },

        {
          title: "Performance",
          value: "+18%",
          icon: TrendingUp,

          gradient:
            "from-[#ff5e62] to-[#ff9966]",
        },
      ],
    },
  };

  // ================= ACTIVE CONFIG =================

  const config =
    dashboardConfig[role] ||
    dashboardConfig.student;

  return (
    <div
      className="
        min-h-screen
        w-full

        bg-gradient-to-br
        from-[#f8fafc]
        via-[#f9fafb]
        to-[#eef2ff]

        px-6
        py-7
      "
    >
      {/* MAIN CONTAINER */}

      <div
        className="
          max-w-[1600px]
          mx-auto
        "
      >
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
          {/* Tiny Label */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2
              mb-4

              rounded-full

              bg-white/70
              backdrop-blur-xl

              border
              border-white/80

              shadow-sm
            "
          >
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-[#ff4a3d]
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-slate-600
                capitalize
              "
            >
              {role} Workspace
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              text-5xl
              font-bold
              tracking-tight
              text-slate-800
            "
          >
            {config.title}
          </h1>

          {/* Subtitle */}

          <p
            className="
              text-slate-500
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
          <DashboardCards
            cards={config.cards}
          />
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