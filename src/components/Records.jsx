import { useEffect, useState } from "react";
import {
  ClipboardList,
  Search,
  Calendar,
  User,
  MapPin,
  Pickaxe,
  FileBarChart,
  Download,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import GlassInput from "./ui/GlassInput";
import GlassButton from "./ui/GlassButton";
import Table from "./ui/Table";
import GlassBadge from "./ui/GlassBadge";

const API = "https://nmo-production.up.railway.app/api";

const typeVariant = (type) => {
  const t = (type || "").toLowerCase();
  if (t.includes("extraction") || t.includes("harvest")) return "verified";
  if (t.includes("inspection") || t.includes("audit")) return "blue";
  if (t.includes("incident") || t.includes("accident")) return "rejected";
  if (t.includes("maintenance")) return "pending";
  if (t.includes("production")) return "gold";
  return "neutral";
};

export default function Records() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/site-records`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch site records.");
        }

        return res.json();
      })
      .then((data) => {
        setRecords(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filtered = records.filter((record) => {
    return (
      record.record_type
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      record.notes
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      record.mineral.mineral_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      record.mining_site.site_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const columns = [
    "#",
    "Record Type",
    "Date",
    "Employee",
    "Site",
    "Mineral",
    "Quantity",
    "Notes",
  ];

  const reportStats = [
    { label: "Total Reports", value: records.length, color: "text-[#FDB813]" },
    {
      label: "Extraction",
      value: records.filter((r) => (r.record_type || "").toLowerCase().includes("extract")).length,
      color: "text-[#2ECC71]",
    },
    {
      label: "Inspection",
      value: records.filter((r) => (r.record_type || "").toLowerCase().includes("inspect")).length,
      color: "text-[#2196F3]",
    },
    {
      label: "Incidents",
      value: records.filter((r) => (r.record_type || "").toLowerCase().includes("incident")).length,
      color: "text-[#E53935]",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] shadow-[0_14px_40px_-14px_rgba(79,70,229,0.9)]">
            <FileBarChart size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Reports</h2>
            <p className="text-sm text-[#7C8CA3]">Operational reports &amp; site records</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#7C8CA3]" />
            <select className="input w-auto min-w-[150px] px-3 py-2 text-sm">
              <option>Last 30 days</option>
              <option>Last quarter</option>
              <option>This year</option>
              <option>All time</option>
            </select>
          </div>
          <GlassButton variant="navy" icon={<Download size={18} />}>
            Export PDF
          </GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {reportStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="premium-card p-5"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[#7C8CA3]">
              {stat.label}
            </p>
            <p className={`mt-2 text-3xl font-extrabold ${stat.color}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <Table
        columns={columns}
        data={filtered}
        searchable
        searchKeys={["record_type", "notes"]}
        searchPlaceholder="Search reports..."
        renderCell={(record) => (
          <>
            <td className="cell-strong">#{record.record_id}</td>
            <td>
              <GlassBadge label={record.record_type} variant={typeVariant(record.record_type)} />
            </td>
            <td>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#7C8CA3]" />
                {record.record_date}
              </div>
            </td>
            <td>
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#7C8CA3]" />
                {record.user.username}
              </div>
            </td>
            <td>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#7C8CA3]" />
                {record.mining_site.site_name}
              </div>
            </td>
            <td>
              <div className="flex items-center gap-2">
                <Pickaxe size={14} className="text-[#7C8CA3]" />
                {record.mineral.mineral_name}
              </div>
            </td>
            <td>
              {record.quantity
                ? `${Number(record.quantity).toLocaleString()} tonnes`
                : "—"}
            </td>
            <td className="max-w-[220px]">
              <span className="line-clamp-1 text-[#B9C6D6]">{record.notes}</span>
            </td>
          </>
        )}
      />
    </div>
  );
}
