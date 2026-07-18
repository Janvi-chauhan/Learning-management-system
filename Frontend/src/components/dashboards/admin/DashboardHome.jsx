import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardCards from "./DashboardCards";
import ActivityPanel from "./ActivityPanel";
import StudentManager from "../../dashboards/admin/student/StudentManager";
import PaymentsManager from "../admin/PaymentsManager";
import ManageTeacher from "../../dashboards/admin/teacher/TeacherManager";
import Placement from "../admin/Placements";
import CourseManager from "../admin/CourseManager";
import ContactUs from "../admin/ContactUs";
import ContactQueries from "../admin/ContactQueries";

import Charts from "../admin/Charts";
import api from "../../../services/api";

import AdminHeader from "../../../components/dashboards/admin/AdminHeader";
const componentMap = {
  // dashboard: DashboardHome,
  students: StudentManager,
  teachers: ManageTeacher,
  courses: CourseManager,
  payments: PaymentsManager,
  charts: Charts,
  placements: Placement,
  contactUs: ContactUs,
};
const DashboardHome = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalCourses: 0,
    completedAssignments: 0,
    totalProjects: 0,
    totalPayments: 0,
  });

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      console.log("Dashboard API:", response.data);

      setDashboardStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  

  return (
    
          
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] via-[#f9fafb] to-[#eef2ff] space-y-8">


      {/* DASHBOARD CARDS */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.05,
          duration: 0.35,
        }}
      >
        <DashboardCards dashboardStats={dashboardStats} />
      </motion.div>

      {/* ANALYTICS + ACTIVITY */}

      <div>

        {/* CHARTS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.35,
          }}
          className="xl:col-span-2"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-5 sm:p-6">

            <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-orange-200/10 blur-3xl" />

            <div className="relative z-10 mb-6">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50">

                <div className="w-2 h-2 rounded-full bg-[#ff6b3d]" />

                <span className="text-xs font-semibold text-[#ff6b3d]">
                  Analytics
                </span>

              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                Analytics Overview
              </h2>

              <p className="text-slate-500 mt-2 leading-relaxed">
                Insights into student growth, course engagement,
                live classes, teacher performance and payments.
              </p>

            </div>

            <div className="relative z-10">
              <Charts />
            </div>

          </div>
        </motion.div>

        {/* ACTIVITY PANEL */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.35,
          }}
        >
          <ActivityPanel />
        </motion.div>

      </div>
    </div>
   
  );
};

export default DashboardHome;