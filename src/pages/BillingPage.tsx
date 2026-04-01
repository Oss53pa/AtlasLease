import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { InvoiceStatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { formatXOF, formatDate } from '@/lib/format';
import { mockInvoices, mockLeases, mockTenants } from '@/lib/mock-data';
import { Receipt, Search, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export function BillingPage() {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const filtered = mockInvoices.filter((inv) => {
    if (statusFilter !== 'ALL' && inv.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const lease = mockLeases.find((l) => l.id === inv.lease_id);
      const tenant = lease ? mockTenants.find((t) => t.id === lease.tenant_id) : null;
      if (!inv.invoice_number.toLowerCase().includes(q) && !tenant?.company_name.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const totalIssued = mockInvoices.filter((i) => !['DRAFT', 'CANCELLED'].includes(i.status)).reduce((s, i) => s + i.total_ttc, 0);
  const totalPaid = mockInvoices.filter((i) => i.status === 'PAID').reduce((s, i) => s + i.total_ttc, 0);
  const totalOverdue = mockInvoices.filter((i) => i.status === 'OVERDUE').reduce((s, i) => s + (i.balance_due || 0), 0);
  const totalPending = mockInvoices.filter((i) => ['ISSUED', 'PARTIALLY_PAID'].includes(i.status)).reduce((s, i) => s + (i.balance_due || 0), 0);

  return (
    <div>
      <Topbar title="Facturation" subtitle="Billing Engine — Mars 2026" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Facturé TTC" value={formatXOF(totalIssued)} subtitle="Période en cours" icon={Receipt} />
          <StatCard label="Encaissé" value={formatXOF(totalPaid)} subtitle={`${((totalPaid / Math.max(1, totalIssued)) * 100).toFixed(0)}% du facturé`} icon={CheckCircle2} />
          <StatCard label="En attente" value={formatXOF(totalPending)} subtitle="Émises + partielles" icon={Clock} />
          <StatCard label="Impayés" value={formatXOF(totalOverdue)} subtitle={`${mockInvoices.filter((i) => i.status === 'OVERDUE').length} facture(s)`} icon={AlertTriangle} />
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1.5 text-xs bg-white border border-neutral-200 rounded-md focus:outline-none"
          >
            <option value="ALL">Tous statuts</option>
            <option value="DRAFT">Brouillon</option>
            <option value="ISSUED">Émise</option>
            <option value="PARTIALLY_PAID">Partiel</option>
            <option value="PAID">Payée</option>
            <option value="OVERDUE">Impayée</option>
          </select>
        </div>

        {/* Invoices table */}
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">N° Facture</th>
                <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Locataire</th>
                <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Période</th>
                <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Échéance</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">HT</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">TTC</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Payé</th>
                <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Solde</th>
                <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => {
                const lease = mockLeases.find((l) => l.id === inv.lease_id);
                const tenant = lease ? mockTenants.find((t) => t.id === lease.tenant_id) : null;
                return (
                  <tr key={inv.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <td className="px-4 py-2.5 text-xs font-mono font-semibold text-neutral-900">{inv.invoice_number}</td>
                    <td className="px-4 py-2.5">
                      <div className="text-xs text-neutral-900">{tenant?.trade_name || tenant?.company_name}</div>
                      <div className="text-2xs text-neutral-400">{lease?.lease_number}</div>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-neutral-600">{formatDate(inv.period_start)} — {formatDate(inv.period_end)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-neutral-600">{formatDate(inv.due_date)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right">{formatXOF(inv.subtotal_ht)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right font-semibold">{formatXOF(inv.total_ttc)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right text-success-600">{formatXOF(inv.amount_paid)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right">
                      <span className={inv.balance_due && inv.balance_due > 0 ? 'text-error-600 font-semibold' : 'text-neutral-400'}>
                        {formatXOF(inv.balance_due || 0)}
                      </span>
                    </td>
                    <td className="px-4 py-2.5"><InvoiceStatusBadge status={inv.status} /></td>
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
