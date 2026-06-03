import React from "react";

import { motion } from "framer-motion";

import DashboardCards from "./DashboardCards";
import ActivityPanel from "./ActivityPanel";
import Charts from "./Charts";

const DashboardHome = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] via-[#f9fafb] to-[#eef2ff] space-y-8">
      
      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
      >
        
        {/* LEFT */}

        <div>
          
          {/* LABEL */}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm">
            
            <div className="w-2 h-2 rounded-full bg-[#ff6b3d]" />

            <span className="text-sm font-medium text-slate-600">
              Admin Workspace
            </span>

          </div>

          {/* TITLE */}

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-800">
            Admin Dashboard
          </h1>

          {/* SUBTITLE */}

          <p className="text-slate-500 mt-3 text-lg max-w-2xl leading-relaxed">
            
          </p>

        </div>

          
        

      </motion.div>

      {/* ================= DASHBOARD CARDS ================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.05,
          duration: 0.35,
        }}
      >
        <DashboardCards />
      </motion.div>

      {/* ================= ANALYTICS + ACTIVITY ================= */}

      <div className="">
        
        {/* ================= CHART SECTION ================= */}

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
            
            {/* AMBIENT GLOW */}

            <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-orange-200/10 blur-3xl" />

            {/* HEADER */}

            <div className="relative z-10 mb-6">
              
              {/* LABEL */}

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50">
                
                <div className="w-2 h-2 rounded-full bg-[#ff6b3d]" />

                <span className="text-xs font-semibold text-[#ff6b3d]">
                  Analytics
                </span>

              </div>

              {/* TITLE */}

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                Analytics Overview
              </h2>

              {/* SUBTITLE */}

              <p className="text-slate-500 mt-2 leading-relaxed">
                Insights into student growth, course
                engagement, live classes, teacher
                performance, and payment activity.
              </p>

            </div>

            {/* CHART */}

            <div className="relative z-10">
              <Charts />
            </div>

          </div>

        </motion.div>

        {/* ================= ACTIVITY PANEL ================= */}

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