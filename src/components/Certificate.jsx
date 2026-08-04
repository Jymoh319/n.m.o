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
  Plus,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import GlassBadge from "./ui/GlassBadge";
import GlassButton from "./ui/GlassButton";
import GlassInput from "./ui/GlassInput";
import Modal from "./ui/Modal";

const API = "https://nmo-production.up.railway.app/api";

const statusConfig = {
  Active: { variant: "verified", label: "Active" },
  Renewal: { variant: "pending", label: "Renewal Due" },
  Pending: { variant: "pending", label: "Pending" },
  Expired: { variant: "expired", label: "Expired" },
  Rejected: { variant: "rejected", label: "Rejected" },
  Verified: { variant: "verified", label: "Verified" },
};

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

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
      cert.certificate_name.toLowerCase().includes(search.toLowerCase()) ||
      cert.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || cert.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <GlassInput
            icon={<Search size={18} className="text-[#7C8CA3]" />}
            type="text"
            placeholder="Search certificates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#7C8CA3]" />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input w-auto min-w-[160px] px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="verified">Verified</option>
              <option value="renewal">Renewal Due</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <GlassButton variant="blue" icon={<Plus size={18} />}>
            Generate Certificate
          </GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((cert, idx) => {
          const status = statusConfig[cert.status] || {
            variant: "neutral",
            label: cert.status,
          };

          return (
            <motion.div
              key={cert.certificate_id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="premium-card rounded-[26px] p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#2196F3] shadow-[0_12px_36px_-12px_rgba(15,76,129,0.9)]">
                  <Award size={22} className="text-white" />
                </div>

                <GlassBadge label={status.label} variant={status.variant} />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {cert.certificate_name}
              </h3>

              <p className="text-sm text-[#7C8CA3] mb-3">{cert.category}</p>

              <p className="text-sm text-[#B9C6D6] mb-5 line-clamp-2">
                {cert.description}
              </p>

              <div className="space-y-2.5 text-sm text-[#B9C6D6]">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#7C8CA3]" />
                  <span>Issued: {cert.issued_date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#7C8CA3]" />
                  <span>Expires: {cert.expiry_date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FileText size={15} className="text-[#7C8CA3]" />
                  <span>Issuer: {cert.issuer}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <GlassButton variant="green" size="sm" icon={<Download size={16} />}>
                  Download
                </GlassButton>
                <GlassButton
                  variant="cyan"
                  size="sm"
                  icon={<Share2 size={16} />}
                  onClick={() => {
                    setSelectedCert(cert);
                    setShareOpen(true);
                  }}
                >
                  Share
                </GlassButton>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="lg:col-span-3 panel rounded-[26px] p-16 text-center">
            <ShieldCheck size={48} className="mx-auto text-[#7C8CA3]" />
            <p className="mt-4 text-lg font-semibold text-white">No certificates found</p>
            <p className="text-sm text-[#7C8CA3]">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <Modal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title="Share Certificate"
        footer={
          <>
            <GlassButton variant="ghost" onClick={() => setShareOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="blue">
              <CheckCircle size={16} />
              Copy Link
            </GlassButton>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-white/[0.04] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#2196F3]">
              <Award size={22} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white">{selectedCert?.certificate_name}</p>
              <p className="text-sm text-[#7C8CA3]">{selectedCert?.category}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-white/[0.04] p-4">
            <p className="text-sm font-semibold text-[#B9C6D6] mb-2">Verification link</p>
            <div className="flex items-center gap-2">
              <GlassInput
                value={`https://minecert.pro/verify/${selectedCert?.certificate_id || ""}`}
                readOnly
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
