import React, { useState } from "react";
import Sidebar from "../components/dashboards/admin/Sidebar";

import DashboardHome from "../components/dashboards/admin/DashboardHome";
import StudentManager from "../components/dashboards/admin/StudentManager";
import TeacherManager from "../components/dashboards/admin/TeacherManager";
import CourseManager from "../components/dashboards/admin/CourseManager";
import PaymentsManager from "../components/dashboards/admin/PaymentsManager";
import ReportsManager from "../components/dashboards/admin/ReportsManager";
import Charts from "../components/dashboards/admin/Charts";

const componentMap = {
  dashboard: DashboardHome,
  students: StudentManager,
  teachers: TeacherManager,
  courses: CourseManager,
  payments: PaymentsManager,
  reports: ReportsManager,
  charts: Charts,
};

const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const ActiveComponent =
    componentMap[activeSection] || componentMap.dashboard;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 min-w-0">
        <main className="p-4 sm:p-6 lg:p-8 pt-10 lg:pt-6">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;