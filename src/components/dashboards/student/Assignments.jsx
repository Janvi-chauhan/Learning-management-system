// src/components/dashboards/student/Assignments.jsx
import React from "react";
import {
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Build Responsive Portfolio Website",
    course: "Frontend Development",
    dueDate: "18 Aug 2026",
    status: "In Progress",
    priority: "High",
    progress: 65,
  },
  {
    id: 2,
    title: "Implement Authentication API",
    course: "Backend Development",
    dueDate: "22 Aug 2026",
    status: "Pending",
    priority: "Medium",
    progress: 20,
  },
  {
    id: 3,
    title: "Data Analysis with Pandas",
    course: "Python for Data Science",
    dueDate: "25 Aug 2026",
    status: "Completed",
    priority: "Low",
    progress: 100,
  },
  {
    id: 4,
    title: "Design Mobile App Wireframes",
    course: "UI/UX Design",
    dueDate: "28 Aug 2026",
    status: "Not Started",
    priority: "High",
    progress: 0,
  },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-red-100 text-red-700";
  }
};

const getPriorityStyles = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-600";
    case "Medium":
      return "text-yellow-600";
    default:
      return "text-green-600";
  }
};

export default function Assignments() {
  const completed = assignments.filter(
    (a) => a.status === "Completed"
  ).length;

  const pending = assignments.filter(
    (a) => a.status !== "Completed"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Assignments
          </h1>
          <p className="text-gray-500 mt-2">
            Track all your assignments and deadlines.
          </p>
        </div>

        <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-md hover:scale-105 transition">
          Submit Assignment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total</p>
            <ClipboardList className="text-red-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold mt-2">
            {assignments.length}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Completed</p>
            <CheckCircle2 className="text-green-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold mt-2">
            {completed}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending</p>
            <AlertCircle className="text-yellow-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold mt-2">
            {pending}
          </h3>
        </div>
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {assignment.course}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                  assignment.status
                )}`}
              >
                {assignment.status}
              </span>
            </div>

            {/* Meta */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Due: {assignment.dueDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>
                  Priority:{" "}
                  <span
                    className={`font-semibold ${getPriorityStyles(
                      assignment.priority
                    )}`}
                  >
                    {assignment.priority}
                  </span>
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Progress</span>
                <span className="font-semibold">
                  {assignment.progress}%
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-red-500 to-yellow-500"
                  style={{
                    width: `${assignment.progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition">
                Continue
              </button>

              <button className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                <FileText size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}