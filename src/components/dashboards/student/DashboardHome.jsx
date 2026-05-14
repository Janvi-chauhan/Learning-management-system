import React from "react";
import DashboardCards from "./DashboardCards";
import ActivityPanel from "./ActivityPanel";
import Charts from "./Charts";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Student Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back, Student. Track your courses and progress.
        </p>
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-red-50 via-white to-yellow-50 rounded-3xl border border-gray-200 shadow-sm p-4 sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Learning Overview
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Your progress, attendance, and course performance.
              </p>
            </div>

            <Charts />
          </div>
        </div>

        <div>
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
}