import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

// ================= DATA =================

const studentData = [
  { month: "Jan", students: 40 },
  { month: "Feb", students: 55 },
  { month: "Mar", students: 70 },
  { month: "Apr", students: 90 },
  { month: "May", students: 120 },
  { month: "Jun", students: 145 },
];

const courseData = [
  { name: "Web Dev", value: 40 },
  { name: "UI/UX", value: 25 },
  { name: "AI/ML", value: 20 },
  { name: "Data Science", value: 15 },
];

// ================= COLORS =================

const COLORS = [
  "#FFB26B", 
  "#FF914D", 
  "#FF6B6B", 
  "#E85D75", 
];
// ================= CUSTOM TOOLTIP =================
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-red-900/40 bg-[#18181b] backdrop-blur-xl shadow-xl px-4 py-3">
        <p className="text-sm font-semibold text-white">
          {label}
        </p>

        <p className="text-sm text-red-400 mt-1">
          {payload[0].value} Students
        </p>
      </div>
    );
  }

  return null;
};

// ================= CHARTS =================

export default function Charts() {
  return (
    <div className="grid grid-cols-2 2xl:grid-cols-2 gap-6">
      
      {/* ================= BAR CHART ================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        whileHover={{ y: -2 }}
       className="relative overflow-hidden rounded-[30px]   bg-white/75 backdrop-blur-2xl shadow-[1px_1px_10px_rgba(15,23,42,0.05)] p-5 sm:p-6"
      >
        
        {/* Ambient Glow */}

        <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-orange-200/10 blur-3xl" />

        {/* Header */}

        <div className="relative z-10 mb-6">
          
          {/* Label */}

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50">
            
            <div className="w-2 h-2 rounded-full bg-[#ff0904]" />

            <span className="text-xs font-semibold text-[#ff3d3d]">
              Analytics
            </span>

          </div>

          {/* Title */}

          <h3 className="mt-4 text-2xl font-bold text-slate-800">
            Student Growth
          </h3>

          {/* Subtitle */}

          <p className="text-sm text-slate-500 mt-2">
            Monthly increase in enrolled students
          </p>

        </div>

        {/* Chart */}

        <div className="relative z-10 h-[300px] sm:h-[340px]">
          
          <ResponsiveContainer width="100%" height="100%">
            
            <BarChart
              data={studentData}
              margin={{
                top: 10,
                right: 0,
                left: -20,
                bottom: 0,
              }}
            >
              
              {/* Grid */}

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#525252"
              />

              {/* X Axis */}

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#525252",
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y Axis */}

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* Tooltip */}

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill:
                    "rgba(255,107,61,0.06)",
                }}
              />

              {/* Bars */}

              <Bar
                dataKey="students"
                radius={[12, 12, 0, 0]}
                barSize={38}
                fill="#ff0000"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </motion.div>

      {/* ================= PIE CHART ================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.05,
          duration: 0.35,
        }}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-[30px] backdrop-blur-2xl shadow-[1px_1px_10px_rgba(0,0,0,0.1)] p-5 sm:p-6"
      >
        
        {/* Ambient Glow */}

        <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-sky-200/10 blur-3xl" />

        {/* Header */}

        <div className="relative z-10 mb-6">
          
          {/* Label */}

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50">
            
            <div className="w-2 h-2 rounded-full bg-sky-500" />

            <span className="text-xs font-semibold text-sky-600">
              Courses
            </span>

          </div>

          {/* Title */}

          <h3 className="mt-4 text-2xl font-bold text-slate-800">
            Course Distribution
          </h3>

          {/* Subtitle */}

          <p className="text-sm text-slate-500 mt-2">
            Popularity of courses by enrollment
          </p>

        </div>

        {/* Chart */}

        <div className="relative z-10 h-[300px] sm:h-[340px]">
          
          <ResponsiveContainer width="100%" height="100%">
            
            <PieChart>

              {/* Pie */}

              <Pie
                data={courseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="78%"
                innerRadius="52%"
                paddingAngle={4}
              >
                {courseData.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              {/* Tooltip */}

              <Tooltip />

              {/* Legend */}

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "13px",
                  paddingTop: "10px",
                  color: "#64748b",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </motion.div>
    </div>
  );
}