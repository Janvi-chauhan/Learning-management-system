// src/components/admin/Sidebar.jsx
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  FolderKanban,
  CalendarCheck,
  CreditCard,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Students", icon: Users },
  { name: "Courses", icon: BookOpen },
  { name: "Assignments", icon: ClipboardList },
  { name: "Projects", icon: FolderKanban },
  { name: "Attendance", icon: CalendarCheck },
  { name: "Payments", icon: CreditCard },
  { name: "Reports", icon: BarChart3 },
];

const pageItems = [
  { name: "Messages", icon: MessageSquare },
  { name: "Notifications", icon: Bell },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-[#7A0000] via-[#B30000] to-[#E53935] text-white flex flex-col justify-between shadow-2xl">
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
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    item.active
                      ? "bg-gradient-to-r from-[#FFD700] to-[#FFC107] text-[#7A0000] shadow-lg font-semibold"
                      : "text-white hover:bg-white/10 hover:text-[#FFD700]"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-6 mt-10">
          <p className="text-[11px] uppercase tracking-widest text-yellow-100/80 mb-4 font-semibold">
            Pages
          </p>

          <nav className="space-y-2">
            {pageItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 hover:text-[#FFD700] transition-all duration-300"
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="px-6 py-6 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-all duration-300">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}