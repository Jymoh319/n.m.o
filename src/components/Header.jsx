import { Bell, Search, MessageSquare, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Profile from "./Profile";
import GlassInput from "./ui/GlassInput";
import Logo from "./ui/Logo";

function useLiveDate() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 60);
    return () => clearInterval(t);
  }, []);

  return now;
}

export default function Header({ title }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const now = useLiveDate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const initials = user.username
    ? user.username
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
    : null;

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-20 mx-4 my-4 md:mx-6 lg:mx-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(15,34,56,0.35)] px-5 py-4 backdrop-blur-2xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-4 min-w-0">
        <div className="hidden xl:block">
          <Logo size="sm" />
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDB813]">
            Welcome back, {user.username || "Operator"}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white truncate">
            {title}
          </h1>
          <span className="hidden sm:block text-sm text-[#B9C6D6]">{dateStr}</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="hidden lg:block flex-1 max-w-sm">
          <GlassInput
            type="text"
            placeholder="Search certificates, employees..."
            className="text-sm"
            icon={<Search size={18} className="text-[#7C8CA3]" />}
          />
        </div>

        <button
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.1)] bg-white/5 text-[#B9C6D6] transition hover:bg-white/10 hover:text-white"
          aria-label="Messages"
        >
          <MessageSquare size={20} />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#2ECC71] shadow-md" />
        </button>

        <button
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.1)] bg-white/5 text-[#B9C6D6] transition hover:bg-white/10 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#FDB813] shadow-md" />
        </button>

        <div ref={profileRef} className="relative z-50">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 rounded-2xl border border-[rgba(253,184,19,0.3)] bg-gradient-to-r from-[#0F4C81] to-[#0A2A47] px-3 py-2 text-white shadow-[0_14px_40px_-16px_rgba(15,76,129,0.9)] transition hover:brightness-110"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FDB813] to-[#C98A00] text-sm font-extrabold text-[#1A1200]">
              {initials || <User size={18} />}
            </div>
            <div className="hidden items-start gap-1 lg:flex">
              <span className="text-sm font-bold text-white">{user.username || "Guest"}</span>
              <span className="text-xs text-[#B9C6D6]">{user.role || "Member"}</span>
            </div>
          </button>

          <Profile open={profileOpen} onClose={() => setProfileOpen(false)} />
        </div>
      </div>
    </header>
  );
}
