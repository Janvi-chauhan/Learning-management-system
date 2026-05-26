import {
  BarChart,
  Bar,
  LineChart,
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

const DashboardCharts = ({ role }) => {
  // ================= DATA =================

  const studentData = [
    { name: "Mon", progress: 60 },
    { name: "Tue", progress: 75 },
    { name: "Wed", progress: 68 },
    { name: "Thu", progress: 90 },
    { name: "Fri", progress: 85 },
    { name: "Sat", progress: 95 },
  ];

  const teacherData = [
    { name: "Mon", attendance: 40 },
    { name: "Tue", attendance: 55 },
    { name: "Wed", attendance: 48 },
    { name: "Thu", attendance: 70 },
    { name: "Fri", attendance: 65 },
    { name: "Sat", attendance: 80 },
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
      {/* ================= LINE / AREA CHART ================= */}

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
        whileHover={{
          y: -3,
        }}
        className="
          relative
          overflow-hidden

          rounded-[32px]

          border
          border-white/80

          bg-white/75
          backdrop-blur-2xl

          shadow-[0_10px_35px_rgba(15,23,42,0.05)]

          p-6
        "
      >
        {/* Ambient Glow */}

        <div
          className="
            absolute
            -top-10
            -right-10

            w-40
            h-40

            rounded-full

            bg-orange-300/20

            blur-3xl
          "
        />

        {/* Header */}

        <div className="relative z-10 mb-6">
          <div
            className="
              inline-flex
              items-center
              gap-2

              px-3
              py-1.5

              rounded-full

              bg-orange-50
            "
          >
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-[#ff6b3d]
              "
            />

            <span
              className="
                text-xs
                font-semibold
                text-[#ff6b3d]
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

              text-slate-800
            "
          >
            {role === "student"
              ? "Learning Progress"
              : "Class Attendance"}
          </h2>

          <p
            className="
              text-slate-500
              mt-1
            "
          >
            Weekly analytics overview
          </p>
        </div>

        {/* Chart */}

        <div className="relative z-10">
          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="orangeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#ff6b3d"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="100%"
                    stopColor="#ffb347"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "18px",
                  border:
                    "1px solid rgba(255,255,255,0.8)",
                  background:
                    "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#ff6b3d"
                strokeWidth={4}
                fill="url(#orangeGradient)"
              />

              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#ff6b3d"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: "#fff",
                  stroke: "#ff6b3d",
                  strokeWidth: 3,
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ================= BAR CHART ================= */}

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
          delay: 0.05,
        }}
        whileHover={{
          y: -3,
        }}
        className="
          relative
          overflow-hidden

          rounded-[32px]

          border
          border-white/80

          bg-white/75
          backdrop-blur-2xl

          shadow-[0_10px_35px_rgba(15,23,42,0.05)]

          p-6
        "
      >
        {/* Ambient Glow */}

        <div
          className="
            absolute
            bottom-0
            right-0

            w-40
            h-40

            rounded-full

            bg-red-300/20

            blur-3xl
          "
        />

        {/* Header */}

        <div className="relative z-10 mb-6">
          <div
            className="
              inline-flex
              items-center
              gap-2

              px-3
              py-1.5

              rounded-full

              bg-red-50
            "
          >
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-[#ff5a36]
              "
            />

            <span
              className="
                text-xs
                font-semibold
                text-[#ff5a36]
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

              text-slate-800
            "
          >
            {role === "student"
              ? "Assignment Activity"
              : "Student Engagement"}
          </h2>

          <p
            className="
              text-slate-500
              mt-1
            "
          >
            Overall platform interaction
          </p>
        </div>

        {/* Chart */}

        <div className="relative z-10">
          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
              />

              <Tooltip
                cursor={{
                  fill:
                    "rgba(255,107,61,0.06)",
                }}
                contentStyle={{
                  borderRadius: "18px",
                  border:
                    "1px solid rgba(255,255,255,0.8)",
                  background:
                    "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey={dataKey}
                radius={[14, 14, 0, 0]}
                fill="#ff6b3d"
                barSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardCharts;