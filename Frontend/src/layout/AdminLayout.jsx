import React, { useState } from "react";

import Sidebar from "../components/dashboards/admin/Sidebar";
import DashboardHome from "../components/dashboards/admin/DashboardHome";
import StudentManager from "../components/dashboards/admin/student/StudentManager";
import PaymentsManager from "../components/dashboards/admin/PaymentsManager";
import Charts from "../components/dashboards/admin/Charts";
import ManageTeacher from "../components/dashboards/admin/teacher/TeacherManager";
import Placement from "../components/dashboards/admin/Placements";
import CourseManager from "../components/dashboards/admin/CourseManager";
import ContactUs from "../components/dashboards/admin/ContactUs";
import Settings from "../components/dashboards/admin/Settings";

import AdminHeader from "../components/dashboards/admin/AdminHeader";
import Testimonials from "../components/dashboards/admin/Testimonials";

const componentMap = {
  dashboard: DashboardHome,
  students: StudentManager,
  teachers: ManageTeacher,
  courses: CourseManager,
  payments: PaymentsManager,
  charts: Charts,
  placements: Placement,
  testimonials: Testimonials,
  contactUs: ContactUs,
  settings: Settings,
};

const AdminLayout = () => {
  const [activeSection, setActiveSection] =
    useState("dashboard");

  const ActiveComponent =
    componentMap[activeSection] ||
    DashboardHome;

  return (
    <div className="min-h-screen bg-[#F9FAFB] lg:flex">

      {/* SIDEBAR */}

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* RIGHT SIDE */}

      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">

        {/* HEADER */}

        <AdminHeader />

        {/* PAGE CONTENT */}

        <main className="flex-1 w-full px-4 py-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <ActiveComponent />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;