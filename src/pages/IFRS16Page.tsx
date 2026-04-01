import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { BarChart3, Plus, TrendingDown, Landmark, FileText } from 'lucide-react';
import { clsx } from 'clsx';

// ─── Types ──────────────────────────────────────────────────

interface LeaseInContract {
  id: string;
  contract_number: string;
  landlord_name: string;
  asset_description: string;
  asset_type: 'LAND' | 'BUILDING' | 'PARTIAL_FLOOR' | 'EQUIPMENT';
  surface_m2: number;
  start_date: string;
  end_date: string;
  base_rent_monthly: number;
  discount_rate: number;
  is_ifrs16: boolean;
  exemption_type: string | null;
  rou_asset_initial: number;
  lease_liability_initial: number;
  rou_asset_net: number;
  lease_liability_current: number;
  depreciation_monthly: number;
  status: 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
}

interface AmortizationLine {
  period_date: string;
  opening_liability: number;
  interest_charge: number;
  lease_payment: number;
  principal_repaid: number;
  closing_liability: number;
  rou_depreciation: number;
  is_posted: boolean;
}

// ─── Mock Data ──────────────────────────────────────────────

const mockLeaseIn: LeaseInContract[] = [
  {
    id: 'li1', contract_number: 'LEI-2026-0001', landlord_name: 'Société Foncière de Yopougon',
    asset_description: 'Terrain — Parcelle Cosmos Yopougon (2.5 ha)', asset_type: 'LAND',
    surface_m2: 25000, start_date: '2020-01-01', end_date: '2045-12-31',
    base_rent_monthly: 8500000, discount_rate: 0.065, is_ifrs16: true, exemption_type: null,
    rou_asset_initial: 1_428_000_000, lease_liability_initial: 1_428_000_000,
    rou_asset_net: 1_142_400_000, lease_liability_current: 1_285_200_000,
    depreciation_monthly: 4_600_000, status: 'ACTIVE',
  },
  {
    id: 'li2', contract_number: 'LEI-2026-0002', landlord_name: 'CRMC Holdings',
    asset_description: 'Bureaux administratifs — Tour Atlas, 3e étage', asset_type: 'PARTIAL_FLOOR',
    surface_m2: 450, start_date: '2024-07-01', end_date: '2030-06-30',
    base_rent_monthly: 2_200_000, discount_rate: 0.075, is_ifrs16: true, exemption_type: null,
    rou_asset_initial: 132_000_000, lease_liability_initial: 132_000_000,
    rou_asset_net: 110_000_000, lease_liability_current: 118_800_000,
    depreciation_monthly: 1_833_333, status: 'ACTIVE',
  },
  {
    id: 'li3', contract_number: 'LEI-2026-0003', landlord_name: 'Hertz CI',
    asset_description: 'Flotte véhicules — 5 Toyota Land Cruiser', asset_type: 'EQUIPMENT',
    surface_m2: 0, start_date: '2025-01-01', end_date: '2027-12-31',
    base_rent_monthly: 1_500_000, discount_rate: 0.085, is_ifrs16: true, exemption_type: null,
    rou_asset_initial: 48_000_000, lease_liability_initial: 48_000_000,
    rou_asset_net: 40_000_000, lease_liability_current: 36_000_000,
    depreciation_monthly: 1_333_333, status: 'ACTIVE',
  },
];

const mockAmortization: AmortizationLine[] = [
  { period_date: '2026-01-01', opening_liability: 1_300_000_000, interest_charge: 7_041_667, lease_payment: 8_500_000, principal_repaid: 1_458_333, closing_liability: 1_298_541_667, rou_depreciation: 4_600_000, is_posted: true },
  { period_date: '2026-02-01', opening_liability: 1_298_541_667, interest_charge: 7_033_768, lease_payment: 8_500_000, principal_repaid: 1_466_232, closing_liability: 1_297_075_435, rou_depreciation: 4_600_000, is_posted: true },
  { period_date: '2026-03-01', opening_liability: 1_297_075_435, interest_charge: 7_025_825, lease_payment: 8_500_000, principal_repaid: 1_474_175, closing_liability: 1_295_601_260, rou_depreciation: 4_600_000, is_posted: true },
  { period_date: '2026-04-01', opening_liability: 1_295_601_260, interest_charge: 7_017_840, lease_payment: 8_500_000, principal_repaid: 1_482_160, closing_liability: 1_294_119_100, rou_depreciation: 4_600_000, is_posted: false },
  { period_date: '2026-05-01', opening_liability: 1_294_119_100, interest_charge: 7_009_812, lease_payment: 8_500_000, principal_repaid: 1_490_188, closing_liability: 1_292_628_912, rou_depreciation: 4_600_000, is_posted: false },
  { period_date: '2026-06-01', opening_liability: 1_292_628_912, interest_charge: 7_001_740, lease_payment: 8_500_000, principal_repaid: 1_498_260, closing_liability: 1_291_130_652, rou_depreciation: 4_600_000, is_posted: false },
];

