
import React from "react";
import Sidebar from "../components/dashboards/teacher/Sidebar";
import DashboardCards from "../components/dashboards/teacher/DashboardCards";
import ActivityPanel from "../components/dashboards/teacher/ActivityPanel";

const TeacherDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <main className="p-4 sm:p-6 lg:p-8 pt-10 lg:pt-6">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Teacher  Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back, Teacher .
            </p>
          </div>

          <DashboardCards />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 min-h-[420px]">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Overview
                </h2>
                <div className="h-[320px] rounded-xl bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center text-gray-400">
                  Charts / Tables / Reports will go here
                </div>
              </div>
            </div>

            <div>
              <ActivityPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;