import { useState } from 'react';
import { Mountain, MapPin, Layers, Ruler, Droplets, Search, Filter } from 'lucide-react';

const sources = [
  {
    id: 1,
    name: 'Sector 7B - Main Pit',
    coordinates: '-4.2831, 39.2503',
    minerals: ['Titanium', 'Zircon', 'Rutile'],
    depth: '45m',
    area: '2.4 km²',
    status: 'active',
    yield_estimate: '850 tonnes/month',
    water_table: '12m below surface',
  },
  {
    id: 2,
    name: 'Sector 3A - North Ridge',
    coordinates: '-4.2756, 39.2589',
    minerals: ['Ilmenite', 'Monazite'],
    depth: '32m',
    area: '1.8 km²',
    status: 'active',
    yield_estimate: '420 tonnes/month',
    water_table: '18m below surface',
  },
  {
    id: 3,
    name: 'Sector 5C - East Valley',
    coordinates: '-4.2902, 39.2645',
    minerals: ['Titanium', 'Rutile'],
    depth: '28m',
    area: '3.1 km²',
    status: 'exploration',
    yield_estimate: 'Projected 600 tonnes/month',
    water_table: '8m below surface',
  },
  {
    id: 4,
    name: 'Sector 9D - South Plateau',
    coordinates: '-4.2955, 39.2478',
    minerals: ['Zircon', 'Ilmenite'],
    depth: '55m',
    area: '1.2 km²',
    status: 'active',
    yield_estimate: '310 tonnes/month',
    water_table: '22m below surface',
  },
  {
    id: 5,
    name: 'Sector 3A - West Slope',
    coordinates: '-4.2801, 39.2392',
    minerals: ['Monazite', 'Titanium'],
    depth: '38m',
    area: '2.0 km²',
    status: 'maintenance',
    yield_estimate: 'Temporarily halted',
    water_table: '15m below surface',
  },
];

const statusConfig = {
  active: { color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30', label: 'Active' },
  exploration: { color: 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30', label: 'Exploration' },
  maintenance: { color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30', label: 'Maintenance' },
  depleted: { color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30', label: 'Depleted' },
};

export default function MineralSources() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = sources.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.minerals.some((m) => m.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'all' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search sources or minerals..."
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
            <option value="active">Active</option>
            <option value="exploration">Exploration</option>
            <option value="maintenance">Maintenance</option>
            <option value="depleted">Depleted</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((source) => {
          const status = statusConfig[source.status];
          return (
            <div
              key={source.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <Mountain size={20} />
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                  {status.label}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1">
                {source.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
                <MapPin size={14} />
                {source.coordinates}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Minerals Present</p>
                  <div className="flex flex-wrap gap-1.5">
                    {source.minerals.map((mineral) => (
                      <span key={mineral} className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {mineral}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Ruler size={14} className="text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-300">Depth: {source.depth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-300">Area: {source.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets size={14} className="text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-300">Water: {source.water_table}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Yield: {source.yield_estimate}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
