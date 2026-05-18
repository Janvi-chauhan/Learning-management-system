// src/components/dashboards/teacher/TeacherDashboardHome.jsx

import React from "react";
import DashboardCards from "./DashboardCards";
import ActivityPanel from "./ActivityPanel";
import Charts from "./Charts";

export default function TeacherDashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Teacher Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back, Teacher. Manage your courses, students, and assignments.
        </p>
      </div>

      {/* Statistics Cards */}
      <DashboardCards />

      {/* Charts + Activity Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-red-50 via-white to-yellow-50 rounded-3xl border border-gray-200 shadow-sm p-4 sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Teaching Overview
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Monitor course engagement, student performance, and attendance.
              </p>
            </div>

            <Charts />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
}