import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Award,
  ShieldCheck,
  GraduationCap,
  Clock,
  Download,
  FileBarChart,
  Mountain,
  Truck,
  Users,
} from "lucide-react";
import PremiumCard from "./ui/PremiumCard";
import StatCard from "./ui/StatCard";
import GlassBadge from "./ui/GlassBadge";

const API = "https://nmo-production.up.railway.app/api";

const chartColors = [
  "#FDB813",
  "#2ECC71",
  "#2196F3",
  "#0F4C81",
  "#8B5CF6",
  "#14B8A6",
  "#E53935",
  "#FF9800",
];

export default function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [sites, setSites] = useState([]);
  const [harvests, setHarvests] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/certificates`).then((r) => r.json()),
      fetch(`${API}/shipments`).then((r) => r.json()),
      fetch(`${API}/mining-sites`).then((r) => r.json()),
      fetch(`${API}/harvest-records`).then((r) => r.json()),
      fetch(`${API}/site-records`).then((r) => r.json()),
    ])
      .then(([certData, shipmentData, siteData, harvestData, recordData]) => {
        setCertificates(certData);
        setShipments(shipmentData);
        setSites(siteData);
        setHarvests(harvestData);
        setRecords(recordData);
      })
      .catch(console.error);
  }, []);

  const stats = [
    {
      label: "Employees",
      value: records.length,
      trend: "up",
      icon: Users,
      gradient: "from-[#0F4C81] to-[#2196F3]",
      trendLabel: "Site records",
    },
    {
      label: "Certificates",
      value: certificates.length,
      trend: "up",
      icon: Award,
      gradient: "from-[#FDB813] to-[#FF9800]",
      trendLabel: "Issued & verified",
    },
    {
      label: "Training",
      value: harvests.length,
      trend: "up",
      icon: GraduationCap,
      gradient: "from-[#2ECC71] to-[#1E9E58]",
      trendLabel: "Training records",
    },
    {
      label: "Pending Verification",
      value: certificates.filter(
        (c) => c.status === "Pending" || c.status === "Renewal"
      ).length,
      trend: "down",
      icon: Clock,
      gradient: "from-[#FF9800] to-[#F57C00]",
      trendLabel: "Awaiting review",
    },
    {
      label: "Downloads",
      value: shipments.length,
      trend: "up",
      icon: Download,
      gradient: "from-[#06B6D4] to-[#0891B2]",
      trendLabel: "Verified downloads",
    },
    {
      label: "Reports",
      value: sites.length,
      trend: "up",
      icon: FileBarChart,
      gradient: "from-[#4F46E5] to-[#3730A3]",
      trendLabel: "Generated reports",
    },
  ];

  const harvestData = useMemo(() => {
    const grouped = {};

    harvests.forEach((record) => {
      const mineral = record.mineral?.mineral_name ?? "Unknown";

      grouped[mineral] =
        (grouped[mineral] || 0) + Number(record.quantity || 0);
    });

    return Object.entries(grouped).map(([name, value], index) => ({
      name,
      value,
      color: chartColors[index % chartColors.length],
    }));
  }, [harvests]);

  const totalHarvest = useMemo(() => {
    return harvests.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );
  }, [harvests]);

  const recentActivity = useMemo(() => {
    const activity = [];

    shipments.forEach((shipment) => {
      activity.push({
        type: "shipment",
        action: shipment.status,
        target: shipment.shipment_code,
        time: shipment.shipment_date,
      });
    });

    certificates.forEach((certificate) => {
      activity.push({
        type: "certificate",
        action: certificate.certificate_name,
        target: certificate.status,
        time: certificate.issued_date,
      });
    });

    records.forEach((record) => {
      activity.push({
        type: "record",
        action: record.record_type,
        target: record.mining_site?.site_name,
        time: record.record_date,
      });
    });

    activity.sort((a, b) => new Date(b.time) - new Date(a.time));

    return activity.slice(0, 6);
  }, [shipments, certificates, records]);

  const statusVariant = (status) => {
    if (status === "Active" || status === "Verified") return "verified";
    if (status === "Pending" || status === "Renewal") return "pending";
    if (status === "Expired") return "expired";
    if (status === "Rejected") return "rejected";
    if (status === "In Transit") return "blue";
    return "neutral";
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 0.06} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PremiumCard className="lg:col-span-2 rounded-[26px] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">
                Training Distribution
              </h3>
              <p className="text-sm text-[#7C8CA3]">Mineral-wise production share</p>
            </div>
            <GlassBadge label="Live data" variant="gold" />
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={harvestData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {harvestData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F2238",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "14px",
                    color: "#fff",
                  }}
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString()} tonnes`,
                    name,
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: "#B9C6D6", fontSize: "13px" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </PremiumCard>

        <PremiumCard className="rounded-[26px] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Activity</h3>
              <p className="text-sm text-[#7C8CA3]">Latest operations</p>
            </div>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/[0.04] p-4 transition hover:bg-white/[0.07]"
              >
                <div className="mt-1.5 h-2 w-2 rounded-full bg-[#FDB813] flex-shrink-0 shadow-[0_0_10px_rgba(253,184,19,0.8)]" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#E5ECF5] truncate">{item.action}</p>
                  <p className="text-xs text-[#7C8CA3]">{item.target}</p>
                </div>

                <span className="text-xs text-[#7C8CA3] whitespace-nowrap">{item.time}</span>
              </div>
            ))}

            {recentActivity.length === 0 && (
              <p className="text-sm text-[#7C8CA3] py-8 text-center">
                No recent activity yet.
              </p>
            )}
          </div>
        </PremiumCard>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PremiumCard className="rounded-[26px] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FDB813] to-[#C98A00] shadow-[0_14px_40px_-14px_rgba(253,184,19,0.8)]">
              <Mountain className="text-[#1A1200]" size={26} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#7C8CA3]">
                Total Production
              </p>
              <p className="mt-1 text-2xl font-extrabold text-white">
                {totalHarvest.toLocaleString()} tonnes
              </p>
              <p className="text-sm text-[#7C8CA3]">Across all harvest records</p>
            </div>
          </div>
        </PremiumCard>

        <PremiumCard className="rounded-[26px] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2ECC71] to-[#1E9E58] shadow-[0_14px_40px_-14px_rgba(46,204,113,0.8)]">
              <Truck className="text-[#04210f]" size={26} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#7C8CA3]">
                Active Verification
              </p>
              <p className="mt-1 text-2xl font-extrabold text-white">
                {shipments.filter((shipment) => shipment.status === "In Transit").length}
              </p>
              <p className="text-sm text-[#7C8CA3]">Pending verifications in queue</p>
            </div>
          </div>
        </PremiumCard>

        <PremiumCard className="rounded-[26px] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#2196F3] shadow-[0_14px_40px_-14px_rgba(15,76,129,0.9)]">
              <Award className="text-white" size={26} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#7C8CA3]">
                Verified Certificates
              </p>
              <p className="mt-1 text-2xl font-extrabold text-white">
                {certificates.filter((c) => c.status === "Active" || c.status === "Verified").length}
              </p>
              <p className="text-sm text-[#7C8CA3]">Active &amp; verified credentials</p>
            </div>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
