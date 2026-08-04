import { useState } from 'react';
import { GraduationCap, TrendingUp, Package, Search, Filter, Plus, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassInput from './ui/GlassInput';
import GlassBadge from './ui/GlassBadge';
import GlassButton from './ui/GlassButton';
import StatCard from './ui/StatCard';

const batches = [
  {
    id: 'HB-2024-089',
    date: '2024-06-20',
    mineral: 'Titanium',
    quantity: '850 tonnes',
    grade: '92%',
    source: 'Sector 7B',
    method: 'Open Pit',
    status: 'processed',
  },
  {
    id: 'HB-2024-088',
    date: '2024-06-18',
    mineral: 'Zircon',
    quantity: '420 tonnes',
    grade: '88%',
    source: 'Sector 9D',
    method: 'Dredging',
    status: 'processed',
  },
  {
    id: 'HB-2024-087',
    date: '2024-06-15',
    mineral: 'Rutile',
    quantity: '310 tonnes',
    grade: '95%',
    source: 'Sector 7B',
    method: 'Open Pit',
    status: 'processed',
  },
  {
    id: 'HB-2024-086',
    date: '2024-06-12',
    mineral: 'Ilmenite',
    quantity: '680 tonnes',
    grade: '85%',
    source: 'Sector 3A',
    method: 'Dredging',
    status: 'processed',
  },
  {
    id: 'HB-2024-085',
    date: '2024-06-10',
    mineral: 'Monazite',
    quantity: '150 tonnes',
    grade: '78%',
    source: 'Sector 3A',
    method: 'Open Pit',
    status: 'processing',
  },
  {
    id: 'HB-2024-084',
    date: '2024-06-08',
    mineral: 'Titanium',
    quantity: '920 tonnes',
    grade: '93%',
    source: 'Sector 7B',
    method: 'Open Pit',
    status: 'processed',
  },
];

const monthlySummary = [
  { month: 'Jan', titanium: 2400, zircon: 1200, rutile: 800, ilmenite: 1500, monazite: 300 },
  { month: 'Feb', titanium: 2600, zircon: 1100, rutile: 900, ilmenite: 1600, monazite: 350 },
  { month: 'Mar', titanium: 2800, zircon: 1300, rutile: 850, ilmenite: 1800, monazite: 400 },
  { month: 'Apr', titanium: 2500, zircon: 1400, rutile: 950, ilmenite: 1700, monazite: 380 },
  { month: 'May', titanium: 2600, zircon: 1500, rutile: 980, ilmenite: 2100, monazite: 420 },
  { month: 'Jun', titanium: 2800, zircon: 1500, rutile: 980, ilmenite: 2100, monazite: 450 },
];

const statusConfig = {
  processed: { variant: 'verified', label: 'Processed' },
  processing: { variant: 'pending', label: 'Processing' },
  pending: { variant: 'pending', label: 'Pending' },
};

export default function Harvesting() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = batches.filter((b) => {
    const matchesSearch = b.id.toLowerCase().includes(search.toLowerCase()) || b.mineral.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalHarvested = batches.reduce((acc, b) => acc + parseInt(b.quantity), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2ECC71] to-[#1E9E58] shadow-[0_14px_40px_-14px_rgba(46,204,113,0.9)]">
            <GraduationCap size={24} className="text-[#04210f]" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Training</h2>
            <p className="text-sm text-[#7C8CA3]">Employee training programs &amp; certification pathways</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <GlassButton variant="teal" icon={<Plus size={18} />}>
            New Training
          </GlassButton>
          <GlassButton variant="navy" icon={<Download size={18} />}>
            Export
          </GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          label="Total Programs"
          value={batches.length}
          gradient="from-[#0F4C81] to-[#2196F3]"
          trendLabel="Active training"
        />
        <StatCard
          label="Employees Trained"
          value={totalHarvested}
          gradient="from-[#2ECC71] to-[#1E9E58]"
          trendLabel="Completed modules"
        />
        <StatCard
          label="Avg Completion"
          value={88}
          suffix="%"
          gradient="from-[#FDB813] to-[#FF9800]"
          trendLabel="Pass rate"
        />
      </div>

      <div className="table-wrap rounded-[26px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 pt-5 pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <div className="w-full sm:max-w-xs">
            <GlassInput
              icon={<Search size={18} className="text-[#7C8CA3]" />}
              type="text"
              placeholder="Search training programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#7C8CA3]" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input w-auto min-w-[150px] px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="processed">Processed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Program ID</th>
                <th>Date</th>
                <th>Module</th>
                <th>Duration</th>
                <th>Score</th>
                <th>Instructor</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((batch) => {
                const status = statusConfig[batch.status] || { variant: 'neutral', label: batch.status };
                return (
                  <motion.tr
                    key={batch.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/[0.04]"
                  >
                    <td className="cell-strong">{batch.id}</td>
                    <td>{batch.date}</td>
                    <td>{batch.mineral}</td>
                    <td>{batch.quantity}</td>
                    <td>{batch.grade}</td>
                    <td>{batch.source}</td>
                    <td>{batch.method}</td>
                    <td>
                      <GlassBadge label={status.label} variant={status.variant} />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="table-wrap rounded-[26px]">
        <div className="px-5 pt-5 pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <h3 className="text-lg font-bold text-white">Monthly Training Summary</h3>
          <p className="text-sm text-[#7C8CA3]">Employee completions by month</p>
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Titanium</th>
                <th>Zircon</th>
                <th>Rutile</th>
                <th>Ilmenite</th>
                <th>Monazite</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {monthlySummary.map((row) => (
                <tr key={row.month} className="hover:bg-white/[0.04]">
                  <td className="cell-strong">{row.month}</td>
                  <td>{row.titanium.toLocaleString()} t</td>
                  <td>{row.zircon.toLocaleString()} t</td>
                  <td>{row.rutile.toLocaleString()} t</td>
                  <td>{row.ilmenite.toLocaleString()} t</td>
                  <td>{row.monazite.toLocaleString()} t</td>
                  <td className="cell-strong">
                    {(row.titanium + row.zircon + row.rutile + row.ilmenite + row.monazite).toLocaleString()} t
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
