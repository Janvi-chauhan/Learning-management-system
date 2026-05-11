
import { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full bg-gradient-to-b from-white to-gray-100 border-b shadow-md z-50">
      
      {/* ✅ CENTERED CONTAINER (KEY FIX) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 h-[90px] flex items-center justify-between">

        {/* LOGO + BRAND */}
        <div className="flex items-center gap-3">
          <div>
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[18px] sm:text-[22px] lg:text-[26px] font-extrabold tracking-wide bg-gradient-to-r from-red-700 to-yellow-400 text-transparent bg-clip-text">
              PROGRAMMING CLASSES
            </span>
            <span className="text-[15px] sm:text-[15px] lg:text-[16px] tracking-wide text-gray-500 font-medium">
              Building Careers, Not Just Coders
            </span>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center gap-10 text-[16px] font-semibold text-black">

          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-red-600"
                  : "hover:text-red-600 transition"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600"
                  : "hover:text-red-600 transition"
              }
            >
              Courses
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/results"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600"
                  : "hover:text-red-600 transition"
              }
            >
              Our Results
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/quick-links"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600"
                  : "hover:text-red-600 transition"
              }
            >
              Quick Links
            </NavLink>
             
          </li>
          <li>
                  <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600"
                  : "hover:text-red-600 transition"
              }
            >
              Profile
            </NavLink>


          </li>
    

        </ul>

        {/* DESKTOP BUTTON */}
        <button className="hidden lg:block px-7 py-3 rounded-lg bg-red-600 text-white font-bold shadow-lg shadow-red-300 hover:bg-red-700 hover:shadow-red-400 active:scale-95 transition-all">
          New Batch
        </button>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden text-3xl font-bold"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">
          <div className="font-semibold text-red-600">Home</div>
          <NavLink
            to="/courses"
            onClick={() => setMobileOpen(false)}
            className="font-semibold"
          >
            Courses
          </NavLink>

          <div className="font-semibold">Our Results</div>
          <div className="font-semibold">Quick Links</div>

          <button className="w-full mt-3 px-6 py-3 rounded-lg bg-red-600 text-white font-bold shadow-md">
            New Batch
          </button>
        </div>
      )}
    </header>
  );
}
