import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { InvoiceStatusBadge } from '@/components/ui/StatusBadge';
import { PaymentScoreBadge } from '@/components/ui/PaymentScoreBadge';
import { formatXOF, formatDate } from '@/lib/format';
import { mockInvoices, mockLeases, mockTenants } from '@/lib/mock-data';
import { AlertTriangle, TrendingDown, Clock, Mail } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const overdueInvoices = mockInvoices.filter((i) => i.status === 'OVERDUE' || (i.status === 'PARTIALLY_PAID' && new Date(i.due_date) < new Date()));
const totalOverdue = overdueInvoices.reduce((s, i) => s + (i.balance_due || 0), 0);

// Aging buckets
const now = new Date();
const agingBuckets = overdueInvoices.reduce((acc, inv) => {
  const days = Math.floor((now.getTime() - new Date(inv.due_date).getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 30) acc['0-30'] += inv.balance_due || 0;
  else if (days <= 60) acc['31-60'] += inv.balance_due || 0;
  else if (days <= 90) acc['61-90'] += inv.balance_due || 0;
  else acc['90+'] += inv.balance_due || 0;
  return acc;
}, { '0-30': 0, '31-60': 0, '61-90': 0, '90+': 0 } as Record<string, number>);

const agingData = [
  { bucket: '0-30j', amount: agingBuckets['0-30'], color: '#f59e0b' },
  { bucket: '31-60j', amount: agingBuckets['31-60'], color: '#ef4444' },
  { bucket: '61-90j', amount: agingBuckets['61-90'], color: '#b91c1c' },
  { bucket: '90j+', amount: agingBuckets['90+'], color: '#7f1d1d' },
];

export function RecoveryPage() {
  return (
    <div>
      <Topbar title="Recouvrement" subtitle="Suivi des impayés et relances" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Total impayés" value={formatXOF(totalOverdue)} subtitle={`${overdueInvoices.length} facture(s)`} icon={AlertTriangle} />
          <StatCard label="0-30 jours" value={formatXOF(agingBuckets['0-30'])} subtitle="Retard récent" icon={Clock} />
          <StatCard label="31-60 jours" value={formatXOF(agingBuckets['31-60'])} subtitle="Relance niveau 2" icon={Mail} />
          <StatCard label="60+ jours" value={formatXOF(agingBuckets['61-90'] + agingBuckets['90+'])} subtitle="Contentieux potentiel" icon={TrendingDown} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Aging chart */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-neutral-900 mb-4">Balance âgée (Aging)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={agingData}>
                <XAxis dataKey="bucket" tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#a3a3a3' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ fontSize: 10, border: '1px solid #e5e5e5', borderRadius: 6 }}
                  formatter={(value: number) => [`${formatXOF(value)} XOF`]}
                />
                <Bar dataKey="amount" radius={[3, 3, 0, 0]}>
                  {agingData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Overdue invoices */}
          <div className="col-span-2 bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50">
              <span className="text-xs font-semibold text-neutral-900">Factures en souffrance</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="px-4 py-2 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Facture</th>
                  <th className="px-4 py-2 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Locataire</th>
                  <th className="px-4 py-2 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Échéance</th>
                  <th className="px-4 py-2 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Solde dû</th>
                  <th className="px-4 py-2 text-center text-2xs font-bold uppercase tracking-wide text-neutral-500">Retard</th>
                  <th className="px-4 py-2 text-center text-2xs font-bold uppercase tracking-wide text-neutral-500">Relances</th>
                  <th className="px-4 py-2 text-center text-2xs font-bold uppercase tracking-wide text-neutral-500">Score</th>
                </tr>
              </thead>
              <tbody>
                {overdueInvoices.map((inv) => {
                  const lease = mockLeases.find((l) => l.id === inv.lease_id);
                  const tenant = lease ? mockTenants.find((t) => t.id === lease.tenant_id) : null;
                  const daysOverdue = Math.floor((now.getTime() - new Date(inv.due_date).getTime()) / (1000 * 60 * 60 * 24));
                  const reminders = [inv.reminder_1_sent, inv.reminder_2_sent, inv.reminder_3_sent].filter(Boolean).length;

                  return (
                    <tr key={inv.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-2.5 text-xs font-mono font-semibold text-neutral-900">{inv.invoice_number}</td>
                      <td className="px-4 py-2.5 text-xs">{tenant?.trade_name || tenant?.company_name}</td>
                      <td className="px-4 py-2.5 text-xs font-mono text-neutral-600">{formatDate(inv.due_date)}</td>
                      <td className="px-4 py-2.5 text-xs font-mono text-right font-bold text-error-600">{formatXOF(inv.balance_due || 0)}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`text-xs font-mono font-bold ${daysOverdue > 30 ? 'text-error-700' : 'text-warning-600'}`}>
                          J+{daysOverdue}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-0.5">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i <= reminders ? 'bg-warning-500' : 'bg-neutral-200'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">{tenant && <PaymentScoreBadge score={tenant.payment_score} />}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
