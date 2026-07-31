import { useEffect, useState } from "react";
import {
  ClipboardList,
  Search,
  Calendar,
  User,
  MapPin,
  Pickaxe,
} from "lucide-react";

const API = "http://127.0.0.1:5000/api";

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
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {filtered.map((record) => (
        <div
          key={record.record_id}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardList
                className="text-primary-600 dark:text-primary-400"
                size={20}
              />

              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                {record.record_type}
              </h3>
            </div>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              #{record.record_id}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Calendar size={16} />
              {record.record_date}
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <User size={16} />
              {record.user.username}
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <MapPin size={16} />
              {record.mining_site.site_name}
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Pickaxe size={16} />
              {record.mineral.mineral_name}
            </div>

            {record.quantity && (
              <div className="text-slate-700 dark:text-slate-200">
                <strong>Quantity:</strong>{" "}
                {Number(record.quantity).toLocaleString()} tonnes
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {record.notes}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}