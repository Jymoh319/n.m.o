import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

export default function Profile({ open, onClose }) {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const initials = user.username
    ? user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login?mode=signin");
  };

  if (!open) return null;

  return (
    <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl">

      {/* Header */}

      <div className="flex items-center gap-4 p-5">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">

          {initials}

        </div>

        <div className="flex flex-col">

          <span className="font-semibold text-slate-800 dark:text-white">

            {user.username || "Guest"}

          </span>

          <span className="text-sm text-slate-500 dark:text-slate-400">

            {user.email || "Not signed in"}

          </span>

          <span className="mt-1 inline-flex w-fit rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">

            {user.role || "Visitor"}

          </span>

        </div>

      </div>

      <hr className="border-slate-200 dark:border-slate-700" />

      <div className="p-2">        <button
          onClick={() => {
            onClose();
            navigate("/profile");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <User size={18} />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => {
            onClose();
            navigate("/settings");
          }}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <button
          onClick={toggleTheme}
          className="mt-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}

            <span>
              {theme === "dark"
                ? "Light Mode"
                : "Dark Mode"}
            </span>
          </div>
        </button>

        <hr className="my-2 border-slate-200 dark:border-slate-700" />

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>

      </div>
    </div>
  );
}