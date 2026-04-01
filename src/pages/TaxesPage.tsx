import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { Landmark, Plus, FileText, CheckCircle2 } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────

type TaxType = 'CFPB' | 'VOIRIE' | 'ORDURES' | 'OTHER';

interface LocalTax {
  id: string;
  property_name: string;
  tax_type: TaxType;
  fiscal_year: number;
  total_amount: number;
  recoverable_pct: number;
  recoverable_amount: number;
  recovered_amount: number;
  payment_date: string;
  receipt_ref: string;
  distribution_key: string;
}

// ─── Mock Data ──────────────────────────────────────────────

const mockTaxes: LocalTax[] = [
  { id: 'tx1', property_name: 'Cosmos Yopougon', tax_type: 'CFPB', fiscal_year: 2026, total_amount: 45_000_000, recoverable_pct: 60, recoverable_amount: 27_000_000, recovered_amount: 18_000_000, payment_date: '2026-03-15', receipt_ref: 'DGI-CFPB-2026-4521', distribution_key: 'SURFACE_RATIO' },
  { id: 'tx2', property_name: 'Cosmos Yopougon', tax_type: 'VOIRIE', fiscal_year: 2026, total_amount: 8_500_000, recoverable_pct: 100, recoverable_amount: 8_500_000, recovered_amount: 8_500_000, payment_date: '2026-02-28', receipt_ref: 'MAIRIE-VOI-2026-182', distribution_key: 'SURFACE_RATIO' },
  { id: 'tx3', property_name: 'Cosmos Yopougon', tax_type: 'ORDURES', fiscal_year: 2026, total_amount: 3_200_000, recoverable_pct: 100, recoverable_amount: 3_200_000, recovered_amount: 2_400_000, payment_date: '2026-01-31', receipt_ref: 'MAIRIE-TOM-2026-089', distribution_key: 'EQUAL_UNIT' },
  { id: 'tx4', property_name: 'Cosmos Yopougon', tax_type: 'CFPB', fiscal_year: 2025, total_amount: 42_000_000, recoverable_pct: 60, recoverable_amount: 25_200_000, recovered_amount: 25_200_000, payment_date: '2025-03-10', receipt_ref: 'DGI-CFPB-2025-3890', distribution_key: 'SURFACE_RATIO' },
  { id: 'tx5', property_name: 'Cosmos Yopougon', tax_type: 'VOIRIE', fiscal_year: 2025, total_amount: 8_000_000, recoverable_pct: 100, recoverable_amount: 8_000_000, recovered_amount: 8_000_000, payment_date: '2025-02-20', receipt_ref: 'MAIRIE-VOI-2025-145', distribution_key: 'SURFACE_RATIO' },
];

const taxes2026 = mockTaxes.filter(t => t.fiscal_year === 2026);
const totalPaid = taxes2026.reduce((s, t) => s + t.total_amount, 0);
const totalRecoverable = taxes2026.reduce((s, t) => s + t.recoverable_amount, 0);
const totalRecovered = taxes2026.reduce((s, t) => s + t.recovered_amount, 0);

const taxTypeLabels: Record<TaxType, string> = {
  CFPB: 'Contribution Foncière (CFPB)',
  VOIRIE: 'Taxe de voirie',
  ORDURES: 'Taxe ordures ménagères',
  OTHER: 'Autre',
};

const taxTypeShort: Record<TaxType, string> = {
  CFPB: 'CFPB', VOIRIE: 'Voirie', ORDURES: 'TOM', OTHER: 'Autre',
};

// ─── Page ───────────────────────────────────────────────────

export function TaxesPage() {
  return (
    <div>
      <Topbar title="Taxes locales" subtitle="M19 — Taxes foncières récupérables — Contexte Côte d'Ivoire" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* KPI */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Taxes payées 2026" value={formatXOF(totalPaid)} subtitle={`${taxes2026.length} taxes`} icon={Landmark} />
          <StatCard label="Récupérable" value={formatXOF(totalRecoverable)} subtitle={`${Math.round(totalRecoverable / totalPaid * 100)}% du total`} icon={FileText} />
          <StatCard label="Déjà récupéré" value={formatXOF(totalRecovered)} subtitle={`${Math.round(totalRecovered / totalRecoverable * 100)}% recouvré`} icon={CheckCircle2} />
          <StatCard label="Reste à recouvrer" value={formatXOF(totalRecoverable - totalRecovered)} subtitle="Factures à émettre" icon={Landmark} />
        </div>

        {/* Taxes table */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">Taxes foncières & locales</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Déclarer taxe
          </button>
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left px-4 py-2.5 font-semibold text-neutral-500">Type</th>
                <th className="text-left px-4 py-2.5 font-semibold text-neutral-500">Exercice</th>
                <th className="text-left px-4 py-2.5 font-semibold text-neutral-500">Référence</th>
                <th className="text-right px-4 py-2.5 font-semibold text-neutral-500">Montant payé</th>
                <th className="text-center px-4 py-2.5 font-semibold text-neutral-500">% Récup.</th>
                <th className="text-right px-4 py-2.5 font-semibold text-neutral-500">Récupérable</th>
                <th className="text-right px-4 py-2.5 font-semibold text-neutral-500">Récupéré</th>
                <th className="text-center px-4 py-2.5 font-semibold text-neutral-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockTaxes.map((tax) => {
                const pct = tax.recovered_amount / tax.recoverable_amount;
                return (
                  <tr key={tax.id} className="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-neutral-900">{taxTypeShort[tax.tax_type]}</div>
                      <div className="text-2xs text-neutral-400">{taxTypeLabels[tax.tax_type]}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-neutral-700">{tax.fiscal_year}</td>
                    <td className="px-4 py-3 font-mono text-2xs text-neutral-500">{tax.receipt_ref}</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-neutral-900">{formatXOF(tax.total_amount)}</td>
                    <td className="px-4 py-3 text-center font-mono text-neutral-600">{tax.recoverable_pct}%</td>
                    <td className="px-4 py-3 text-right font-mono text-neutral-700">{formatXOF(tax.recoverable_amount)}</td>
                    <td className="px-4 py-3 text-right font-mono text-neutral-700">{formatXOF(tax.recovered_amount)}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={pct >= 1 ? 'success' : pct > 0 ? 'warning' : 'default'}>
                        {pct >= 1 ? 'Complet' : pct > 0 ? `${Math.round(pct * 100)}%` : 'En attente'}
                      </Badge>
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
