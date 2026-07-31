import { Bell, Search, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Profile from "./Profile";

export default function Header({ title }) {
  const {} = useTheme();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const user =
    JSON.parse(localStorage.getItem("user")) || {};
  const initials = user.username
    ? user.username
          .split(" ")
          .map((name) => name[0])
          .join("")
          .toUpperCase()
    : null;

  useEffect(() => {
  const handleClickOutside = (event) => {
        if (
            profileRef.current &&
            !profileRef.current.contains(event.target)
        ) {
            setProfileOpen(false);
        }
    };

    document.addEventListener(
        "mousedown",
        handleClickOutside
    );

    return () => {
        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );
    };
  }, []);

  return (
  <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-700">

    <h1 className="font-['Quantico'] text-2xl font-bold text-slate-800 dark:text-white">
      {title}
    </h1>

    <div className="flex items-center gap-4">

      {/* Search */}

      <div className="relative hidden md:block">

        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-72 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

      </div>

      {/* Notifications */}

      <button className="relative p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">

        <Bell size={21} />

        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />

      </button>

      {/* Profile */}

      <div
        ref={profileRef}
        className="relative"
      >

        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">

            {initials || <User size={18} />}

          </div>

          <div className="hidden lg:flex flex-col items-start">

            <span className="text-sm font-semibold text-slate-800 dark:text-white">

              {user.username || "Guest"}

            </span>

            <span className="text-xs text-slate-500 dark:text-slate-400">

              {user.role || "Not signed in"}

            </span>

          </div>

        </button>

        <Profile
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
        />

      </div>

    </div>

  </header>
);
}
