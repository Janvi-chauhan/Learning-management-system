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
import Subscribe from "../components/dashboards/admin/Subscribe";

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
  subscribe: Subscribe,
  settings: Settings,
};

const AdminLayout = () => {
  const [activeSection, setActiveSection] =
    useState("dashboard");

  const ActiveComponent =
    componentMap[activeSection] ||
    DashboardHome;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">

      {/* SIDEBAR */}

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* RIGHT SIDE */}

      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER */}

        <AdminHeader />

        {/* PAGE CONTENT */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <ActiveComponent />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;