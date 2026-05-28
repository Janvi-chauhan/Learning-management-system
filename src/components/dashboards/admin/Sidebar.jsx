// src/components/dashboards/admin/Sidebar.jsx

import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  CreditCard,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

// ================= MENU =================

const adminMenu = {
  desktopMain: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      key: "dashboard",
    },

    {
      name: "Students",
      icon: Users,
      key: "students",
    },

    {
      name: "Teachers",
      icon: GraduationCap,
      key: "teachers",
    },

    {
      name: "Courses",
      icon: BookOpen,
      key: "courses",
    },

    {
      name: "Payments",
      icon: CreditCard,
      key: "payments",
    },

   
  ],

  desktopPages: [
    {
      name: "Messages",
      icon: MessageSquare,
      key: "messages",
    },

    {
      name: "Notifications",
      icon: Bell,
      key: "notifications",
    },

    {
      name: "Settings",
      icon: Settings,
      key: "settings",
    },
  ],
};

// ================= NAV ITEM =================

function NavItem({ item, activeSection, setActiveSection, collapsed }) {
  const Icon = item.icon;

  const isActive = activeSection === item.key;

  return (
    <motion.button
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={() => setActiveSection(item.key)}
      className={`
        relative

        flex
        items-center

        ${collapsed ? "justify-center" : "justify-start px-4"}

        ${collapsed ? "w-[58px] h-[58px]" : "w-[220px] h-[56px]"}

        rounded-2xl

        overflow-hidden

        transition-all
        duration-300

        group

        ${isActive ? "bg-white/10" : "hover:bg-white/5"}
      `}
    >
      {/* Active Indicator */}

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="
            absolute
            left-0
            top-3
            bottom-3

            w-[3px]

            rounded-full

            bg-gradient-to-b
            from-[#ff5a36]
            to-[#ffb347]
          "
        />
      )}

      {/* ICON */}

      <div
        className={`
          flex
          items-center
          justify-center

          min-w-[44px]
          h-[44px]

          rounded-xl

          transition-all
          duration-300

          ${
            isActive
              ? "bg-gradient-to-br from-[#ff5a36] to-[#ffb347] text-white shadow-lg shadow-orange-500/20"
              : "text-slate-400 group-hover:text-white"
          }
        `}
      >
        <Icon size={20} />
      </div>

      {/* TEXT */}

      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              ml-3

              text-[15px]
              font-medium

              text-slate-200

              whitespace-nowrap
            "
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ================= SIDEBAR =================

export default function Sidebar({ activeSection, setActiveSection }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* DESKTOP SIDEBAR */}

      <motion.aside
        animate={{
          width: collapsed ? "92px" : "280px",
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          hidden
          lg:flex
          sticky
          top-0
          h-screen
          bg-[#0f172a]
          flex-col
          py-5
          px-4
          overflow-visible

          shadow-2xl

          z-50
        "
      >
        {/* Ambient Glow */}

        <div
          className="
            absolute
            top-0
            left-0

            w-full
            h-52

            bg-gradient-to-b
            from-[#ff5a36]/10
            to-transparent

            pointer-events-none
          "
        />

        {/* ================= LOGO ================= */}

        <div
          className={`
            flex
            items-center

            ${collapsed ? "justify-center" : "px-2"}
          `}
        >
          {/* Logo */}

          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 4,
            }}
            className="
              w-12
              h-12

              rounded-2xl

              bg-gradient-to-br
              from-[#ff5a36]
              to-[#ffb347]

              flex
              items-center
              justify-center

              text-white
              font-bold
              text-xl

              shadow-lg
              shadow-orange-500/20
            "
          >
            P
          </motion.div>

          {/* Expanded */}

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="ml-3"
              >
                <h1
                  className="
                    text-white
                    text-[17px]
                    font-semibold
                    tracking-wide
                  "
                >
                  Programming
                </h1>

                <p
                  className="
                    text-slate-400
                    text-xs

                    tracking-[0.25em]
                    uppercase

                    mt-1
                  "
                >
                  Classes
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= TOGGLE ================= */}

        <motion.button
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => setCollapsed(!collapsed)}
          className="
            absolute
            -right-4
            top-7

            z-50

            w-8
            h-8

            rounded-full

            bg-[#111827]

            border-4
            border-white

            flex
            items-center
            justify-center

            shadow-lg
          "
        >
          <ChevronRight
            size={20}
            className={`
              text-white

              transition-all
              duration-300

              ${collapsed ? "" : "rotate-180"}
            `}
          />
        </motion.button>

        {/* ================= MAIN MENU ================= */}

        <div className="mt-12">
          {!collapsed && (
            <p
              className="
                px-3
                mb-4

                text-[11px]

                uppercase
                tracking-[0.25em]

                text-slate-500

                font-semibold
              "
            >
              Main Menu
            </p>
          )}

          <div
            className="
              flex
              flex-col
              gap-3
            "
          >
            {adminMenu.desktopMain.map((item) => (
              <NavItem
                key={item.key}
                item={item}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>

        
        {/* Spacer */}

        <div className="flex-1" />

        {/* ================= ADMIN PROFILE ================= */}

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className={`
            flex
            items-center

            ${collapsed ? "justify-center" : "justify-between"}

            rounded-2xl

            bg-white/5

            border
            border-white/5

            p-3
          `}
        >
          {/* Left */}

          <div className="flex items-center">
            <img
              src="https://i.pravatar.cc/100"
              alt="admin"
              className="
                w-11
                h-11

                rounded-full

                object-cover

                border-2
                border-white/10
              "
            />

            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -10,
                  }}
                  className="ml-3"
                >
                  <h3
                    className="
                      text-sm
                      font-semibold

                      text-white
                    "
                  >
                    Admin
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Super Admin
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout */}

          {!collapsed && (
            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                w-10
                h-10
                rounded-xl
                bg-white/5
                flex
                items-center
                justify-center
                text-slate-400
                hover:text-white
                transition-all
              "
            >
              <LogOut size={18} />
            </motion.button>
          )}
        </motion.div>
      </motion.aside>
    </>
  );
}
