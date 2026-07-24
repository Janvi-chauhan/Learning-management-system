import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo cpc.png";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  Menu,
  X,
  User,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef();

  // DEMO LOGIN STATE
  const isLoggedIn = !!localStorage.getItem("token") ;

  // CLOSE PROFILE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Courses",
      path: "/courses",
    },
    {
      name: "Our Results",
      path: "/results",
    },
    {
      name: "Quick Links",
      path: "/quick-links",
    },
  ];

  const handleLogout = async () => {
  try {
    await api.post("/logout");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");
  } catch (error) {
    console.error(error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }
};

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 xl:px-16 h-[80px] xl:h-[85px] flex items-center justify-between gap-4 "
>          
          {/* LOGO */}
          <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
            <img
              src={logo}
              alt="Logo"
              className=" w-14 h-14 sm:w-16 sm:h-16 xl:w-20 xl:h-20 object-contain "
            />

            <div className="leading-tight min-w-0">
              <h1 className="truncate font-black tracking-wide bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text text text-basesm:text-lgmd:text-xlxl:text-2xl leading-tight">
               CREATIVE PROGRAMMING CLASSES
              </h1>

              <p className=" text-gray-500 font-medium text-[11px sm:text-x md:text-s xl:text-[15px] leading-tigh ">
                Building Careers, Not Just Coders
              </p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden xl:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `text-[16px] font-semibold transition ${
                        isActive
                          ? "text-red-600"
                          : "text-black hover:text-red-600"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* PROFILE / LOGIN */}
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Sign In
              </NavLink>
            ) : (
              <div
                className="relative"
                ref={profileRef}
              >
                {/* PROFILE BUTTON */}
                <button
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  className=" flex items-center gap-2 px-3 py-2 rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-md transition "
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <User
                      size={20}
                      className="text-red-600"
                    />
                  </div>

                  <span className="font-semibold">
                    Profile
                  </span>

                  <ChevronDown
                    size={18}
                    className={`transition duration-300 ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 top-[70px] w-64 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    
                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition"
                    >
                      <LayoutDashboard
                        size={20}
                        className="text-red-600"
                      />

                      <span className="font-medium">
                        Dashboard
                      </span>
                    </NavLink>
{/* 
                    <NavLink
                      to="/settings"
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition"
                    >
                      <Settings
                        size={20}
                        className="text-red-600"
                      />

                      <span className="font-medium">
                        Settings
                      </span>
                    </NavLink> */}

                    <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 transition text-red-600">
                      <LogOut size={20} />

                      <span className="font-medium">
                        Logout
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMobileOpen(true)
            }
            className="xl:hidden w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden transition-all duration-300 ${
          mobileOpen
            ? "visible bg-black/40"
            : "invisible bg-black/0"
        }`}
      >
        {/* SIDEBAR */}
        <div
          className={`absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-white transition-transform duration-300 ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          
          {/* TOP */}
          <div className="flex items-center justify-between px-5 h-[85px] border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 object-contain"
              />

              <div>
                <h1 className="text-[18px] font-black bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text">
                  PROGRAMMING
                </h1>

                <p className="text-xs text-gray-500">
                  Creative Programming Classes
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setMobileOpen(false)
              }
              className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center"
            >
              <X size={24} />
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="px-4 py-5 flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={({ isActive }) =>
                  `px-4 py-4 rounded-xl font-semibold transition ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-black hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* PROFILE SECTION */}
          {isLoggedIn ? (
            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <User
                    className="text-red-600"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-bold">
                    Profile
                  </h3>

                  <p className="text-sm text-gray-500">
                    Welcome back 👋
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <NavLink
                  to="/dashboard"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <LayoutDashboard
                    size={20}
                    className="text-red-600"
                  />

                  Dashboard
                </NavLink>

                <NavLink
                  to="/settings"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <Settings
                    size={20}
                    className="text-red-600"
                  />

                  Settings
                </NavLink>

                <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition">
                  <LogOut size={20} />

                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white">
              <NavLink
                to="/login"
                className="block w-full text-center py-3 rounded-xl bg-red-600 text-white font-semibold"
              >
                Sign In
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}