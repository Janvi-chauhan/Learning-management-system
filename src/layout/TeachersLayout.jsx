// src/layouts/TeacherLayout.jsx

import React, { useState } from "react";
import TeacherSidebar from "../components/dashboards/teacher/Sidebar";
import DashboardHome from "../components/dashboards/teacher/DashboardHome";
import Students from "../components/dashboards/teacher/Student";



// Map sidebar keys to components
const componentMap = {
dashboard:DashboardHome,
students:Students
};

export default function TeacherLayout() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const ActiveComponent =
    componentMap[activeSection] || DashboardHome;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <TeacherSidebar
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