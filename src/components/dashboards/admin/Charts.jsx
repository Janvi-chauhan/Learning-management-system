import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const studentData = [
  { month: "Jan", students: 40 },
  { month: "Feb", students: 55 },
  { month: "Mar", students: 70 },
  { month: "Apr", students: 90 },
  { month: "May", students: 120 },
];

const courseData = [
  { name: "Web Dev", value: 40 },
  { name: "UI/UX", value: 25 },
  { name: "AI", value: 20 },
  { name: "Data Sci", value: 15 },
];

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
];

export default function Charts() {
  return (
    <div className="w-full grid grid-cols-1 2xl:grid-cols-2 gap-6">
      {/* Student Growth */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 w-full min-w-0">
        <h2 className="text-lg sm:text-2xl font-bold mb-6">
          Student Growth
        </h2>

        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={studentData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="students"
                fill="#ef4444"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Distribution */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 w-full min-w-0">
        <h2 className="text-lg sm:text-2xl font-bold mb-6">
          Course Distribution
        </h2>

        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={courseData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {courseData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}