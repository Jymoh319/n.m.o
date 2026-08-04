import { useEffect, useState } from "react";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import GlassInput from "./ui/GlassInput";
import GlassBadge from "./ui/GlassBadge";
import GlassButton from "./ui/GlassButton";
import Table from "./ui/Table";

const API = "https://nmo-production.up.railway.app/api";

const statusVariant = (status) => {
  if (status === "Delivered") return "verified";
  if (status === "In Transit") return "pending";
  if (status === "Pending") return "pending";
  if (status === "Rejected") return "rejected";
  return "neutral";
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

  const columns = [
    "Shipment Code",
    "Cargo",
    "Route",
    "Quantity",
    "Vessel",
    "Shipment Date",
    "ETA",
    "Status",
    "Action",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_14px_40px_-14px_rgba(139,92,246,0.9)]">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Verification</h2>
              <p className="text-sm text-[#7C8CA3]">Verify shipments &amp; certificates in transit</p>
            </div>
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
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <Table
        columns={columns}
        data={filtered}
        searchable
        searchKeys={["shipment_code", "cargo"]}
        searchPlaceholder="Search shipments..."
        className="rounded-[26px]"
        renderCell={(shipment) => (
          <>
            <td className="cell-strong">{shipment.shipment_code}</td>
            <td>{shipment.cargo}</td>
            <td>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#7C8CA3]" />
                <span className="truncate max-w-[110px]">{shipment.origin}</span>
                <ArrowRight size={14} className="text-[#FDB813]" />
                <span className="truncate max-w-[110px]">{shipment.destination}</span>
              </div>
            </td>
            <td>{Number(shipment.quantity).toLocaleString()} tonnes</td>
            <td>{`${shipment.vehicle.vehicle_name} (${shipment.vehicle.vehicle_type})`}</td>
            <td>{shipment.shipment_date}</td>
            <td>{shipment.estimated_arrival}</td>
            <td>
              <GlassBadge
                label={shipment.status}
                variant={statusVariant(shipment.status)}
              />
            </td>
            <td>
              <GlassButton variant="purple" size="sm" icon={<ShieldCheck size={15} />}>
                Verify
              </GlassButton>
            </td>
          </>
        )}
      />
    </div>
  );
}
