// src/components/admin/ActivityPanel.jsx

import {
  UserPlus,
  FileText,
  CreditCard,
  BookOpen,
  CheckCircle,
  Clock,
} from "lucide-react";

// Static admin-only recent activities
const activities = [
  {
    id: 1,
    title: "New student registered",
    description: "Aarav Patil enrolled in MERN Stack Development.",
    time: "2 mins ago",
    icon: UserPlus,
    color: "green",
  },
  {
    id: 2,
    title: "Assignment submitted",
    description: "Sneha Shah submitted React Dashboard Task.",
    time: "15 mins ago",
    icon: FileText,
    color: "blue",
  },
  {
    id: 3,
    title: "Payment received",
    description: "₹5,000 fee received from Rahul Sharma.",
    time: "1 hour ago",
    icon: CreditCard,
    color: "yellow",
  },
  {
    id: 4,
    title: "Course updated",
    description: "Python course content was updated.",
    time: "3 hours ago",
    icon: BookOpen,
    color: "red",
  },
  {
    id: 5,
    title: "Attendance marked",
    description: "Today's attendance has been completed.",
    time: "Today",
    icon: CheckCircle,
    color: "green",
  },
];

const colorClasses = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  yellow: "bg-yellow-100 text-yellow-600",
  red: "bg-red-100 text-red-600",
};

export default function ActivityPanel() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Activities
        </h2>
        <button className="text-sm font-semibold text-red-600 hover:text-red-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  colorClasses[activity.color]
                }`}
              >
                <Icon size={20} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {activity.description}
                </p>

                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <Clock size={12} />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}