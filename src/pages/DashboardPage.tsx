import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { mockProperties, mockActiveLeases, mockInvoices, mockBuilding } from '@/lib/mock-data';
import {
  Building2, TrendingUp, Clock, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Users, Receipt,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

const totalGLA = mockBuilding.total_gla_sqm || 15000;
const leasedGLA = mockActiveLeases.reduce((sum, l) => sum + l.gla_sqm, 0);
const occupancyRate = (leasedGLA / totalGLA) * 100;
const vacantCount = mockProperties.filter((p) => p.status === 'VACANT').length;

const totalMonthlyRent = mockActiveLeases.reduce((sum, l) => sum + l.base_rent_monthly, 0);
const totalMonthlyCharges = mockActiveLeases.reduce((sum, l) => sum + l.service_charge_monthly, 0);
const totalMonthlyRevenue = totalMonthlyRent + totalMonthlyCharges;

// WALE calculation
const waleIncome = mockActiveLeases.reduce((sum, l) => sum + l.base_rent_annual * l.remaining_years, 0) /
  Math.max(1, mockActiveLeases.reduce((sum, l) => sum + l.base_rent_annual, 0));

const overdueInvoices = mockInvoices.filter((i) => i.status === 'OVERDUE');
const totalOverdue = overdueInvoices.reduce((sum, i) => sum + (i.balance_due || 0), 0);
const collectionRate = mockInvoices.length > 0
  ? (mockInvoices.filter((i) => i.status === 'PAID').length / mockInvoices.filter((i) => i.status !== 'DRAFT').length) * 100
  : 0;

// NOI data
const noiData = {
  rental: [
    { label: 'Loyers fixes (MGR)', mtd: 45200000, ytd: 135600000 },
    { label: 'Revenue Share (au-dessus MGR)', mtd: 3450000, ytd: 8900000 },
    { label: 'Charges récupérées', mtd: 6780000, ytd: 20340000 },
    { label: 'Droits d\'entrée (étalés)', mtd: 833333, ytd: 2500000 },
  ],
  nonRental: [
    { label: 'Régie publicitaire', mtd: 4200000, ytd: 11500000 },
    { label: 'Parking', mtd: 2100000, ytd: 6200000 },
    { label: 'Locations éphémères', mtd: 1800000, ytd: 4300000 },
    { label: 'Événementiel', mtd: 950000, ytd: 2100000 },
  ],
};

const totalRentalMTD = noiData.rental.reduce((s, r) => s + r.mtd, 0);
const totalRentalYTD = noiData.rental.reduce((s, r) => s + r.ytd, 0);
const totalNonRentalMTD = noiData.nonRental.reduce((s, r) => s + r.mtd, 0);
const totalNonRentalYTD = noiData.nonRental.reduce((s, r) => s + r.ytd, 0);
const chargesNonRecup = 8200000;
const chargesNonRecupYTD = 24600000;
const noiMTD = totalRentalMTD + totalNonRentalMTD - chargesNonRecup;
const noiYTD = totalRentalYTD + totalNonRentalYTD - chargesNonRecupYTD;

// Charts data
const monthlyChart = [
  { month: 'Oct', revenue: 58200000 },
  { month: 'Nov', revenue: 61400000 },
  { month: 'Déc', revenue: 63800000 },
  { month: 'Jan', revenue: 62100000 },
  { month: 'Fév', revenue: 63500000 },
  { month: 'Mar', revenue: totalRentalMTD + totalNonRentalMTD },
];

const revenueBreakdown = [
  { name: 'Loyers', value: totalRentalMTD, color: '#171717' },
  { name: 'Pub', value: 4200000, color: '#525252' },
  { name: 'Parking', value: 2100000, color: '#a3a3a3' },
  { name: 'Éphémères', value: 1800000, color: '#d4d4d4' },
  { name: 'Événementiel', value: 950000, color: '#e5e5e5' },
];

const expiryProfile = [
  { year: '2025', count: 1, gla: 320 },
  { year: '2026', count: 2, gla: 212 },
  { year: '2027', count: 1, gla: 180 },
  { year: '2028', count: 1, gla: 250 },
  { year: '2029', count: 1, gla: 500 },
  { year: '2032', count: 1, gla: 80 },
];

export function DashboardPage() {
  return (
    <div>
      <Topbar title="Dashboard NOI" subtitle={`${mockBuilding.name} — Mars 2026`} />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* KPI Row */}
        <div className="grid grid-cols-5 gap-3">
          <StatCard
            label="Revenus bruts MTD"
            value={`${formatXOF(totalRentalMTD + totalNonRentalMTD)}`}
            subtitle="XOF"
            icon={TrendingUp}
            trend={{ value: '+3.2% vs M-1', positive: true }}
          />
          <StatCard
            label="NOI Net MTD"
            value={formatXOF(noiMTD)}
            subtitle={`Marge ${((noiMTD / (totalRentalMTD + totalNonRentalMTD)) * 100).toFixed(1)}%`}
            icon={ArrowUpRight}
          />
          <StatCard
            label="Taux d'occupation"
            value={`${occupancyRate.toFixed(1)}%`}
            subtitle={`${formatXOF(leasedGLA)} / ${formatXOF(totalGLA)} m²`}
            icon={Building2}
          />
          <StatCard
            label="WALE (revenu)"
            value={`${waleIncome.toFixed(1)} ans`}
            subtitle={`${mockActiveLeases.length} baux actifs`}
            icon={Clock}
          />
          <StatCard
            label="Impayés"
            value={formatXOF(totalOverdue)}
            subtitle={`${overdueInvoices.length} facture(s)`}
            icon={AlertTriangle}
            trend={{ value: `Taux recouvrement ${collectionRate.toFixed(0)}%`, positive: collectionRate > 80 }}
          />
        </div>

        {/* NOI Table */}
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
            <span className="text-xs font-semibold text-neutral-900">NOI Dashboard — {mockBuilding.name}</span>
            <span className="text-2xs font-mono text-neutral-400">Mars 2026 · XOF</span>
          </div>

          {/* Rental revenues */}
          <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100">
            <span className="text-2xs font-bold uppercase tracking-wide text-neutral-900">Revenus Locatifs</span>
          </div>
          {noiData.rental.map((item) => (
            <div key={item.label} className="grid grid-cols-3 px-4 py-2 border-b border-neutral-100 text-xs hover:bg-neutral-50 transition-colors">
              <span className="text-neutral-600 pl-3">{item.label}</span>
              <span className="text-right font-mono text-neutral-500">{formatXOF(item.mtd)}</span>
              <span className="text-right font-mono text-neutral-500">{formatXOF(item.ytd)}</span>
            </div>
          ))}
          <div className="grid grid-cols-3 px-4 py-2 border-b border-neutral-200 text-xs font-semibold bg-neutral-50">
            <span className="text-neutral-700">Sous-total locatif</span>
            <span className="text-right font-mono text-neutral-900">{formatXOF(totalRentalMTD)}</span>
            <span className="text-right font-mono text-neutral-900">{formatXOF(totalRentalYTD)}</span>
          </div>

          {/* Non-rental */}
          <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100">
            <span className="text-2xs font-bold uppercase tracking-wide text-neutral-900">Revenus Non-Locatifs</span>
          </div>
          {noiData.nonRental.map((item) => (
            <div key={item.label} className="grid grid-cols-3 px-4 py-2 border-b border-neutral-100 text-xs hover:bg-neutral-50 transition-colors">
              <span className="text-neutral-600 pl-3">{item.label}</span>
              <span className="text-right font-mono text-neutral-500">{formatXOF(item.mtd)}</span>
              <span className="text-right font-mono text-neutral-500">{formatXOF(item.ytd)}</span>
            </div>
          ))}
          <div className="grid grid-cols-3 px-4 py-2 border-b border-neutral-200 text-xs font-semibold bg-neutral-50">
            <span className="text-neutral-700">Sous-total non-locatif</span>
            <span className="text-right font-mono text-neutral-900">{formatXOF(totalNonRentalMTD)}</span>
            <span className="text-right font-mono text-neutral-900">{formatXOF(totalNonRentalYTD)}</span>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-3 px-4 py-2.5 border-b border-neutral-200 text-xs font-bold bg-neutral-100">
            <span className="text-neutral-900">TOTAL REVENUS BRUTS</span>
            <span className="text-right font-mono text-neutral-900">{formatXOF(totalRentalMTD + totalNonRentalMTD)}</span>
            <span className="text-right font-mono text-neutral-900">{formatXOF(totalRentalYTD + totalNonRentalYTD)}</span>
          </div>
          <div className="grid grid-cols-3 px-4 py-2 border-b border-neutral-200 text-xs text-error-600">
            <span className="pl-3">Charges non récupérables</span>
            <span className="text-right font-mono">-{formatXOF(chargesNonRecup)}</span>
            <span className="text-right font-mono">-{formatXOF(chargesNonRecupYTD)}</span>
          </div>
          <div className="grid grid-cols-3 px-4 py-3 text-xs font-bold bg-neutral-900 text-white">
            <span>NOI NET</span>
            <span className="text-right font-mono">{formatXOF(noiMTD)}</span>
            <span className="text-right font-mono">{formatXOF(noiYTD)}</span>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Revenue trend */}
          <div className="col-span-2 bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-neutral-900 mb-4">Évolution revenus bruts — 6 mois</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyChart}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#a3a3a3' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip
                  contentStyle={{ fontSize: 11, border: '1px solid #e5e5e5', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}
                  formatter={(value: number) => [`${formatXOF(value)} XOF`, 'Revenus']}
                />
                <Bar dataKey="revenue" fill="#171717" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue breakdown */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-neutral-900 mb-4">Répartition revenus MTD</h3>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={revenueBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={60}>
                  {revenueBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 10, border: '1px solid #e5e5e5', borderRadius: 6 }}
                  formatter={(value: number) => [`${formatXOF(value)} XOF`]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {revenueBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-2xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-neutral-600">{item.name}</span>
                  </div>
                  <span className="font-mono text-neutral-500">{((item.value / (totalRentalMTD + totalNonRentalMTD)) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEP + Alerts */}
        <div className="grid grid-cols-2 gap-4">
          {/* Lease Expiry Profile */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-neutral-900 mb-4">Profil d'expiration des baux (LEP)</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={expiryProfile}>
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 10, border: '1px solid #e5e5e5', borderRadius: 6 }}
                  formatter={(value: number, name: string) => [value, name === 'count' ? 'Baux' : 'm² GLA']}
                />
                <Bar dataKey="count" fill="#171717" radius={[3, 3, 0, 0]} name="Baux" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent alerts */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-neutral-900 mb-3">Alertes récentes</h3>
            <div className="space-y-2">
              {[
                { type: 'error' as const, msg: 'Facture INV-2026-0047 impayée depuis 28j — Chez Tantie', time: 'il y a 2h' },
                { type: 'warning' as const, msg: 'Option RENEWAL Canal+ expire le 28/02/2026 — J-0', time: 'il y a 4h' },
                { type: 'warning' as const, msg: 'Amendment AMD-003 en attente d\'approbation DGA — Jumia', time: 'hier' },
                { type: 'info' as const, msg: 'Facture INV-2026-0050 générée — CFAO Retail (avril)', time: 'il y a 1j' },
                { type: 'success' as const, msg: 'Paiement reçu 10 030 000 XOF — Jumia Technologies', time: 'il y a 2j' },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-md hover:bg-neutral-50 transition-colors">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    alert.type === 'error' ? 'bg-error-500' :
                    alert.type === 'warning' ? 'bg-warning-500' :
                    alert.type === 'success' ? 'bg-success-500' : 'bg-info-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-700 leading-snug">{alert.msg}</p>
                    <p className="text-2xs text-neutral-400 mt-0.5">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick metrics */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Locataires actifs" value={`${mockActiveLeases.length}`} icon={Users} />
          <StatCard label="Locaux vacants" value={`${vacantCount}`} subtitle={`${((vacantCount / mockProperties.length) * 100).toFixed(1)}% du parc`} icon={Building2} />
          <StatCard label="Revenus mensuels récurrents" value={formatXOF(totalMonthlyRevenue)} subtitle="Loyers + charges" icon={Receipt} />
          <StatCard label="Loyer moyen / m²" value={formatXOF(Math.round(totalMonthlyRent / Math.max(1, leasedGLA)))} subtitle="XOF / m² / mois" icon={ArrowUpRight} />
        </div>
      </div>
    </div>
  );
}
