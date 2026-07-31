import { useEffect, useMemo, useState } from "react";
import {
  Wheat,
  TrendingUp,
  Package,
  Search,
  Filter,
} from "lucide-react";

const API = "http://127.0.0.1:5000/api";

const statusConfig = {
  Processed: {
    color:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30",
    label: "Processed",
  },
  Processing: {
    color:
      "text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30",
    label: "Processing",
  },
  Pending: {
    color:
      "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30",
    label: "Pending",
  },
};

export default function Harvesting() {
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${API}/harvest-records`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch harvest records.");
        }
        return res.json();
      })
      .then((data) => {
        setBatches(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filtered = batches.filter((batch) => {
    const matchesSearch =
      batch.batch_code.toLowerCase().includes(search.toLowerCase()) ||
      batch.mineral.mineral_name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      batch.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const totalHarvested = useMemo(() => {
    return batches.reduce(
      (total, batch) => total + Number(batch.quantity),
      0
    );
  }, [batches]);

  const averageGrade = useMemo(() => {
    if (!batches.length) return "0.0";

    const total = batches.reduce((sum, batch) => {
      return sum + parseFloat(batch.grade.replace("%", ""));
    }, 0);

    return (total / batches.length).toFixed(1);
  }, [batches]);

  const monthlySummary = useMemo(() => {
    const months = {};

    batches.forEach((batch) => {
      const month = new Date(batch.harvest_date).toLocaleString("default", {
        month: "short",
      });

      if (!months[month]) {
        months[month] = {
          month,
          Titanium: 0,
          Zircon: 0,
          Rutile: 0,
          Ilmenite: 0,
          Monazite: 0,
        };
      }

      const mineral = batch.mineral.mineral_name;

      if (months[month][mineral] !== undefined) {
        months[month][mineral] += Number(batch.quantity);
      }
    });

    return Object.values(months);
  }, [batches]);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <Package size={18} />
            </div>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Total Batches
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {batches.length}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Wheat size={18} />
            </div>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Total Harvested
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {totalHarvested.toLocaleString()} tonnes
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <TrendingUp size={18} />
            </div>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Avg Grade
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {averageGrade}%
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Monthly Harvest Summary
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Titanium</th>
                <th className="px-4 py-3">Zircon</th>
                <th className="px-4 py-3">Rutile</th>
                <th className="px-4 py-3">Ilmenite</th>
                <th className="px-4 py-3">Monazite</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>

            <tbody>
              {monthlySummary.map((row) => (
                <tr key={row.month}>
                  <td className="px-4 py-3">{row.month}</td>
                  <td className="px-4 py-3">{row.Titanium} t</td>
                  <td className="px-4 py-3">{row.Zircon} t</td>
                  <td className="px-4 py-3">{row.Rutile} t</td>
                  <td className="px-4 py-3">{row.Ilmenite} t</td>
                  <td className="px-4 py-3">{row.Monazite} t</td>
                  <td className="px-4 py-3 font-semibold">
                    {(
                      row.Titanium +
                      row.Zircon +
                      row.Rutile +
                      row.Ilmenite +
                      row.Monazite
                    ).toLocaleString()}{" "}
                    t
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search batches..."
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
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Statuses</option>
            <option value="processed">Processed</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-4 py-3">Batch ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Mineral</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((batch) => {
                const status = statusConfig[batch.status];

                return (
                  <tr key={batch.harvest_id}>
                    <td className="px-4 py-3">{batch.batch_code}</td>
                    <td className="px-4 py-3">{batch.harvest_date}</td>
                    <td className="px-4 py-3">
                      {batch.mineral.mineral_name}
                    </td>
                    <td className="px-4 py-3">
                      {Number(batch.quantity).toLocaleString()} tonnes
                    </td>
                    <td className="px-4 py-3">{batch.grade}</td>
                    <td className="px-4 py-3">
                      {batch.mining_site.site_name}
                    </td>
                    <td className="px-4 py-3">{batch.method}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
