import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function Profile({ open, onClose }) {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const isAuthenticated = Boolean(localStorage.getItem("token"));

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
    <div className="absolute right-0 top-14 z-[100] w-80 overflow-hidden rounded-3xl panel-strong border border-[rgba(255,255,255,0.12)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] animate-scale-in">

      {/* Header */}
      <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-[#0F4C81]/40 to-transparent">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FDB813] to-[#C98A00] text-lg font-extrabold text-[#1A1200]">
          {initials}
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-white">{user.username || "Guest"}</span>
          <span className="text-sm text-[#B9C6D6]">{user.email || "Not signed in"}</span>
          <span className="mt-1 inline-flex w-fit rounded-full bg-[rgba(253,184,19,0.15)] px-2 py-0.5 text-xs font-semibold text-[#FDB813] border border-[rgba(253,184,19,0.3)]">
            {user.role || "Visitor"}
          </span>
        </div>
      </div>

      <hr className="border-[rgba(255,255,255,0.08)]" />

      <div className="p-2">
        <button
          onClick={() => {
            onClose();
            navigate("/profile");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[#E5ECF5] transition-colors hover:bg-white/5"
        >
          <User size={18} className="text-[#7C8CA3]" />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => {
            onClose();
            navigate("/settings");
          }}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[#E5ECF5] transition-colors hover:bg-white/5"
        >
          <Settings size={18} className="text-[#7C8CA3]" />
          <span>Settings</span>
        </button>

        {isAuthenticated && (
          <>
            <hr className="my-2 border-[rgba(255,255,255,0.08)]" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[#FF8A80] transition-colors hover:bg-[rgba(229,57,53,0.12)]"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </>
        )}

        {!isAuthenticated && (
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-[rgba(46,204,113,0.08)] border border-[rgba(46,204,113,0.2)] px-4 py-3 text-xs text-[#7C8CA3]">
            <ShieldCheck size={15} className="text-[#2ECC71] shrink-0" />
            <span>Sign in to access secure actions.</span>
          </div>
        )}
      </div>
    </div>
  );
}
