import { useEffect, useState } from "react";
import {
  MapPin,
  ArrowRight,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

const API = "https://nmo-production.up.railway.app/api";

const statusConfig = {
  Delivered: {
    icon: CheckCircle,
    color:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30",
  },

  "In Transit": {
    icon: Truck,
    color:
      "text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30",
  },

  Pending: {
    icon: Clock,
    color:
      "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30",
  },
};

export default function Shipping() {
  const [shipments, setShipments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${API}/shipments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch shipments");
        return res.json();
      })
      .then((data) => setShipments(data))
      .catch(console.error);
  }, []);

  const filtered = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.shipment_code
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      shipment.cargo
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || shipment.status === filter;

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
          placeholder="Search shipments..."
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
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Statuses</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Shipment Code
              </th>

              <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Cargo
              </th>

              <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Route
              </th>

              <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Quantity
              </th>

              <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Vessel
              </th>

              <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Shipment Date
              </th>

              <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                ETA
              </th>

              <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filtered.map((shipment) => {
              const status =
                statusConfig[shipment.status] ?? statusConfig["Pending"];

              const StatusIcon = status.icon;

              return (
                <tr
                  key={shipment.shipment_id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">
                    {shipment.shipment_code}
                  </td>

                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {shipment.cargo}
                  </td>

                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-slate-400" />

                      <span className="truncate max-w-[120px]">
                        {shipment.origin}
                      </span>

                      <ArrowRight size={14} className="text-slate-400" />

                      <span className="truncate max-w-[120px]">
                        {shipment.destination}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {Number(shipment.quantity).toLocaleString()} tonnes
                  </td>

                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    `${shipment.vehicle.vehicle_name} (${shipment.vehicle.vehicle_type})`
                  </td>

                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {shipment.shipment_date}
                  </td>

                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {shipment.estimated_arrival}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                    >
                      <StatusIcon size={12} />
                      {shipment.status}
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
