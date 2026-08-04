settings.jsx                                                                                                   import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
} from "lucide-react";

export default function Settings() {
  const [showAbout, setShowAbout] = useState(false);
  const [settings, setSettings] = useState({
  email_notifications: true,
  shipment_alerts: true,
  certification_renewals: false,
  royalty_notifications: true,
  two_factor_auth: false,
  login_alerts: true,
});

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");
  useEffect(() => {
    loadSettings();
}, []);

async function loadSettings() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://YOUR-BACKEND-URL/api/settings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setSettings(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

async function saveSettings() {
  try {
    setSaving(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://YOUR-BACKEND-URL/api/settings",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save settings");
    }

    setMessage("Settings saved successfully.");
  } catch (error) {
    setMessage("Failed to save settings.");
  } finally {
    setSaving(false);
  }
}

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Appearance */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Monitor size={20} className="text-primary-500" />
          Appearance
        </h3>

      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Bell size={20} className="text-amber-500" />
          Notifications
        </h3>

        <div className="space-y-3">
          {[
  {
    key: "email_notifications",
    label: "Email notifications",
    desc: "Receive updates via email",
  },
  {
    key: "shipment_alerts",
    label: "Shipment alerts",
    desc: "Get notified when shipments change status",
  },
  {
    key: "certification_renewals",
    label: "Certification renewals",
    desc: "Reminders before certifications expire",
  },
  {
    key: "royalty_notifications",
    label: "Royalty payments",
    desc: "Notifications for payment processing",
  },

          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  {item.label}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
   <input
  type="checkbox"
  checked={settings[item.key]}
  onChange={(e) =>
    setSettings({
      ...settings,
      [item.key]: e.target.checked,
    })
  }
  className="sr-only peer"
/>

                <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:bg-primary-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Shield size={20} className="text-emerald-500" />
          Security
        </h3>

        <div className="space-y-3">
          {[
  {
    key: "two_factor_auth",
    label: "Two-factor authentication",
    desc: "Add an extra layer of security",
  },
  {
    key: "login_alerts",
    label: "Login alerts",
    desc: "Get notified of new device logins",
  },
].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  {item.label}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
  type="checkbox"
  checked={settings[item.key]}
  onChange={(e) =>
    setSettings({
      ...settings,
      [item.key]: e.target.checked,
    })
  }
  className="sr-only peer"
/>
                <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:bg-primary-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Account */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <User size={20} className="text-blue-500" />
          Account
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Access your account or create a new one.
        </p>

        <div className="flex gap-4">
          <Link to="/login?mode=signin">
            <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </Link>

          <Link to="/login?mode=signup">
            <button className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* About N.M.O */}
<div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">

  <button
  onClick={() => setShowAbout(!showAbout)}
  className="w-full flex justify-between items-center text-left"
>
    <div className="flex items-center gap-2">
      <Info className="text-sky-500" size={20} />
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
        About N.M.O
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
  Learn more about Nairobi Mining Operation and its mission.
</p>
    </div>

    {showAbout ? <ChevronUp /> : <ChevronDown />}
  </button>

  {showAbout && (
    <div className="mt-6 text-slate-600 dark:text-slate-300 space-y-5">

      <div>
        <h4 className="font-semibold text-xl mb-2">
          Nairobi Mining Operation v0.01
        </h4>

        <p>
          Welcome to version 0.01 of Nairobi Mining Operation, a mining
          operations management platform designed to simplify the tracking and
          management of mining activities through a centralized digital system.
        </p>

        <p className="mt-3">
          The platform provides tools for monitoring mining sites, recording
          mineral extraction activities, managing certifications, tracking
          royalties, and overseeing harvesting operations.
        </p>

        <p className="mt-3">
          Built to address fragmented record keeping and operational oversight,
          N.M.O centralizes mining data into one accessible dashboard.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-lg mb-2">
          Our Mission
        </h4>

        <p>
          To provide a modern, scalable, and user-friendly platform that helps
          mining organizations manage resources, operations, and records more
          effectively through technology.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-lg mb-2">
          Core Features
        </h4>

        <ul className="list-disc ml-6 space-y-1">
          <li>Mining Site Management</li>
          <li>Mineral Resource Tracking</li>
          <li>Operational Dashboard & Analytics</li>
          <li>Harvesting and Extraction Records</li>
          <li>Certification Management</li>
          <li>Royalty Monitoring</li>
          <li>Shipment and Logistics Tracking</li>
          <li>User Account Management</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-lg mb-2">
          Future Vision
        </h4>

        <p>
          N.M.O aims to evolve into a comprehensive mining intelligence
          platform with GIS mapping, advanced reporting, real-time operational
          monitoring, multi-factor authentication, and data-driven
          decision-making tools for mining stakeholders.
        </p>
      </div>

    </div>
  )}
</div>
<button
    onClick={saveSettings}
    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
>
    Save Changes
</button>

    </div>
  );
}
