
import {
  Users,
  BookOpen,
  ClipboardList,
  CalendarCheck,
} from "lucide-react";

const stats = [
  {
    title: "My Students",
    value: "120",
    change: "+8 this week",
    color: "red",
  },
  {
    title: "My Courses",
    value: "6",
    change: "+1 added",
    color: "yellow",
  },
  {
    title: "Assignments",
    value: "34",
    change: "12 pending review",
    color: "orange",
  },
  {
    title: "Attendance",
    value: "92%",
    change: "+2% this month",
    color: "green",
  },
];

const iconMap = {
  "My Students": Users,
  "My Courses": BookOpen,
  Assignments: ClipboardList,
  Attendance: CalendarCheck,
};

const colorMap = {
  red: {
    iconBg: "bg-red-100",
    iconText: "text-red-600",
    changeText: "text-red-600",
  },
  yellow: {
    iconBg: "bg-yellow-100",
    iconText: "text-yellow-600",
    changeText: "text-yellow-600",
  },
  orange: {
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    changeText: "text-orange-600",
  },
  green: {
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    changeText: "text-green-600",
  },
};

export default function TeacherDashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = iconMap[item.title] || Users;
        const colors = colorMap[item.color] || colorMap.red;

        return (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {item.value}
                </h3>

                <p
                  className={`text-sm font-semibold mt-3 ${colors.changeText}`}
                >
                  {item.change}
                </p>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors.iconBg}`}
              >
                <Icon className={colors.iconText} size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}