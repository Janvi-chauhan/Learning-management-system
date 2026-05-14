// src/components/dashboards/admin/DashboardHome.jsx
import React from "react";
import DashboardCards from "./DashboardCards";
import ActivityPanel from "./ActivityPanel";

const DashboardHome = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Welcome back, Admin.</p>
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
    </>
  );
};

export default DashboardHome;