const totalRouNet = mockLeaseIn.reduce((s, l) => s + l.rou_asset_net, 0);
const totalLiability = mockLeaseIn.reduce((s, l) => s + l.lease_liability_current, 0);
const totalMonthlyRent = mockLeaseIn.reduce((s, l) => s + l.base_rent_monthly, 0);

const assetTypeLabels: Record<string, string> = {
  LAND: 'Terrain', BUILDING: 'Bâtiment', PARTIAL_FLOOR: 'Étage partiel', EQUIPMENT: 'Équipement',
};

// ─── Page ───────────────────────────────────────────────────

export function IFRS16Page() {
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const selected = selectedContract ? mockLeaseIn.find(l => l.id === selectedContract) : null;

  return (
    <div>
      <Topbar title="IFRS 16 — Baux entrants" subtitle="M16 — Right-of-Use Assets & Lease Liabilities" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* KPI */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="RoU Assets (net)" value={formatXOF(totalRouNet)} subtitle={`${mockLeaseIn.length} contrats actifs`} icon={BarChart3} />
          <StatCard label="Lease Liabilities" value={formatXOF(totalLiability)} subtitle="Passif total" icon={TrendingDown} />
          <StatCard label="Loyer mensuel total" value={formatXOF(totalMonthlyRent)} subtitle="Décaissements" icon={Landmark} />
          <StatCard label="Amort. mensuel RoU" value={formatXOF(mockLeaseIn.reduce((s, l) => s + l.depreciation_monthly, 0))} subtitle="Charge P&L" icon={FileText} />
        </div>

        <div className="flex gap-5">
          {/* Contracts list */}
          <div className={clsx('flex-shrink-0 transition-all', selected ? 'w-[380px]' : 'w-full')}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-neutral-900">Contrats baux entrants</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
                <Plus size={14} />
                Nouveau bail entrant
              </button>
            </div>
            <div className="space-y-2">
              {mockLeaseIn.map((contract) => (
                <div
                  key={contract.id}
                  onClick={() => setSelectedContract(contract.id)}
                  className={clsx(
                    'bg-white border rounded-lg p-4 cursor-pointer transition-colors',
                    selectedContract === contract.id ? 'border-neutral-900' : 'border-neutral-200 hover:border-neutral-300',
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-neutral-900">{contract.contract_number}</span>
                        <Badge variant="info">{assetTypeLabels[contract.asset_type]}</Badge>
                      </div>
                      <div className="text-xs text-neutral-600 mt-0.5">{contract.landlord_name}</div>
                    </div>
                    <Badge variant="success">{contract.status}</Badge>
                  </div>
                  <div className="text-xs text-neutral-500 mb-2">{contract.asset_description}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-2xs text-neutral-400">RoU Asset net</div>
                      <div className="text-xs font-mono font-semibold text-neutral-900">{formatXOF(contract.rou_asset_net)}</div>
                    </div>
                    <div>
                      <div className="text-2xs text-neutral-400">Lease Liability</div>
                      <div className="text-xs font-mono font-semibold text-neutral-900">{formatXOF(contract.lease_liability_current)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amortization schedule */}
          {selected && (
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
                  <h3 className="text-xs font-bold text-neutral-900">Tableau d'amortissement IFRS 16 — {selected.contract_number}</h3>
                  <div className="text-2xs text-neutral-500 mt-0.5">Taux d'actualisation : {(selected.discount_rate * 100).toFixed(2)}% | Durée : {selected.start_date} → {selected.end_date}</div>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="text-left px-3 py-2 font-semibold text-neutral-500">Période</th>
                      <th className="text-right px-3 py-2 font-semibold text-neutral-500">Passif ouverture</th>
                      <th className="text-right px-3 py-2 font-semibold text-neutral-500">Intérêts</th>
                      <th className="text-right px-3 py-2 font-semibold text-neutral-500">Paiement</th>
                      <th className="text-right px-3 py-2 font-semibold text-neutral-500">Capital remboursé</th>
                      <th className="text-right px-3 py-2 font-semibold text-neutral-500">Passif clôture</th>
                      <th className="text-right px-3 py-2 font-semibold text-neutral-500">Amort. RoU</th>
                      <th className="text-center px-3 py-2 font-semibold text-neutral-500">Posté</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAmortization.map((line) => (
                      <tr key={line.period_date} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="px-3 py-2.5 font-mono text-neutral-700">{line.period_date}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-neutral-600">{formatXOF(line.opening_liability)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-error-600">{formatXOF(line.interest_charge)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-neutral-900 font-semibold">{formatXOF(line.lease_payment)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-success-600">{formatXOF(line.principal_repaid)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-neutral-700">{formatXOF(line.closing_liability)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-neutral-500">{formatXOF(line.rou_depreciation)}</td>
                        <td className="px-3 py-2.5 text-center">
                          {line.is_posted
                            ? <span className="inline-block w-4 h-4 rounded-full bg-success-500 text-white text-2xs leading-4 text-center">✓</span>
                            : <span className="inline-block w-4 h-4 rounded-full border-2 border-neutral-300"></span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
