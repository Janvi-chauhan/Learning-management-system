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

const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];

export default function Charts() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            Student Growth
          </h3>
          <p className="text-sm text-gray-500">
            Monthly increase in enrolled students
          </p>
        </div>

        <div className="h-[300px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={studentData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Bar
                dataKey="students"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            Course Distribution
          </h3>
          <p className="text-sm text-gray-500">
            Popularity of courses by enrollment
          </p>
        </div>

        <div className="h-[300px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={courseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="75%"
                innerRadius="45%"
                paddingAngle={3}
              >
                {courseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}