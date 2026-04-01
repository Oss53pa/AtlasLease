import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { mockTenants, mockActiveLeases, mockInvoices, mockProspects } from '@/lib/mock-data';
import {
  Brain, Zap, AlertTriangle, TrendingUp, Shield, Target,
  ArrowUpRight, ArrowDownRight, ChevronRight, Activity,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  Cell, AreaChart, Area,
} from 'recharts';

// ─── Computed scores ────────────────────────────────────────
const avgPaymentScore = Math.round(
  mockTenants.reduce((sum, t) => sum + t.payment_score, 0) / mockTenants.length,
);

const overdueInvoices = mockInvoices.filter((i) => i.status === 'OVERDUE' || i.status === 'PARTIALLY_PAID');
const totalOverdue = overdueInvoices.reduce((sum, i) => sum + (i.balance_due || 0), 0);
const totalMonthlyRevenue = mockActiveLeases.reduce((sum, l) => sum + l.total_monthly, 0);
const riskRate = totalMonthlyRevenue > 0
  ? ((totalOverdue / totalMonthlyRevenue) * 100).toFixed(1)
  : '0.0';

const occupancyPredictive = 94.2;
const activeAlerts = 6;
const prospectAvgScore = Math.round(
  mockProspects.reduce((sum, p) => sum + (p.match_score || 0), 0) / mockProspects.length,
);

// ─── Tenant scoring helpers ─────────────────────────────────
function getSolvabilite(score: number): { label: string; variant: 'success' | 'info' | 'warning' | 'error' } {
  if (score >= 95) return { label: 'A', variant: 'success' };
  if (score >= 85) return { label: 'B', variant: 'info' };
  if (score >= 70) return { label: 'C', variant: 'warning' };
  return { label: 'D', variant: 'error' };
}

function getRisque(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'Faible', color: 'text-success-600' };
  if (score >= 75) return { label: 'Moyen', color: 'text-warning-600' };
  return { label: 'Élevé', color: 'text-error-600' };
}

// ─── Revenue forecast (12 months) ───────────────────────────
const monthNames = ['Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'];
const baseRevenue = totalMonthlyRevenue;
const revenueForecasts = monthNames.map((month, i) => ({
  month,
  revenu: Math.round(baseRevenue * (1 + (i * 0.008) + (Math.sin(i * 0.5) * 0.015))),
  optimiste: Math.round(baseRevenue * (1 + (i * 0.012) + (Math.sin(i * 0.5) * 0.02))),
  pessimiste: Math.round(baseRevenue * (1 + (i * 0.003) - (Math.cos(i * 0.3) * 0.01))),
}));

// ─── AI Alerts ──────────────────────────────────────────────
const aiAlerts = [
  {
    severity: 'CRITICAL' as const,
    message: 'Risque impayé détecté — Chez Tantie : score paiement en baisse à 72, retard cumulé 28j sur INV-2026-0047',
    time: 'il y a 1h',
  },
  {
    severity: 'HIGH' as const,
    message: 'Option de renouvellement Canal+ expire le 28/02/2026 — Aucune action enregistrée, risque de vacance LOT-R1-002',
    time: 'il y a 3h',
  },
  {
    severity: 'HIGH' as const,
    message: 'Risque vacance LOT-RDC-004 : vacant depuis 58j, perte estimée 2 400 000 XOF/mois',
    time: 'il y a 5h',
  },
  {
    severity: 'MEDIUM' as const,
    message: 'Écart loyer/marché détecté — Jumia : loyer effectif 14 000 XOF/m² vs marché 14 000 XOF/m², potentiel de revalorisation nul',
    time: 'hier',
  },
  {
    severity: 'MEDIUM' as const,
    message: 'Score crédit Ecobank Services en baisse : 60 → seuil de surveillance franchi, recommandation de revue caution',
    time: 'il y a 2j',
  },
  {
    severity: 'LOW' as const,
    message: 'Opportunité renouvellement — CFAO Retail : bail expire en mars 2028, période de renégociation ouverte dans 18 mois',
    time: 'il y a 3j',
  },
];

