// src/components/dashboard/StudentDashboardCards.jsx

import {
  BookOpen,
  ClipboardList,
  CalendarCheck,
  Trophy,
} from "lucide-react";

// Student-only dashboard statistics
const stats = [
  {
    title: "Enrolled Courses",
    value: "8",
    change: "+2 this semester",
    color: "red",
  },
  {
    title: "Assignments Done",
    value: "24",
    change: "3 pending",
    color: "yellow",
  },
  {
    title: "Attendance",
    value: "89%",
    change: "+1.5% this month",
    color: "orange",
  },
  {
    title: "Rank",
    value: "#12",
    change: "Top 10%",
    color: "green",
  },
];

const iconMap = {
  "Enrolled Courses": BookOpen,
  "Assignments Done": ClipboardList,
  Attendance: CalendarCheck,
  Rank: Trophy,
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

export default function StudentDashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = iconMap[item.title] || BookOpen;
        const colors = colorMap[item.color] || colorMap.red;

        return (
          <div
            key={item.title}
            className="bg-white rounded-4xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition duration-300"
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