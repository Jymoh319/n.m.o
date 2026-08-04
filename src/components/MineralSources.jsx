import { useEffect, useMemo, useState } from "react";
import {
  Mountain,
  MapPin,
  Layers,
  Ruler,
  Droplets,
  BarChart3,
  Search,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import GlassBadge from "./ui/GlassBadge";
import GlassInput from "./ui/GlassInput";
import StatCard from "./ui/StatCard";

const statusVariant = (status) => {
  if (status === "Active") return "verified";
  if (status === "Exploration") return "blue";
  if (status === "Maintenance") return "pending";
  if (status === "Depleted") return "expired";
  if (status === "Rejected") return "rejected";
  return "neutral";
};

export default function MineralSources() {
  const [sources, setSources] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("https://nmo-production.up.railway.app/api/mining-sites")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch mining sites.");
        }
        return res.json();
      })
      .then((data) => {
        setSources(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filtered = sources.filter((source) => {
    const matchesSearch =
      source.site_name.toLowerCase().includes(search.toLowerCase()) ||
      source.county.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      source.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const stats = useMemo(() => {
    const active = sources.filter((s) => s.status === "Active").length;
    const totalYield = sources.reduce(
      (sum, s) => sum + Number(s.yield_estimate || 0),
      0
    );
    const counties = new Set(sources.map((s) => s.county)).size;

    return [
      {
        label: "Mining Sites",
        value: sources.length,
        gradient: "from-[#0F4C81] to-[#2196F3]",
        trendLabel: "Total sites",
      },
      {
        label: "Active Sites",
        value: active,
        gradient: "from-[#2ECC71] to-[#1E9E58]",
        trendLabel: "Currently active",
      },
      {
        label: "Est. Yields",
        value: totalYield,
        gradient: "from-[#FDB813] to-[#FF9800]",
        trendLabel: "Combined tonnes",
      },
      {
        label: "Counties",
        value: counties,
        gradient: "from-[#8B5CF6] to-[#6D28D9]",
        trendLabel: "Geographic coverage",
      },
    ];
  }, [sources]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] shadow-[0_14px_40px_-14px_rgba(79,70,229,0.9)]">
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Analytics</h2>
            <p className="text-sm text-[#7C8CA3]">Mining site intelligence &amp; analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-[#7C8CA3]" />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-auto min-w-[160px] px-3 py-2 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="exploration">Exploration</option>
            <option value="maintenance">Maintenance</option>
            <option value="depleted">Depleted</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 0.06} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((source, idx) => (
          <motion.div
            key={source.site_id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
            className="premium-card rounded-[26px] p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#1E6FB8] shadow-[0_12px_36px_-12px_rgba(15,76,129,0.9)]">
                <Mountain size={22} className="text-white" />
              </div>

              <GlassBadge
                label={source.status}
                variant={statusVariant(source.status)}
              />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{source.site_name}</h3>

            <div className="flex items-center gap-2 text-sm text-[#7C8CA3] mb-4">
              <MapPin size={14} />
              {source.latitude}, {source.longitude}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-[rgba(255,255,255,0.06)] px-3 py-2.5">
                <Ruler size={15} className="text-[#FDB813]" />
                <span className="text-[#B9C6D6]">Depth: {source.depth}</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-[rgba(255,255,255,0.06)] px-3 py-2.5">
                <Layers size={15} className="text-[#2ECC71]" />
                <span className="text-[#B9C6D6]">Area: {source.area}</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-[rgba(255,255,255,0.06)] px-3 py-2.5">
                <Droplets size={15} className="text-[#2196F3]" />
                <span className="text-[#B9C6D6]">Water: {source.water_table}</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-[rgba(255,255,255,0.06)] px-3 py-2.5">
                <MapPin size={15} className="text-[#FF9800]" />
                <span className="text-[#B9C6D6]">{source.county}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[rgba(253,184,19,0.25)] bg-gradient-to-r from-[rgba(253,184,19,0.1)] to-transparent px-4 py-3">
              <p className="text-sm font-bold text-[#FDB813]">
                Yield: {source.yield_estimate}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