const severityConfig = {
  CRITICAL: { bg: 'bg-error-50', border: 'border-error-200', dot: 'bg-error-500', text: 'text-error-700' },
  HIGH: { bg: 'bg-warning-50', border: 'border-warning-200', dot: 'bg-warning-500', text: 'text-warning-700' },
  MEDIUM: { bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500', text: 'text-yellow-700' },
  LOW: { bg: 'bg-info-50', border: 'border-info-200', dot: 'bg-info-500', text: 'text-info-700' },
};

// ─── Recommendations ────────────────────────────────────────
const recommendations = [
  {
    priority: 'error' as const,
    title: 'Activer le recouvrement Chez Tantie',
    description: 'Retard de 28 jours, solde impayé de 10 593 600 XOF. Déclencher mise en demeure et plan d\'apurement.',
  },
  {
    priority: 'warning' as const,
    title: 'Négocier renouvellement Canal+',
    description: 'Option de renouvellement expirée. Initier contact commercial pour sécuriser le bail avant recherche alternative.',
  },
  {
    priority: 'warning' as const,
    title: 'Commercialiser LOT-RDC-004',
    description: 'Vacant depuis 58j. Prospect Zara CI (score 92) compatible. Proposer visite prioritaire.',
  },
  {
    priority: 'info' as const,
    title: 'Réviser caution Ecobank Services',
    description: 'Score paiement à 60, sous le seuil de 70. Demander garantie bancaire complémentaire ou caution solidaire.',
  },
];

// ─── Prospect score distribution ────────────────────────────
const prospectDistribution = [
  { range: '90-100', count: mockProspects.filter((p) => (p.match_score || 0) >= 90).length, color: '#171717' },
  { range: '70-89', count: mockProspects.filter((p) => (p.match_score || 0) >= 70 && (p.match_score || 0) < 90).length, color: '#525252' },
  { range: '50-69', count: mockProspects.filter((p) => (p.match_score || 0) >= 50 && (p.match_score || 0) < 70).length, color: '#a3a3a3' },
  { range: '<50', count: mockProspects.filter((p) => (p.match_score || 0) < 50).length, color: '#d4d4d4' },
];

// ─── Advanced KPIs ──────────────────────────────────────────
const sectors = [...new Set(mockTenants.map((t) => t.activity_sector))];
const diversificationIndex = ((sectors.length / mockTenants.length) * 100).toFixed(0);

const sectorRevenues = mockActiveLeases.reduce<Record<string, number>>((acc, l) => {
  acc[l.activity_sector!] = (acc[l.activity_sector!] || 0) + l.base_rent_annual;
  return acc;
}, {});
const totalAnnualRevenue = Object.values(sectorRevenues).reduce((s, v) => s + v, 0);
const maxSectorShare = totalAnnualRevenue > 0
  ? ((Math.max(...Object.values(sectorRevenues)) / totalAnnualRevenue) * 100).toFixed(1)
  : '0.0';

const revenueAtRisk = mockActiveLeases
  .filter((l) => {
    const tenant = mockTenants.find((t) => t.id === l.tenant_id);
    return tenant && tenant.payment_score < 75;
  })
  .reduce((sum, l) => sum + l.base_rent_annual, 0);

const avgRemainingYears = mockActiveLeases.length > 0
  ? (mockActiveLeases.reduce((sum, l) => sum + l.remaining_years, 0) / mockActiveLeases.length).toFixed(1)
  : '0.0';

export function ProphetPage() {
  return (
    <div>
      <Topbar title="PROPH3T IA" subtitle="Intelligence artificielle — Scoring & Prévisions" />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* ── Stats Row ───────────────────────────────────── */}
        <div className="grid grid-cols-5 gap-3">
          <StatCard
            label="Score portfolio global"
            value={`${avgPaymentScore}/100`}
            subtitle="Moyenne pondérée locataires"
            icon={Brain}
            trend={{ value: '+2pts vs M-1', positive: true }}
          />
          <StatCard
            label="Risque impayé"
            value={`${riskRate}%`}
            subtitle={`${formatXOF(totalOverdue)} XOF exposé`}
            icon={AlertTriangle}
            trend={{ value: `${overdueInvoices.length} facture(s) en risque`, positive: false }}
          />
          <StatCard
            label="Taux prédictif occupation"
            value={`${occupancyPredictive}%`}
            subtitle="Projection 6 mois"
            icon={TrendingUp}
            trend={{ value: '+1.3% tendance', positive: true }}
          />
          <StatCard
            label="Alertes actives"
            value={`${activeAlerts}`}
            subtitle="2 critiques, 2 hautes"
            icon={Zap}
          />
          <StatCard
            label="Score prospection"
            value={`${prospectAvgScore}/100`}
            subtitle={`${mockProspects.length} prospects actifs`}
            icon={Target}
            trend={{ value: 'Pipeline qualifié', positive: true }}
          />
        </div>

        {/* ── Main Layout (2 cols + 1 col) ────────────────── */}
        <div className="grid grid-cols-3 gap-4">

          {/* ── Left column (col-span-2) ────────────────── */}
          <div className="col-span-2 space-y-4">

            {/* Scoring locataires */}
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center gap-2">
                  <Brain size={14} className="text-neutral-600" />
                  <span className="text-xs font-semibold text-neutral-900">Scoring locataires</span>
                </div>
                <span className="text-2xs font-mono text-neutral-400">Analyse temps réel · PROPH3T</span>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-12 px-4 py-2 border-b border-neutral-200 bg-neutral-50 text-2xs font-bold uppercase tracking-wide text-neutral-500">
                <span className="col-span-3">Locataire</span>
                <span className="col-span-2">Secteur</span>
                <span className="col-span-3">Score paiement</span>
                <span className="col-span-1 text-center">Solva.</span>
                <span className="col-span-2 text-center">Risque</span>
                <span className="col-span-1 text-center">Tend.</span>
              </div>

              {/* Table rows */}
              {mockTenants.map((tenant) => {
                const solva = getSolvabilite(tenant.payment_score);
                const risque = getRisque(tenant.payment_score);
                const barWidth = `${tenant.payment_score}%`;
                const barColor = tenant.payment_score >= 90
                  ? 'bg-success-500'
                  : tenant.payment_score >= 75
                    ? 'bg-warning-500'
                    : 'bg-error-500';
                const trendUp = tenant.payment_score >= 85;

                return (
                  <div
                    key={tenant.id}
                    className="grid grid-cols-12 px-4 py-2.5 border-b border-neutral-100 text-xs hover:bg-neutral-50 transition-colors items-center"
                  >
                    <div className="col-span-3">
                      <span className="font-medium text-neutral-900">{tenant.trade_name}</span>
                      <p className="text-2xs text-neutral-400">{tenant.company_name}</p>
                    </div>
                    <span className="col-span-2 text-neutral-600 text-2xs">{tenant.activity_sector}</span>
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor}`} style={{ width: barWidth }} />
                      </div>
                      <span className="font-mono text-2xs text-neutral-500 w-8 text-right">{tenant.payment_score}</span>
                    </div>
                    <div className="col-span-1 text-center">
                      <Badge variant={solva.variant}>{solva.label}</Badge>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`text-2xs font-semibold ${risque.color}`}>{risque.label}</span>
                    </div>
                    <div className="col-span-1 text-center">
                      {trendUp ? (
                        <ArrowUpRight size={14} className="inline text-success-600" />
                      ) : (
                        <ArrowDownRight size={14} className="inline text-error-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prévision revenus 12 mois */}
            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-neutral-900">Prévision revenus 12 mois</h3>
                <div className="flex items-center gap-4 text-2xs text-neutral-500">
                  <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-neutral-900 rounded" /> Base</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-success-400 rounded" /> Optimiste</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-neutral-300 rounded" /> Pessimiste</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueForecasts}>
                  <defs>
                    <linearGradient id="gradRevenu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#171717" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#a3a3a3' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, border: '1px solid #e5e5e5', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}
                    formatter={(value: unknown) => [`${formatXOF(value as number)} XOF`]}
                  />
                  <Area type="monotone" dataKey="pessimiste" stroke="#d4d4d4" fill="none" strokeDasharray="4 2" strokeWidth={1} />
                  <Area type="monotone" dataKey="revenu" stroke="#171717" fill="url(#gradRevenu)" strokeWidth={2} />
                  <Area type="monotone" dataKey="optimiste" stroke="#4ade80" fill="none" strokeDasharray="4 2" strokeWidth={1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Right column (col-span-1) ───────────────── */}
          <div className="col-span-1 space-y-4">

            {/* Alertes IA */}
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-neutral-600" />
                  <span className="text-xs font-semibold text-neutral-900">Alertes IA</span>
                </div>
                <Badge variant="error">{activeAlerts}</Badge>
              </div>
              <div className="divide-y divide-neutral-100">
                {aiAlerts.map((alert, i) => {
                  const cfg = severityConfig[alert.severity];
                  return (
                    <div key={i} className="flex items-start gap-2.5 px-4 py-3 hover:bg-neutral-50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${cfg.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-2xs font-bold uppercase tracking-wide ${cfg.text}`}>{alert.severity}</span>
                        </div>
                        <p className="text-xs text-neutral-700 leading-snug">{alert.message}</p>
                        <p className="text-2xs text-neutral-400 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-neutral-600" />
                  <span className="text-xs font-semibold text-neutral-900">Recommandations</span>
                </div>
              </div>
              <div className="divide-y divide-neutral-100">
                {recommendations.map((rec, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={rec.priority}>{rec.priority === 'error' ? 'Urgent' : rec.priority === 'warning' ? 'Important' : 'Info'}</Badge>
                      <span className="text-xs font-semibold text-neutral-900">{rec.title}</span>
                    </div>
                    <p className="text-2xs text-neutral-500 leading-relaxed">{rec.description}</p>
                    <div className="flex items-center gap-1 mt-1.5 text-2xs text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors">
                      <span>Voir détails</span>
                      <ChevronRight size={10} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Section ──────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">

          {/* Pipeline Intelligence */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-neutral-600" />
                <h3 className="text-xs font-semibold text-neutral-900">Pipeline Intelligence</h3>
              </div>
              <span className="text-2xs font-mono text-neutral-400">{mockProspects.length} prospects</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Score distribution chart */}
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={prospectDistribution}>
                  <XAxis dataKey="range" tick={{ fontSize: 9, fill: '#737373' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#a3a3a3' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 10, border: '1px solid #e5e5e5', borderRadius: 6 }}
                    formatter={(value: unknown) => [`${value} prospect(s)`, 'Nombre']}
                  />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                    {prospectDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Prospect list */}
              <div className="space-y-2">
                {mockProspects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-md bg-neutral-50">
                    <div>
                      <p className="text-xs font-medium text-neutral-900">{p.company_name}</p>
                      <p className="text-2xs text-neutral-400">{p.activity_sector}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-bold text-neutral-900">{p.match_score}</p>
                      <p className="text-2xs text-neutral-400">score</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicateurs avancés */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} className="text-neutral-600" />
              <h3 className="text-xs font-semibold text-neutral-900">Indicateurs avancés</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-50 rounded-lg p-3">
                <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Diversification index</p>
                <p className="mt-1 text-xl font-bold font-mono text-neutral-900">{diversificationIndex}%</p>
                <p className="mt-0.5 text-2xs text-neutral-400">{sectors.length} secteurs / {mockTenants.length} locataires</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3">
                <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Concentration risk</p>
                <p className="mt-1 text-xl font-bold font-mono text-neutral-900">{maxSectorShare}%</p>
                <p className="mt-0.5 text-2xs text-neutral-400">Part max. 1 secteur</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3">
                <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Revenue at risk</p>
                <p className="mt-1 text-xl font-bold font-mono text-neutral-900">{formatXOF(revenueAtRisk)}</p>
                <p className="mt-0.5 text-2xs text-neutral-400">XOF/an · score {'<'} 75</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3">
                <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Lease maturity index</p>
                <p className="mt-1 text-xl font-bold font-mono text-neutral-900">{avgRemainingYears} ans</p>
                <p className="mt-0.5 text-2xs text-neutral-400">Durée résiduelle moy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
