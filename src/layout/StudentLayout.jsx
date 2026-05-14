import React, { useState } from "react";
import Sidebar from "../components/dashboards/student/Sidebar";

import DashboardHome from "../components/dashboards/student/DashboardHome";


const componentMap = {
  dashboard: DashboardHome,
 
};

export default function StudentLayout() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const ActiveComponent =
    componentMap[activeSection] || DashboardHome;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 min-w-0">
        <main className="p-4 sm:p-6 lg:p-8 pt-10 lg:pt-6 pb-24 lg:pb-6">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}