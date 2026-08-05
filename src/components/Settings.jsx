import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sun,
  Moon,
  Monitor,
  Bell,
  Shield,
  User,
  Info,
  ChevronDown,
  ChevronUp,
  Settings as SettingsIcon,
} from "lucide-react";
import { motion } from "framer-motion";

function Toggle({ checked }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={checked} className="sr-only peer" />
      <div className="w-11 h-6 bg-white/10 rounded-full peer-checked:bg-[#FDB813] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all after:shadow-md"></div>
    </label>
  );
}

function SectionCard({ icon: Icon, title, desc, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="panel rounded-[26px] p-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#1E6FB8] shadow-[0_12px_36px_-12px_rgba(15,76,129,0.9)]">
          <Icon size={22} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-[#7C8CA3]">{desc}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function Settings() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FDB813] to-[#C98A00] shadow-[0_14px_40px_-14px_rgba(253,184,19,0.8)]">
          <SettingsIcon size={24} className="text-[#1A1200]" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">Settings</h2>
          <p className="text-sm text-[#7C8CA3]">Configure your MineCert Pro workspace</p>
        </div>
      </div>

      {/* Notifications */}
      <SectionCard icon={Bell} title="Notifications" desc="Manage how you receive alerts">
        <div className="space-y-3">
          {[
            { label: "Email notifications", desc: "Receive updates via email", checked: true },
            { label: "Shipment alerts", desc: "Get notified when shipments change status", checked: true },
            { label: "Certification renewals", desc: "Reminders before certificates expire", checked: false },
            { label: "Verification alerts", desc: "Notifications for pending verifications", checked: true },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-[rgba(255,255,255,0.06)] transition hover:bg-white/[0.05]"
            >
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-[#7C8CA3]">{item.desc}</p>
              </div>
              <Toggle checked={item.checked} />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Security */}
      <SectionCard icon={Shield} title="Security" desc="Protect your account and data">
        <div className="space-y-3">
          {[
            { label: "Two-factor authentication", desc: "Add an extra layer of security", checked: false },
            { label: "Login alerts", desc: "Get notified of new device logins", checked: true },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-[rgba(255,255,255,0.06)] transition hover:bg-white/[0.05]"
            >
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-[#7C8CA3]">{item.desc}</p>
              </div>
              <Toggle checked={item.checked} />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Account */}
      <SectionCard icon={User} title="Account" desc="Access your account or create a new one">
        <p className="text-sm text-[#7C8CA3] mb-4">
          Manage your profile and authentication.
        </p>

        <div className="flex gap-3">
          <Link to="/login?mode=signin">
            <button className="btn btn-blue min-h-[2.6rem] px-5 py-2 text-sm">
              Sign In
            </button>
          </Link>

          <Link to="/login?mode=signup">
            <button className="btn btn-ghost min-h-[2.6rem] px-5 py-2 text-sm">
              Sign Up
            </button>
          </Link>
        </div>
      </SectionCard>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="panel rounded-[26px] p-6"
      >
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="w-full flex justify-between items-center text-left"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#1E6FB8]">
              <Info className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">About MineCert Pro</h3>
              <p className="text-sm text-[#7C8CA3]">
                Learn more about MineCert Pro and its mission.
              </p>
            </div>
          </div>

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-[#FDB813]">
            {showAbout ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </button>

        {showAbout && (
          <div className="mt-6 text-[#B9C6D6] space-y-5">
            <div>
              <h4 className="font-bold text-xl text-white mb-2">
                MineCert Pro v1.0
              </h4>
              <p>
                Welcome to MineCert Pro, a premium enterprise mining training and certificate
                management platform designed for modern mining enterprises. The platform
                streamlines employee management, training, certification, verification,
                reporting, and analytics from a single centralized dashboard.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg text-white mb-2">Our Mission</h4>
              <p>
                To provide a modern, scalable, and user-friendly platform that helps mining
                organizations manage resources, training, certifications, and operations
                more effectively through technology.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg text-white mb-2">Core Features</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>Employee Management</li>
                <li>Training Program Management</li>
                <li>Certificate Generation &amp; Verification</li>
                <li>Certificate Download &amp; Sharing</li>
                <li>Operational Reports &amp; Analytics</li>
                <li>Mining Site Intelligence</li>
                <li>Shipment &amp; Logistics Tracking</li>
                <li>User Account Management</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg text-white mb-2">Future Vision</h4>
              <p>
                MineCert Pro aims to evolve into a comprehensive mining intelligence platform
                with GIS mapping, advanced reporting, real-time operational monitoring,
                multi-factor authentication, and data-driven decision-making tools for
                mining stakeholders.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
