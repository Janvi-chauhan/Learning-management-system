import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Users,
  FileCheck2,
  MessageCircleQuestion,
} from "lucide-react";

import { motion } from "framer-motion";

// ================= ASSIGNMENTS DATA =================

const assignmentsData = [
  {
    id: 1,

    title: "React Dashboard UI",

    course:
      "Full Stack Development",

    dueDate: "25 Aug 2025",

    status: "Pending",

    progress: 65,

    submissions: 48,

    doubts: 12,
  },

  {
    id: 2,

    title: "Database Schema Design",

    course: "MongoDB",

    dueDate: "28 Aug 2025",

    status: "Submitted",

    progress: 100,

    submissions: 72,

    doubts: 5,
  },

  {
    id: 3,

    title: "Authentication System",

    course:
      "Backend Development",

    dueDate: "30 Aug 2025",

    status: "In Review",

    progress: 85,

    submissions: 56,

    doubts: 8,
  },

  {
    id: 4,

    title: "REST API Integration",

    course: "API Development",

    dueDate: "02 Sep 2025",

    status: "Pending",

    progress: 40,

    submissions: 35,

    doubts: 18,
  },
];

export default function Assignments({
  role = "student",
}) {
  // ================= STATS =================

  const studentStats = [
    {
      title: "Assignments",
      value: "24",

      icon: CalendarDays,

      bg: "bg-orange-100",
      text: "text-orange-600",
    },

    {
      title: "Pending",
      value: "05",

      icon: AlertCircle,

      bg: "bg-rose-100",
      text: "text-rose-600",
    },

    {
      title: "Completed",
      value: "18",

      icon: CheckCircle2,

      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },

    {
      title: "Upcoming",
      value: "03",

      icon: Clock3,

      bg: "bg-sky-100",
      text: "text-sky-600",
    },
  ];

  const teacherStats = [
    {
      title: "Assignments",
      value: "42",

      icon: BookOpen,

      bg: "bg-orange-100",
      text: "text-orange-600",
    },

    {
      title: "Submissions",
      value: "211",

      icon: FileCheck2,

      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },

    {
      title: "Questions",
      value: "36",

      icon:
        MessageCircleQuestion,

      bg: "bg-violet-100",
      text: "text-violet-600",
    },

    {
      title: "Students",
      value: "320",

      icon: Users,

      bg: "bg-sky-100",
      text: "text-sky-600",
    },
  ];

  const stats =
    role === "student"
      ? studentStats
      : teacherStats;

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
      {/* Container */}

      <div
        className="
          max-w-[1600px]
          mx-auto
        "
      >
        {/* ================= HEADER ================= */}

        <div className="mb-10">
          {/* Label */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2

              rounded-full

              bg-white/70
              backdrop-blur-xl

              border
              border-white/80
            "
          >
            <div
              className="
                w-2
                h-2

                rounded-full

                bg-orange-500
              "
            />

            <span
              className="
                text-sm
                font-medium

                text-slate-600
              "
            >
              {role === "student"
                ? "Assignment Workspace"
                : "Teacher Assignment Panel"}
            </span>
          </div>

          {/* Title */}

          <h1
            className="
              mt-5

              text-5xl
              font-bold
              tracking-tight

              text-slate-800
            "
          >
            {role === "student"
              ? "Assignments"
              : "Assignment Management"}
          </h1>

          {/* Subtitle */}

          <p
            className="
              mt-3

              max-w-2xl

              text-lg
              text-slate-500
            "
          >
            {role === "student"
              ? "Track assignment deadlines and submissions course-wise."
              : "Review submissions, answer doubts, and manage assignments for each course."}
          </p>
        </div>

        {/* ================= STATS ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

            gap-5
            mb-10
          "
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-[26px]

                  border
                  border-white/80

                  bg-white/75
                  backdrop-blur-2xl

                  shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                  p-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm
                        font-medium

                        text-slate-500
                      "
                    >
                      {item.title}
                    </p>

                    <h2
                      className="
                        mt-2

                        text-3xl
                        font-bold

                        text-slate-800
                      "
                    >
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`
                      w-14
                      h-14

                      rounded-2xl

                      flex
                      items-center
                      justify-center

                      ${item.bg}
                      ${item.text}
                    `}
                  >
                    <Icon size={24} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= ASSIGNMENT TABLE ================= */}

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
            duration: 0.35,
          }}
          className="
            overflow-hidden

            rounded-[30px]

            border
            border-white/80

            bg-white/75
            backdrop-blur-2xl

            shadow-[0_10px_35px_rgba(15,23,42,0.05)]
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between

              px-6
              py-5

              border-b
              border-slate-100
            "
          >
            <div>
              <h2
                className="
                  text-2xl
                  font-bold

                  text-slate-800
                "
              >
                Course Assignments
              </h2>

              <p
                className="
                  text-slate-500
                  mt-1
                "
              >
                Tailored assignments
                based on enrolled
                courses
              </p>
            </div>

            <button
              className="
                px-5
                py-2.5

                rounded-2xl

                bg-slate-900
                hover:bg-black

                text-white
                text-sm
                font-semibold

                transition-all
              "
            >
              {role === "student"
                ? "View Calendar"
                : "Create Assignment"}
            </button>
          </div>

          {/* TABLE HEADER */}

          <div
            className="
              hidden
              xl:grid

              grid-cols-8

              gap-4

              px-6
              py-4

              bg-slate-50/70

              border-b
              border-slate-100

              text-sm
              font-semibold

              text-slate-500
            "
          >
            <p>Assignment</p>

            <p>Course</p>

            <p>Due Date</p>

            <p>Status</p>

            <p>Progress</p>

            {role === "teacher" && (
              <>
                <p>Submissions</p>

                <p>Questions</p>
              </>
            )}

            <p>Action</p>
          </div>

          {/* ROWS */}

          <div className="divide-y divide-slate-100">
            {assignmentsData.map(
              (assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  whileHover={{
                    backgroundColor:
                      "rgba(248,250,252,0.7)",
                  }}
                  className={`
                    grid
                    ${
                      role ===
                      "teacher"
                        ? "xl:grid-cols-8"
                        : "xl:grid-cols-6"
                    }

                    grid-cols-1

                    gap-4

                    px-6
                    py-5

                    items-center

                    transition-all
                    duration-200
                  `}
                >
                  {/* Assignment */}

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-slate-800
                      "
                    >
                      {assignment.title}
                    </h3>
                  </div>

                  {/* Course */}

                  <div
                    className="
                      text-slate-500
                      font-medium
                    "
                  >
                    {assignment.course}
                  </div>

                  {/* Due Date */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-slate-500
                    "
                  >
                    <CalendarDays
                      size={16}
                    />

                    <span>
                      {
                        assignment.dueDate
                      }
                    </span>
                  </div>

                  {/* Status */}

                  <div>
                    <span
                      className={`
                        px-4
                        py-2

                        rounded-full

                        text-sm
                        font-semibold

                        ${
                          assignment.status ===
                          "Pending"
                            ? "bg-rose-100 text-rose-600"
                            : assignment.status ===
                              "Submitted"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-orange-100 text-orange-600"
                        }
                      `}
                    >
                      {assignment.status}
                    </span>
                  </div>

                  {/* Progress */}

                  <div>
                    <div
                      className="
                        w-full
                        h-2

                        rounded-full

                        bg-slate-100
                        overflow-hidden
                      "
                    >
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${assignment.progress}%`,
                        }}
                        transition={{
                          duration: 0.7,
                        }}
                        className="
                          h-full

                          rounded-full

                          bg-gradient-to-r
                          from-[#ff6b3d]
                          to-[#ffb347]
                        "
                      />
                    </div>

                    <p
                      className="
                        text-xs
                        mt-2

                        text-slate-500
                      "
                    >
                      {
                        assignment.progress
                      }
                      %
                    </p>
                  </div>

                  {/* Teacher Extra */}

                  {role ===
                    "teacher" && (
                    <>
                      {/* Submissions */}

                      <div
                        className="
                          text-slate-600
                          font-medium
                        "
                      >
                        {
                          assignment.submissions
                        }
                      </div>

                      {/* Questions */}

                      <div
                        className="
                          text-slate-600
                          font-medium
                        "
                      >
                        {assignment.doubts}
                      </div>
                    </>
                  )}

                  {/* Action */}

                  <div>
                    <button
                      className="
                        px-5
                        py-2.5

                        rounded-2xl

                        bg-slate-900
                        hover:bg-black

                        text-white
                        text-sm
                        font-medium

                        transition-all
                      "
                    >
                      {role ===
                      "student"
                        ? "Open"
                        : "Review"}
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}