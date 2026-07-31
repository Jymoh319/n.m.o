import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  FileText,
  Download,
  Search,
  Filter,
} from "lucide-react";

const API = "http://127.0.0.1:5000/api";

const statusConfig = {
  Active: {
    icon: CheckCircle,
    color:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30",
    label: "Active",
  },
  Renewal: {
    icon: Clock,
    color:
      "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30",
    label: "Renewal Due",
  },
  Pending: {
    icon: AlertCircle,
    color:
      "text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30",
    label: "Pending",
  },
  Expired: {
    icon: AlertCircle,
    color:
      "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30",
    label: "Expired",
  },
};

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${API}/certificates`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch certificates.");
        }

        return res.json();
      })
      .then((data) => {
        setCertifications(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filtered = certifications.filter((cert) => {
    const matchesSearch =
      cert.certificate_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      cert.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      cert.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });
  
  return (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search certifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <Filter size={18} className="text-slate-500" />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="renewal">Renewal Due</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {filtered.map((cert) => {
        const status =
          statusConfig[cert.status] || {
            icon: AlertCircle,
            color:
              "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700",
            label: cert.status,
          };

        const StatusIcon = status.icon;

        return (
          <div
            key={cert.certificate_id}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${status.color}`}>
                <Award size={20} />
              </div>

              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
              >
                <StatusIcon size={12} />
                {status.label}
              </span>
            </div>

            <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1">
              {cert.certificate_name}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {cert.category}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {cert.description}
            </p>

            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>Issued: {cert.issued_date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>Expires: {cert.expiry_date}</span>
              </div>

              <div className="flex items-center gap-2">
                <FileText size={14} />
                <span>Issuer: {cert.issuer}</span>
              </div>
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Download size={16} />
              Download Certificate
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
}
