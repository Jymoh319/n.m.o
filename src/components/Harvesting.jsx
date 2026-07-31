import { useState } from 'react';
import { Wheat, Calendar, TrendingUp, Package, Search, Filter } from 'lucide-react';

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
  processed: { color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30', label: 'Processed' },
  processing: { color: 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30', label: 'Processing' },
  pending: { color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30', label: 'Pending' },
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <Package size={18} />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">Total Batches</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{batches.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Wheat size={18} />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">Total Harvested</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalHarvested.toLocaleString()} tonnes</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <TrendingUp size={18} />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">Avg Grade</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">88.5%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Monthly Harvest Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Month</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Titanium</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Zircon</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rutile</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ilmenite</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Monazite</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {monthlySummary.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-white">{row.month}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.titanium.toLocaleString()} t</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.zircon.toLocaleString()} t</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.rutile.toLocaleString()} t</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.ilmenite.toLocaleString()} t</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.monazite.toLocaleString()} t</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-white">
                    {(row.titanium + row.zircon + row.rutile + row.ilmenite + row.monazite).toLocaleString()} t
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
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
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Batch ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mineral</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Grade</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Method</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((batch) => {
                const status = statusConfig[batch.status];
                return (
                  <tr key={batch.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-white">{batch.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{batch.date}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{batch.mineral}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{batch.quantity}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{batch.grade}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{batch.source}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{batch.method}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
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
