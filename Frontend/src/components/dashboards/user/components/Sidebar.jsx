import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FolderKanban,
  User,
  ChevronRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useState } from "react";
import { MdPayment } from "react-icons/md";

const Sidebar = ({
  menu,
  activeSection,
  setActiveSection,
  role,
}) => {
  const [collapsed, setCollapsed] =
    useState(true);

  // ICON MAP

  const iconMap = {
    dashboard: LayoutDashboard,
    courses: BookOpen,
    assignments: ClipboardList,
    projects: FolderKanban,
    profile: User,
    payments:MdPayment,

  };

  return (
    <motion.aside
      animate={{
        width: collapsed
          ? "86px"
          : "220px",
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        h-screen
        bg-[#0f172a]
        flex
        flex-col
        pr-4
        items-center
        py-5
        overflow-visible
        sticky
        top-23
        left-0  
      "
    >
      {/* Soft Glow */}

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-40
          bg-gradient-to-b
          from-[#fc4b3a]/10
          to-transparent
          pointer-events-none
        "
      />

      {/* LOGO */}

      <div
        className={`
          w-full
          flex
          items-center
          ${
            collapsed
              ? "justify-center"
              : "px-4"
          }
        `}
      >
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
            from-[#ff3636]
            to-[#ff4747]
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

        {/* Expanded Logo */}

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
                  font-semibold
                  text-[16px]
                  leading-none
                "
              >
                LMS
              </h1>

              <p
                className="
                  text-slate-400
                  text-xs
                  capitalize
                  mt-1
                "
              >
                {role}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TOGGLE BUTTON */}
      

      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() =>
          setCollapsed(!collapsed)
        }
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
          size={25}
          className={`
            text-white
            transition-all
            duration-300
           
            ${
              collapsed
                ? ""
                : "rotate-180"
            }
          `}
        />
        
      </motion.button>

      {/* MENU */}

      <div
        className="
          flex
          flex-col
          gap-4
          mt-12
          w-full
          items-center
        "
      >
        {menu.map((item) => {
          const Icon =
            iconMap[item] ||
            LayoutDashboard;

          const isActive =
            activeSection === item;

          return (
            <motion.button
              key={item}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                setActiveSection(item)
              }
              className={`
                relative
                flex
                items-center
                ${
                  collapsed
                    ? "justify-center"
                    : "justify-start px-4"
                }
                w-[56px]
                ${
                  collapsed
                    ? "h-[56px]"
                    : "w-[190px] h-[52px]"
                }
                rounded-2xl
                transition-all
                duration-300
                group
                overflow-hidden
                ${
                  isActive
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                }
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
                    from-[rgb(255,50,50)]
                    to-[#ff4747]
                  "
                />
              )}

              {/* ICON */}

              <div
                className={`
                  flex
                  items-center
                  justify-center
                  min-w-[42px]
                  h-[42px]
                  rounded-xl
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-br from-[#ff5136] to-[#ff4747] text-white shadow-lg shadow-orange-500/20"
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
                      capitalize
                      whitespace-nowrap
                    "
                  >
                    {item}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Spacer */}

      <div className="flex-1" />

      {/* PROFILE */}

      {/* <div className="mb-3">
        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          className="
            w-11
            h-11
            rounded-full
            overflow-hidden
            border-2
            border-white/10
            shadow-lg
            cursor-pointer
          "
        >
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="
              w-full
              h-full
              object-cover
            "
          />
        </motion.div>
      </div> */}
    </motion.aside>
  );
};

export default Sidebar;