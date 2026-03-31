import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { PropertyStatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF, formatDate } from '@/lib/format';
import { mockProperties, mockBuilding, mockActiveLeases, mockTenants } from '@/lib/mock-data';
import { Building2, Search, Filter, Grid3X3, List, MapPin } from 'lucide-react';
import { clsx } from 'clsx';

type ViewMode = 'grid' | 'table';

const spaceTypeLabels: Record<string, string> = {
  RETAIL: 'Commerce', OFFICE: 'Bureau', RESTAURANT: 'Restaurant',
  STORAGE: 'Stockage', KIOSK: 'Kiosque', COMMON: 'Commun', TECHNICAL: 'Technique',
};

const floorLabels: Record<number, string> = {
  '-1': 'Sous-sol', 0: 'RDC', 1: 'Étage 1', 2: 'Étage 2', 3: 'Étage 3',
};

export function PropertiesPage() {
  const [view, setView] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const totalGLA = mockBuilding.total_gla_sqm || 15000;
  const leasedGLA = mockProperties.filter((p) => p.status === 'LEASED').reduce((s, p) => s + p.gla_sqm, 0);
  const vacantGLA = mockProperties.filter((p) => p.status === 'VACANT').reduce((s, p) => s + p.gla_sqm, 0);

  const filtered = mockProperties.filter((p) => {
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    if (search && !p.property_code.toLowerCase().includes(search.toLowerCase()) && !p.zone?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <Topbar title="Patrimoine" subtitle={`${mockBuilding.name} — ${mockProperties.length} locaux`} />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-3">
          <StatCard label="GLA Total" value={`${formatXOF(totalGLA)} m²`} icon={Building2} />
          <StatCard label="Occupé" value={`${formatXOF(leasedGLA)} m²`} subtitle={`${((leasedGLA / totalGLA) * 100).toFixed(1)}%`} />
          <StatCard label="Vacant" value={`${formatXOF(vacantGLA)} m²`} subtitle={`${mockProperties.filter((p) => p.status === 'VACANT').length} locaux`} />
          <StatCard label="Travaux" value={`${mockProperties.filter((p) => p.status === 'UNDER_WORKS').length}`} subtitle="Locaux en travaux" />
          <StatCard label="Éphémère" value={`${mockProperties.filter((p) => p.status === 'EPHEMERAL').length}`} subtitle="Location courte durée" />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un local..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1.5 text-xs bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
            >
              <option value="ALL">Tous statuts</option>
              <option value="LEASED">Loué</option>
              <option value="VACANT">Vacant</option>
              <option value="EPHEMERAL">Éphémère</option>
              <option value="UNDER_WORKS">Travaux</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setView('grid')} className={clsx('p-1.5 rounded', view === 'grid' ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:bg-neutral-100')}>
              <Grid3X3 size={14} />
            </button>
            <button onClick={() => setView('table')} className={clsx('p-1.5 rounded', view === 'table' ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:bg-neutral-100')}>
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Table view */}
        {view === 'table' && (
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Code</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Étage / Zone</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Type</th>
                  <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">GLA m²</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Statut</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Locataire</th>
                  <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Loyer marché /m²</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const lease = mockActiveLeases.find((l) => l.property_id === p.id);
                  const tenant = lease ? mockTenants.find((t) => t.id === lease.tenant_id) : null;
                  return (
                    <tr key={p.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer">
                      <td className="px-4 py-2.5 text-xs font-mono font-semibold text-neutral-900">{p.property_code}</td>
                      <td className="px-4 py-2.5">
                        <div className="text-xs text-neutral-900">{floorLabels[p.floor_number] || `N${p.floor_number}`}</div>
                        <div className="text-2xs text-neutral-400">{p.zone}</div>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-neutral-600">{spaceTypeLabels[p.space_type] || p.space_type}</td>
                      <td className="px-4 py-2.5 text-xs font-mono text-right text-neutral-900">{formatXOF(p.gla_sqm)}</td>
                      <td className="px-4 py-2.5"><PropertyStatusBadge status={p.status} /></td>
                      <td className="px-4 py-2.5 text-xs text-neutral-600">{tenant?.trade_name || tenant?.company_name || '—'}</td>
                      <td className="px-4 py-2.5 text-xs font-mono text-right text-neutral-500">{p.market_rent_sqm ? formatXOF(p.market_rent_sqm) : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Grid view */}
        {view === 'grid' && (
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((p) => {
              const lease = mockActiveLeases.find((l) => l.property_id === p.id);
              const tenant = lease ? mockTenants.find((t) => t.id === lease.tenant_id) : null;
              return (
                <div key={p.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs font-mono font-bold text-neutral-900">{p.property_code}</div>
                      <div className="text-2xs text-neutral-400">{floorLabels[p.floor_number] || `N${p.floor_number}`} · {p.zone}</div>
                    </div>
                    <PropertyStatusBadge status={p.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-2xs">
                    <div><span className="text-neutral-400">Type :</span> <span className="font-medium text-neutral-700">{spaceTypeLabels[p.space_type]}</span></div>
                    <div><span className="text-neutral-400">GLA :</span> <span className="font-mono font-medium text-neutral-700">{formatXOF(p.gla_sqm)} m²</span></div>
                  </div>
                  {tenant && (
                    <div className="mt-3 pt-2 border-t border-neutral-100 text-2xs text-neutral-600">
                      {tenant.trade_name || tenant.company_name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
