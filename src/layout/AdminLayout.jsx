import React, { useState } from "react";
import Sidebar from "../components/dashboards/admin/Sidebar";

import DashboardHome from "../components/dashboards/admin/DashboardHome";
import StudentManager from "../components/dashboards/admin/student/StudentManager";
import PaymentsManager from "../components/dashboards/admin/PaymentsManager";
import Charts from "../components/dashboards/admin/Charts";
import ManageTeacher from "../components/dashboards/admin/teacher/teacherManager";
import Placement from "../components/dashboards/admin/Placements";
import CourseManager from "../components/dashboards/admin/CourseManager";

const componentMap = {
  dashboard: DashboardHome,
  students: StudentManager,
  teachers: ManageTeacher,
  courses: CourseManager,
  payments: PaymentsManager,
  charts: Charts,
  placements: Placement,
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