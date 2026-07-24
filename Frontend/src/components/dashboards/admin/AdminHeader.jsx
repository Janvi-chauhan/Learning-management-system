import React, { useEffect, useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const AdminHeader = ({ setActiveSection }) => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({});
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user");
      setAdmin(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/admin/notifications");
      setNotifications(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Left */}
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
            Welcome back, Admin
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Here's what's happening with your LMS today.
          </p>
        </div>

        {/* Right */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:justify-end w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full sm:flex-1 lg:w-80 lg:flex-none">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Notification */}
          <button className="relative p-3 rounded-xl border hover:bg-gray-50">

            <Bell size={20} />

            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
            )}

          </button>

          {/* Profile */}
          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 border rounded-xl px-3 py-2 hover:bg-gray-50"
            >
              <div className="h-10 w-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">
                {admin?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div className="hidden sm:block text-left">
                <h4 className="font-semibold text-sm">
                  {admin?.name}
                </h4>

                <p className="text-xs text-gray-500 truncate max-w-[160px]">
                  {admin?.email}
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`${open ? "rotate-180" : ""} transition`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl border shadow-xl z-50">

                <button
                  onClick={() => {
                    setActiveSection("dashboard");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    setActiveSection("settings");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <hr />

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
};

export default AdminHeader;