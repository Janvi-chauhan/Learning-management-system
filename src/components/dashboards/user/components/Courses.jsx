import {
  BookOpen,
  Clock3,
  Users,
  Sparkles,
  GraduationCap,
  Video,
  ClipboardCheck,
  MessageCircleMore,
  CalendarDays,
} from "lucide-react";

import { motion } from "framer-motion";

// ================= STUDENT COURSES =================

const enrolledCourses = [
  {
    id: 1,
    title: "Full Stack Development",
    instructor: "Rahul Sharma",
    duration: "6 Months",
    students: 120,
    progress: 75,

    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },

  {
    id: 2,
    title: "Data Analysis with AI",
    instructor: "Priya Verma",
    duration: "4 Months",
    students: 80,
    progress: 45,

    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },

  {
    id: 3,
    title: "Java Backend Development",
    instructor: "Aman Gupta",
    duration: "5 Months",
    students: 95,
    progress: 90,

    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },

  {
    id: 4,
    title: "Cloud Computing",
    instructor: "Neha Patil",
    duration: "3 Months",
    students: 110,
    progress: 62,

    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  },
];

// ================= COURSE CARD =================

function CourseCard({
  course,
  role,
  showProgress = false,
  buttonText,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        relative
        overflow-hidden

        rounded-[28px]

        border
        border-white/80

        bg-white/75
        backdrop-blur-2xl

        shadow-[0_10px_35px_rgba(15,23,42,0.05)]

        group
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative
          h-40
          overflow-hidden
        "
      >
        <img
          src={course.image}
          alt={course.title}
          className="
            w-full
            h-full
            object-cover

            transition-all
            duration-500

            group-hover:scale-105
          "
        />

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/40
            to-transparent
          "
        />

        {/* Duration */}

        <div
          className="
            absolute
            top-3
            right-3

            px-3
            py-1

            rounded-full

            bg-white/85
            backdrop-blur-xl

            text-xs
            font-semibold

            text-slate-700
          "
        >
          {course.duration}
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-4">
        {/* TITLE */}

        <h2
          className="
            text-[18px]
            font-bold
            leading-tight

            text-slate-800
          "
        >
          {course.title}
        </h2>

        {/* META */}

        <div
          className="
            flex
            items-center
            flex-wrap
            gap-3

            mt-4
          "
        >
          {/* Instructor */}

          <div
            className="
              flex
              items-center
              gap-2

              text-slate-500
              text-sm
            "
          >
            <GraduationCap
              size={16}
            />

            <span>
              {course.instructor}
            </span>
          </div>

          {/* Students */}

          <div
            className="
              flex
              items-center
              gap-2

              text-slate-500
              text-sm
            "
          >
            <Users size={16} />

            <span>
              {course.students}
            </span>
          </div>

          {/* Duration */}

          <div
            className="
              flex
              items-center
              gap-2

              text-slate-500
              text-sm
            "
          >
            <Clock3 size={16} />

            <span>
              {course.duration}
            </span>
          </div>
        </div>

        {/* Progress */}

        {showProgress && (
          <div className="mt-5">
            <div
              className="
                flex
                items-center
                justify-between

                mb-2
              "
            >
              <span
                className="
                  text-sm
                  text-slate-500
                "
              >
                Progress
              </span>

              <span
                className="
                  text-sm
                  font-semibold

                  text-orange-600
                "
              >
                {course.progress}%
              </span>
            </div>

            {/* Progress Bar */}

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
                  width: `${course.progress}%`,
                }}
                transition={{
                  duration: 0.8,
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
          </div>
        )}

        {/* BUTTON */}

        <motion.button
          whileHover={{
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            w-full
            mt-5

            py-2.5

            rounded-2xl

            bg-slate-900
            hover:bg-black

            text-white
            text-sm
            font-semibold

            transition-all
            duration-200
          "
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ================= MAIN PAGE =================

export default function Courses({
  role = "student",
}) {
  // ================= STATS =================

  const studentStats = [
    {
      title: "Enrolled",
      value: "12",
      icon: BookOpen,

      bg: "bg-orange-100",
      text: "text-orange-600",
    },

    {
      title: "Completed",
      value: "08",
      icon: GraduationCap,

      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },

    {
      title: "Live Classes",
      value: "04",
      icon: Video,

      bg: "bg-rose-100",
      text: "text-rose-600",
    },

    {
      title: "Mentors",
      value: "15",
      icon: Users,

      bg: "bg-sky-100",
      text: "text-sky-600",
    },
  ];

  const teacherStats = [
    {
      title: "Live Classes",
      value: "06",
      icon: Video,

      bg: "bg-rose-100",
      text: "text-rose-600",
    },

    {
      title: "Assignments",
      value: "42",
      icon: ClipboardCheck,

      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },

    {
      title: "Questions",
      value: "18",
      icon: MessageCircleMore,

      bg: "bg-violet-100",
      text: "text-violet-600",
    },

    {
      title: "Schedules",
      value: "09",
      icon: CalendarDays,

      bg: "bg-orange-100",
      text: "text-orange-600",
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

              shadow-sm
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
                ? "Learning Workspace"
                : "Teacher Workspace"}
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
              ? "My Courses"
              : "Teaching Dashboard"}
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
              ? "Track your learning journey and continue improving your skills."
              : "Manage live classes, schedules, assignment reviews, and student interactions."}
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
            mb-12
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
                        text-slate-500
                        text-sm
                        font-medium
                      "
                    >
                      {item.title}
                    </p>

                    <h2
                      className="
                        text-3xl
                        font-bold

                        text-slate-800

                        mt-2
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

        {/* ================= COURSES ================= */}

        <section>
          <div
            className="
              flex
              items-center
              justify-between

              mb-7
            "
          >
            <div>
              <h2
                className="
                  text-3xl
                  font-bold

                  text-slate-800
                "
              >
                {role === "student"
                  ? "Enrolled Courses"
                  : "Active Classes"}
              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >
                {role === "student"
                  ? "Continue your active learning."
                  : "Manage classes and student engagement."}
              </p>
            </div>
          </div>

          {/* GRID */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4

              gap-5
            "
          >
            {enrolledCourses.map(
              (course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  role={role}
                  showProgress={
                    role ===
                    "student"
                  }
                  buttonText={
                    role ===
                    "student"
                      ? "Continue Learning"
                      : "Manage Class"
                  }
                />
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}