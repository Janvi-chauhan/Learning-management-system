import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

import { motion } from "framer-motion";

const DashboardCharts = ({
  role,
  stats,
}) => {
  const studentData = [
  {
    name: "Courses",
    progress: stats.totalCourses || 0,
  },

  {
    name: "Assignments",
    progress:
      stats.completedAssignments || 0,
  },

  {
    name: "Projects",
    progress:
      stats.totalProjects || 0,
  },

  {
    name: "Payments",
    progress:
      stats.totalPayments || 0,
  },
];

const teacherData = [
  {
    name: "Courses",
    attendance:
      stats.totalCourses || 0,
  },

  {
    name: "Assignments",
    attendance:
      stats.totalAssignments || 0,
  },

  {
    name: "Students",
    attendance:
      stats.totalStudents || 0,
  },

  {
    name: "Performance",
    attendance:
      stats.performance || 0,
  },
];
  const chartData =
    role === "student"
      ? studentData
      : teacherData;

  const dataKey =
    role === "student"
      ? "progress"
      : "attendance";

  return (
    <div
      className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      "
    >
      {/* AREA CHART */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        className="
          bg-white
          border-2
          border-black
          rounded-3xl
          p-6
          shadow-lg
        "
      >
        <div className="mb-6">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              bg-black
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
                text-xs
                font-semibold
                text-white
              "
            >
              Analytics
            </span>
          </div>

          <h2
            className="
              mt-4
              text-2xl
              font-bold
              text-black
            "
          >
            {role === "student"
              ? "Learning Progress"
              : "Class Attendance"}
          </h2>

          <p
            className="
              text-black/70
              mt-1
            "
          >
            Weekly analytics overview
          </p>
        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <AreaChart data={chartData}>
            <CartesianGrid
              stroke="#d1d5db"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#000000",
                fontSize: 13,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#000000",
                fontSize: 13,
              }}
            />

            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "2px solid #000000",
                borderRadius: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#FF0000"
              fill="#FF0000"
              fillOpacity={0.15}
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#FF0000"
              strokeWidth={3}
              dot={{
                fill: "#FFFFFF",
                stroke: "#FF0000",
                strokeWidth: 3,
                r: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* BAR CHART */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        className="
          bg-white
          border-2
          border-black
          rounded-3xl
          p-6
          shadow-lg
        "
      >
        <div className="mb-6">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              bg-red-600
            "
          >
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-white
              "
            />

            <span
              className="
                text-xs
                font-semibold
                text-white
              "
            >
              Reports
            </span>
          </div>

          <h2
            className="
              mt-4
              text-2xl
              font-bold
              text-black
            "
          >
            {role === "student"
              ? "Assignment Activity"
              : "Student Engagement"}
          </h2>

          <p
            className="
              text-black/70
              mt-1
            "
          >
            Overall platform interaction
          </p>
        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={chartData}>
            <CartesianGrid
              stroke="#d1d5db"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#000000",
                fontSize: 13,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#000000",
                fontSize: 13,
              }}
            />

            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "2px solid #000000",
                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey={dataKey}
              fill="#FF0000"
              radius={[10, 10, 0, 0]}
              barSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default DashboardCharts;