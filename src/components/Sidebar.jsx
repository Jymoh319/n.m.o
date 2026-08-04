import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Award,
  GraduationCap,
  ShieldCheck,
  FileBarChart,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Logo from "./ui/Logo";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/certifications", label: "Certificates", icon: Award },
  { to: "/harvesting", label: "Training", icon: GraduationCap },
  { to: "/shipping", label: "Verification", icon: ShieldCheck },
  { to: "/records", label: "Reports", icon: FileBarChart },
  { to: "/mineral-sources", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login?mode=signin");
  };

  return (
    <aside
      className={`hidden md:flex flex-col overflow-hidden transition-all duration-500 ${collapsed ? "w-[84px]" : "w-[280px]"} panel-strong rounded-3xl mx-4 my-4 lg:mx-5 lg:my-5 h-[calc(100vh-32px)] lg:h-[calc(100vh-40px)] sticky top-4 z-30`}
    >
      <div className={`flex items-center justify-between gap-2 px-4 py-5 ${collapsed ? "px-2" : ""}`}>
        {!collapsed ? (
          <Logo size="sm" />
        ) : (
          <div className="mx-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(253,184,19,0.4)] bg-gradient-to-br from-[#0F4C81] to-[#0A2A47] overflow-hidden">
            <img
              src="/nmo-logo.png"
              alt="N.M.O"
              className="h-full w-full object-contain p-1"
              draggable={false}
            />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/5 text-[#B9C6D6] transition hover:bg-white/10 hover:text-white ${collapsed ? "absolute -right-3 top-5 z-10 h-8 w-8" : ""}`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="mx-4 mb-4 h-px shrink-0 bg-gradient-to-r from-transparent via-[rgba(253,184,19,0.3)] to-transparent" />

      <nav className="flex-1 space-y-1.5 overflow-y-auto overflow-x-hidden px-3 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-0" : ""}`
              }
              title={collapsed ? item.label : undefined}
            >
              <span className="nav-icon shrink-0">
                <Icon size={20} />
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className={`nav-link w-full ${collapsed ? "justify-center px-0" : ""}`}
            title={collapsed ? "Logout" : undefined}
          >
            <span className="nav-icon shrink-0">
              <LogOut size={20} />
            </span>
            {!collapsed && <span className="truncate">Logout</span>}
          </button>
        )}
      </nav>

      <div className={`mx-4 my-4 rounded-2xl border border-[rgba(253,184,19,0.2)] bg-gradient-to-br from-[#0F4C81]/40 to-[#0A2A47]/60 ${collapsed ? "p-2" : "p-4"}`}>
        {!collapsed ? (
          <>
            <p className="text-sm font-bold text-[#FDB813]">N.M.O</p>
            <p className="mt-1 text-xs leading-relaxed text-[#B9C6D6]">
              Mining training &amp; certificate management.
            </p>
          </>
        ) : (
          <div className="flex justify-center">
            <span className="h-2 w-2 rounded-full bg-[#FDB813] shadow-[0_0_12px_rgba(253,184,19,0.8)]" />
          </div>
        )}
      </div>
    </aside>
  );
}
