
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
} from "lucide-react";
import { NavLink } from "react-router-dom";

const adminMenu = {
  desktopMain: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/adminDashboard" },
    { name: "Students", icon: Users, path: "/adminDashboard/students" },
    { name: "Teachers", icon: GraduationCap, path: "/adminDashboard/teachers" },
    { name: "Courses", icon: BookOpen, path: "/adminDashboard/courses" },
    { name: "Payments", icon: CreditCard, path: "/adminDashboard/payments" },
    { name: "Reports", icon: BarChart3, path: "/adminDashboard/reports" },
  ],

  desktopPages: [
    { name: "Messages", icon: MessageSquare, path: "/dashboard/messages" },
    { name: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ],

  mobileBottom: [
    { name: "Home", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Students", icon: Users, path: "/dashboard/students" },
    { name: "Teachers", icon: GraduationCap, path: "/dashboard/teachers" },
    { name: "Courses", icon: BookOpen, path: "/dashboard/courses" },
    { name: "Reports", icon: BarChart3, path: "/dashboard/reports" },
  ],
};

function DesktopNavItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-[#FFD700] to-[#FFC107] text-[#7A0000] shadow-lg font-semibold"
            : "text-white hover:bg-white/10 hover:text-[#FFD700]"
        }`
      }
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{item.name}</span>
    </NavLink>
  );
}

function BottomNavItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end
      className="flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200"
    >
      {({ isActive }) => (
        <>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isActive
                ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-md"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <Icon size={18} />
          </div>

          <span
            className={`text-[10px] font-semibold mt-1 truncate max-w-[60px] ${
              isActive ? "text-red-600" : "text-gray-500"
            }`}
          >
            {item.name}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const config = adminMenu;

  return (
    <>
      <aside className="hidden lg:flex w-72 min-h-screen bg-gradient-to-b from-[#7A0000] via-[#B30000] to-[#E53935] text-white flex-col justify-between shadow-2xl">
        <div>
          <div className="px-6 py-8 border-b border-white/10">
            <h1 className="text-3xl font-extrabold tracking-wide">
              <span className="text-[#FFD700]">PROGRAMMING</span>
            </h1>
            <p className="text-xs tracking-[0.35em] text-yellow-100 mt-1 font-medium">
              CLASSES
            </p>
          </div>

          <div className="px-6 mt-6">
            <p className="text-[11px] uppercase tracking-widest text-yellow-100/80 mb-4 font-semibold">
              Main Menu
            </p>

            <nav className="space-y-2">
              {config.desktopMain.map((item) => (
                <DesktopNavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>

          <div className="px-6 mt-10">
            <p className="text-[11px] uppercase tracking-widest text-yellow-100/80 mb-4 font-semibold">
              Pages
            </p>

            <nav className="space-y-2">
              {config.desktopPages.map((item) => (
                <DesktopNavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>
        </div>

        <div className="px-6 py-6 border-t border-white/10">
          <DesktopNavItem
            item={{
              name: "Logout",
              icon: LogOut,
              path: "/logout",
            }}
          />
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] px-2 py-2 pb-safe">
        <div className="grid grid-cols-5 gap-1">
          {config.mobileBottom.map((item) => (
            <BottomNavItem key={item.name} item={item} />
          ))}
        </div>
      </nav>
    </>
  );
}