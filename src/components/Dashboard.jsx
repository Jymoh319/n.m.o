import { useEffect, useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";
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
  Ship,
  Mountain,
  ClipboardList,
  Wheat,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

const API = "http://127.0.0.1:5000/api";

const chartColors = [
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#8b5cf6",
  "#14b8a6",
  "#ef4444",
  "#6366f1",
];

export default function Dashboard() {
  const { theme } = useTheme();

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
      label: "Certificates",
      value: certificates.length,
      change: "",
      trend: "up",
      icon: Award,
      color:
        "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
    },
    {
      label: "Shipments",
      value: shipments.length,
      change: "",
      trend: "up",
      icon: Ship,
      color:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Mining Sites",
      value: sites.length,
      change: "",
      trend: "up",
      icon: Mountain,
      color:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    },
    {
      label: "Site Records",
      value: records.length,
      change: "",
      trend: "up",
      icon: ClipboardList,
      color:
        "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
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

    return activity.slice(0, 5);
  }, [shipments, certificates, records]);

  return (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon =
          stat.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>

                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {stat.value}
                </p>

                <div className="flex items-center gap-1 text-xs">
                  <TrendIcon
                    size={14}
                    className={
                      stat.trend === "up"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }
                  />

                  <span
                    className={
                      stat.trend === "up"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }
                  >
                    Live
                  </span>

                  <span className="text-slate-400">
                    backend data
                  </span>
                </div>
              </div>

              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Harvest Distribution
          </h3>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            Live Database
          </span>
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
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    theme === "dark"
                      ? "#1e293b"
                      : "#fff",

                  border: `1px solid ${
                    theme === "dark"
                      ? "#334155"
                      : "#e2e8f0"
                  }`,

                  borderRadius: "8px",

                  color:
                    theme === "dark"
                      ? "#fff"
                      : "#1e293b",
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
                  <span
                    style={{
                      color:
                        theme === "dark"
                          ? "#cbd5e1"
                          : "#475569",
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Recent Activity
        </h3>

        <div className="space-y-4">
          {recentActivity.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg"
            >
              <div
                className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  item.type === "shipment"
                    ? "bg-primary-500"
                    : item.type === "certificate"
                    ? "bg-emerald-500"
                    : item.type === "record"
                    ? "bg-amber-500"
                    : "bg-slate-400"
                }`}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {item.action}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.target}
                </p>
              </div>

              <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Total Harvest Volume
        </h3>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <DollarSign
              className="text-emerald-600 dark:text-emerald-400"
              size={24}
            />
          </div>

          <div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {totalHarvest.toLocaleString()} tonnes
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Across all harvest records
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Active Shipments
        </h3>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Wheat
              className="text-primary-600 dark:text-primary-400"
              size={24}
            />
          </div>

          <div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {
                shipments.filter(
                  (shipment) =>
                    shipment.status === "In Transit"
                ).length
              }
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Shipments currently in transit
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
