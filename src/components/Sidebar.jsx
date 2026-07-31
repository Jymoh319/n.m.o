import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  LayoutDashboard,
  Award,
  Ship,
  Mountain,
  ClipboardList,
  Wheat,
  Settings,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/certifications",
    label: "Certifications",
    icon: Award,
  },
  {
    to: "/shipping",
    label: "Shipping",
    icon: Ship,
  },
  {
    to: "/mineral-sources",
    label: "Mineral Sources",
    icon: Mountain,
  },
  {
    to: "/records",
    label: "Records",
    icon: ClipboardList,
  },
  {
    to: "/harvesting",
    label: "Harvesting",
    icon: Wheat,
  },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } bg-slate-900 dark:bg-slate-950 border-r border-slate-700 dark:border-slate-800 h-screen sticky top-0`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700 dark:border-slate-800">
        {!collapsed && (
          <span className="text-lg font-bold text-white truncate">
            Nairobi Mining Operations
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} />

              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-2 border-t border-slate-700 dark:border-slate-800 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={20} />

          {!collapsed && <span>Settings</span>}
        </NavLink>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors w-full"
          title={
            collapsed
              ? theme === "dark"
                ? "Light Mode"
                : "Dark Mode"
              : undefined
          }
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}

          {!collapsed && (
            <span>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
