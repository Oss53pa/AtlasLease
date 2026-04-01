import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF, formatDate } from '@/lib/format';
import { mockTurnoverDeclarations, mockLeases, mockTenants } from '@/lib/mock-data';
import { PieChart, TrendingUp, Receipt, Calculator } from 'lucide-react';
import { clsx } from 'clsx';

const declarations = mockTurnoverDeclarations;

const totalGrossTurnover = declarations.reduce((s, d) => s + (d.gross_turnover || 0), 0);
const totalRsCalculated = declarations.reduce((s, d) => s + (d.rs_calculated || 0), 0);
const totalAdjustments = declarations.reduce((s, d) => s + (d.adjustment_amount || 0), 0);
const pendingCount = declarations.filter((d) => d.status === 'PENDING').length;

const declarationsWithRs = declarations.filter((d) => d.rs_calculated && d.net_turnover);
const avgRsRate =
  declarationsWithRs.length > 0
    ? (declarationsWithRs.reduce((s, d) => s + (d.rs_calculated! / d.net_turnover!) * 100, 0) / declarationsWithRs.length)
    : 0;

function statusBadge(status: string) {
  const map: Record<string, { label: string; variant: 'info' | 'success' | 'warning' }> = {
    DECLARED: { label: 'Déclaré', variant: 'info' },
    VALIDATED: { label: 'Validé', variant: 'success' },
    PENDING: { label: 'En attente', variant: 'warning' },
  };
  const cfg = map[status] || { label: status, variant: 'info' as const };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

export function RevenueSharePage() {
  return (
    <div>
      <Topbar title="Revenue Share" subtitle="Déclarations CA & régularisation" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard
            label="CA total déclaré"
            value={formatXOF(totalGrossTurnover)}
            subtitle="Chiffre d'affaires brut"
            icon={PieChart}
          />
          <StatCard
            label="Revenue share calculé"
            value={formatXOF(totalRsCalculated)}
            subtitle={`Taux moyen ${avgRsRate.toFixed(1)}%`}
            icon={TrendingUp}
          />
          <StatCard
            label="Régularisations"
            value={formatXOF(totalAdjustments)}
            subtitle={totalAdjustments >= 0 ? 'Complément à facturer' : 'Trop-perçu'}
            icon={Calculator}
          />
          <StatCard
            label="Déclarations en attente"
            value={String(pendingCount)}
            subtitle={`sur ${declarations.length} déclaration(s)`}
            icon={Receipt}
          />
        </div>

        {/* Declarations table */}
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Locataire</th>
                <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Période</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">CA Brut</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">CA Net</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">MGR</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">RS Calculé</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Loyer dû</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Déjà facturé</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Ajustement</th>
                <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              {declarations.map((decl) => {
                const lease = mockLeases.find((l) => l.id === decl.lease_id);
                const tenant = lease ? mockTenants.find((t) => t.id === lease.tenant_id) : null;
                const adj = decl.adjustment_amount;

                return (
                  <tr key={decl.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <td className="px-4 py-2.5">
                      <div className="text-xs text-neutral-900">{tenant?.trade_name || tenant?.company_name || '—'}</div>
                      <div className="text-2xs text-neutral-400">{lease?.lease_number}</div>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-neutral-600">
                      {formatDate(decl.period_start)} — {formatDate(decl.period_end)}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right">{formatXOF(decl.gross_turnover || 0)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right">{formatXOF(decl.net_turnover || 0)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right">{formatXOF(decl.mgr_applied || 0)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right font-semibold">
                      {decl.rs_calculated != null ? formatXOF(decl.rs_calculated) : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right">
                      {decl.rent_due != null ? formatXOF(decl.rent_due) : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right text-neutral-500">
                      {formatXOF(decl.already_invoiced || 0)}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right">
                      {adj != null ? (
                        <span
                          className={clsx(
                            'font-semibold',
                            adj > 0 && 'text-success-600',
                            adj < 0 && 'text-error-600',
                            adj === 0 && 'text-neutral-400',
                          )}
                        >
                          {adj > 0 ? '+' : ''}{formatXOF(adj)}
                        </span>
                      ) : (
                        <span className="text-neutral-400">{'—'}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">{statusBadge(decl.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary card */}
        <div className="bg-white border border-neutral-200 rounded-lg p-5">
          <h3 className="text-xs font-semibold text-neutral-900 mb-4">Synthèse Revenue Share</h3>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">CA brut total</p>
              <p className="mt-1 text-lg font-bold font-mono text-neutral-900">{formatXOF(totalGrossTurnover)}</p>
            </div>
            <div>
              <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">RS calculé total</p>
              <p className="mt-1 text-lg font-bold font-mono text-neutral-900">{formatXOF(totalRsCalculated)}</p>
            </div>
            <div>
              <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Total ajustements</p>
              <p className={clsx('mt-1 text-lg font-bold font-mono', totalAdjustments >= 0 ? 'text-success-600' : 'text-error-600')}>
                {totalAdjustments > 0 ? '+' : ''}{formatXOF(totalAdjustments)}
              </p>
            </div>
            <div>
              <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Taux RS moyen</p>
              <p className="mt-1 text-lg font-bold font-mono text-neutral-900">{avgRsRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
