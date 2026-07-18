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
    <div className="bg-white border-b px-8 py-4 flex items-center justify-between shadow-sm">

      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome back, Admin
        </h1>

        <p className="text-slate-500 mt-2">
          Here's what's happening with your LMS today.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="pl-12 pr-5 py-3 w-[320px] rounded-2xl border outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-4 rounded-2xl border bg-white hover:bg-gray-50 transition">

          <Bell size={22} />

          {notifications.length > 0 && (
            <span className="absolute top-3 right-3 h-3 w-3 rounded-full bg-red-500"></span>
          )}

        </button>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 border rounded-2xl px-4 py-3 hover:bg-gray-50 transition"
          >
            <div className="h-12 w-12 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-lg">
              {admin?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="text-left">
              <h4 className="font-semibold">
                {admin?.name}
              </h4>

              <p className="text-sm text-gray-500">
                {admin?.email}
              </p>
            </div>

            <ChevronDown
              className={`transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-20 w-64 bg-white rounded-2xl shadow-xl border p-3 z-50">

              {/* Dashboard */}
              <button
                onClick={() => {
                  setActiveSection("dashboard");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </button>

              
              <button
                onClick={() => {
                  setActiveSection("settings");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
              >
                <Settings size={20} />
                Settings
              </button>

              <hr className="my-2" />

              {/* Logout */}
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition"
              >
                <LogOut size={20} />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminHeader;