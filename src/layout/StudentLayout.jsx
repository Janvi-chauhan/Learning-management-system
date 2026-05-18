import React, { useState } from "react";
import Sidebar from "../components/dashboards/student/Sidebar";

import DashboardHome from "../components/dashboards/student/DashboardHome";
import Assignments from "../components/dashboards/student/Assignments";
import Courses from "../components/dashboards/student/Courses";
import Projects from "../components/dashboards/student/Projects";
import StudentProfile from "../components/dashboards/student/studentProfile";
import Fees from "../components/dashboards/student/Fees";


const componentMap = {
  dashboard: DashboardHome,
  assignments: Assignments,
  courses:Courses,
  projects:Projects,
  profile:StudentProfile,
  payments:Fees

 
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