import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { LeaseStatusBadge } from '@/components/ui/StatusBadge';
import { PaymentScoreBadge } from '@/components/ui/PaymentScoreBadge';
import { StatCard } from '@/components/ui/StatCard';
import { formatXOF } from '@/lib/format';
import { mockActiveLeases, mockBuilding } from '@/lib/mock-data';
import { TableProperties, Download, ArrowUpDown, TrendingUp, Clock } from 'lucide-react';
import { clsx } from 'clsx';

type SortKey = 'lease_number' | 'company_name' | 'base_rent_monthly' | 'gla_sqm' | 'remaining_years' | 'rent_per_sqm';

export function RentRollPage() {
  const [sortKey, setSortKey] = useState<SortKey>('lease_number');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = [...mockActiveLeases].sort((a, b) => {
    const va = a[sortKey];
    const vb = b[sortKey];
    if (typeof va === 'string' && typeof vb === 'string') return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    return sortAsc ? (Number(va) - Number(vb)) : (Number(vb) - Number(va));
  });

  const totalMonthly = mockActiveLeases.reduce((s, l) => s + l.total_monthly, 0);
  const totalAnnual = mockActiveLeases.reduce((s, l) => s + l.base_rent_annual, 0);
  const totalGLA = mockActiveLeases.reduce((s, l) => s + l.gla_sqm, 0);
  const waleIncome = mockActiveLeases.reduce((s, l) => s + l.base_rent_annual * l.remaining_years, 0) / Math.max(1, totalAnnual);
  const waleArea = mockActiveLeases.reduce((s, l) => s + l.gla_sqm * l.remaining_years, 0) / Math.max(1, totalGLA);
  const avgRentPerSqm = totalGLA > 0 ? Math.round(mockActiveLeases.reduce((s, l) => s + l.base_rent_monthly, 0) / totalGLA) : 0;

  const SortHeader = ({ label, k, align }: { label: string; k: SortKey; align?: string }) => (
    <th
      onClick={() => handleSort(k)}
      className={clsx('px-3 py-2.5 text-2xs font-bold uppercase tracking-wide text-neutral-500 cursor-pointer hover:text-neutral-700 select-none', align || 'text-left')}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown size={10} className={sortKey === k ? 'text-neutral-900' : 'text-neutral-300'} />
      </span>
    </th>
  );

  return (
    <div>
      <Topbar title="Rent Roll" subtitle={`${mockBuilding.name} — ${mockActiveLeases.length} baux actifs`} />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-3">
          <StatCard label="Revenus mensuels" value={formatXOF(totalMonthly)} subtitle="Loyers + charges" icon={TrendingUp} />
          <StatCard label="Revenus annuels" value={formatXOF(totalAnnual)} subtitle="Base rent uniquement" />
          <StatCard label="GLA louée" value={`${formatXOF(totalGLA)} m²`} />
          <StatCard label="WALE revenu" value={`${waleIncome.toFixed(2)} ans`} icon={Clock} />
          <StatCard label="WALE surface" value={`${waleArea.toFixed(2)} ans`} />
        </div>

        {/* Export button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 text-xs font-medium rounded-md hover:bg-neutral-50 transition-colors">
            <Download size={13} />
            Exporter Excel
          </button>
        </div>

        {/* Main table */}
        <div className="bg-white border border-neutral-200 rounded-lg overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <SortHeader label="Bail" k="lease_number" />
                <SortHeader label="Locataire" k="company_name" />
                <th className="px-3 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Local</th>
                <th className="px-3 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Zone</th>
                <SortHeader label="GLA m²" k="gla_sqm" align="text-right" />
                <SortHeader label="Loyer /mois" k="base_rent_monthly" align="text-right" />
                <th className="px-3 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Charges</th>
                <SortHeader label="Total /mois" k="base_rent_monthly" align="text-right" />
                <SortHeader label="Loyer /m²" k="rent_per_sqm" align="text-right" />
                <th className="px-3 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">vs Marché</th>
                <SortHeader label="Durée rest." k="remaining_years" align="text-right" />
                <th className="px-3 py-2.5 text-center text-2xs font-bold uppercase tracking-wide text-neutral-500">Score</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((l) => (
                <tr key={l.lease_id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="px-3 py-2 text-xs font-mono font-semibold text-neutral-900">{l.lease_number}</td>
                  <td className="px-3 py-2">
                    <div className="text-xs font-medium text-neutral-900">{l.trade_name || l.company_name}</div>
                    <div className="text-2xs text-neutral-400">{l.activity_sector}</div>
                  </td>
                  <td className="px-3 py-2 text-xs font-mono text-neutral-600">{l.property_code}</td>
                  <td className="px-3 py-2 text-2xs text-neutral-500">{l.zone}</td>
                  <td className="px-3 py-2 text-xs font-mono text-right">{formatXOF(l.gla_sqm)}</td>
                  <td className="px-3 py-2 text-xs font-mono text-right font-semibold">{formatXOF(l.base_rent_monthly)}</td>
                  <td className="px-3 py-2 text-xs font-mono text-right text-neutral-500">{formatXOF(l.service_charge_monthly)}</td>
                  <td className="px-3 py-2 text-xs font-mono text-right font-bold">{formatXOF(l.total_monthly)}</td>
                  <td className="px-3 py-2 text-xs font-mono text-right">{formatXOF(l.rent_per_sqm)}</td>
                  <td className="px-3 py-2 text-xs font-mono text-right">
                    {l.vs_market_pct !== undefined && (
                      <span className={l.vs_market_pct > 0 ? 'text-success-600' : l.vs_market_pct < -5 ? 'text-error-600' : 'text-neutral-500'}>
                        {l.vs_market_pct > 0 ? '+' : ''}{l.vs_market_pct}%
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs font-mono text-right">{l.remaining_years.toFixed(1)} ans</td>
                  <td className="px-3 py-2 text-center"><PaymentScoreBadge score={l.payment_score} /></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-neutral-900 text-white">
                <td className="px-3 py-2.5 text-xs font-bold" colSpan={4}>TOTAL ({sorted.length} baux)</td>
                <td className="px-3 py-2.5 text-xs font-mono text-right font-bold">{formatXOF(totalGLA)}</td>
                <td className="px-3 py-2.5 text-xs font-mono text-right font-bold">{formatXOF(sorted.reduce((s, l) => s + l.base_rent_monthly, 0))}</td>
                <td className="px-3 py-2.5 text-xs font-mono text-right">{formatXOF(sorted.reduce((s, l) => s + l.service_charge_monthly, 0))}</td>
                <td className="px-3 py-2.5 text-xs font-mono text-right font-bold">{formatXOF(totalMonthly)}</td>
                <td className="px-3 py-2.5 text-xs font-mono text-right">{formatXOF(avgRentPerSqm)}</td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
