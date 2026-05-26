import React, { useState } from "react";

import Sidebar from "../components/dashboards/user/components/Sidebar";

import Dashboard from "../components/dashboards/user/Dashboard";
import { roleConfig } from "../config/roleConfig";

export default function DashboardLayout({
  role = "teacher",
}) {
  
  // ================= STATE =================

  const [activeSection, setActiveSection] =
    useState("dashboard");

  // ================= ROLE CONFIG =================

  const config = roleConfig[role];
  console.log(config.sidebarItems);

  // ================= COMPONENT =================

  const ActiveComponent =
    config.componentMap[activeSection] ||
    Dashboard;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      
      {/* Sidebar */}

      <Sidebar
        role={role}
        menu={config.sidebarItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}

      <div className="flex-1 min-w-0">
        <main
          className="
            p-4
            sm:p-6
            lg:p-8
            pt-10
            lg:pt-6
            pb-24
            lg:pb-6
          "
        >
          
          {/* Dynamic Section */}

          <ActiveComponent role={role} />
        </main>
      </div>
    </div>
  );
}