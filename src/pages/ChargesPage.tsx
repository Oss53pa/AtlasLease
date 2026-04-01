import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { Calculator, FileText, CheckCircle2, AlertTriangle, Plus, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

// ─── Types ──────────────────────────────────────────────────

type DistributionKey = 'SURFACE_RATIO' | 'TANTIEME' | 'EQUAL_UNIT' | 'CONTRACT_FIXED' | 'CUSTOM';
type BudgetStatus = 'DRAFT' | 'APPROVED' | 'LOCKED';
type SettlementStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'POSTED';

interface ChargeCategory {
  id: string;
  code: string;
  name: string;
  is_recoverable: boolean;
  account_code: string;
  distribution_key: DistributionKey;
}

interface ChargeBudget {
  id: string;
  category_id: string;
  fiscal_year: number;
  budget_amount: number;
  monthly_call: number;
  status: BudgetStatus;
}

interface SettlementRun {
  id: string;
  fiscal_year: number;
  run_date: string;
  status: SettlementStatus;
  total_actual: number;
  total_provisions_called: number;
  net_to_settle: number;
}

// ─── Mock Data ──────────────────────────────────────────────

const mockCategories: ChargeCategory[] = [
  { id: 'cc1', code: 'ELE', name: 'Électricité parties communes', is_recoverable: true, account_code: '6061', distribution_key: 'SURFACE_RATIO' },
  { id: 'cc2', code: 'EAU', name: 'Eau et assainissement', is_recoverable: true, account_code: '6062', distribution_key: 'SURFACE_RATIO' },
  { id: 'cc3', code: 'NET', name: 'Nettoyage parties communes', is_recoverable: true, account_code: '6152', distribution_key: 'SURFACE_RATIO' },
  { id: 'cc4', code: 'SEC', name: 'Gardiennage & sécurité', is_recoverable: true, account_code: '6156', distribution_key: 'EQUAL_UNIT' },
  { id: 'cc5', code: 'ASC', name: 'Maintenance ascenseurs', is_recoverable: true, account_code: '6155', distribution_key: 'TANTIEME' },
  { id: 'cc6', code: 'CVC', name: 'Maintenance climatisation', is_recoverable: true, account_code: '6155', distribution_key: 'SURFACE_RATIO' },
  { id: 'cc7', code: 'ASS', name: 'Assurance multirisque immeuble', is_recoverable: true, account_code: '6160', distribution_key: 'SURFACE_RATIO' },
  { id: 'cc8', code: 'ESP', name: 'Espaces verts / paysagisme', is_recoverable: true, account_code: '6153', distribution_key: 'SURFACE_RATIO' },
  { id: 'cc9', code: 'INC', name: 'Maintenance système incendie', is_recoverable: true, account_code: '6155', distribution_key: 'TANTIEME' },
  { id: 'cc10', code: 'MKT', name: 'Marketing du centre', is_recoverable: true, account_code: '6231', distribution_key: 'SURFACE_RATIO' },
];

const mockBudgets: ChargeBudget[] = [
  { id: 'cb1', category_id: 'cc1', fiscal_year: 2026, budget_amount: 48000000, monthly_call: 4000000, status: 'APPROVED' },
  { id: 'cb2', category_id: 'cc2', fiscal_year: 2026, budget_amount: 18000000, monthly_call: 1500000, status: 'APPROVED' },
  { id: 'cb3', category_id: 'cc3', fiscal_year: 2026, budget_amount: 36000000, monthly_call: 3000000, status: 'APPROVED' },
  { id: 'cb4', category_id: 'cc4', fiscal_year: 2026, budget_amount: 24000000, monthly_call: 2000000, status: 'APPROVED' },
  { id: 'cb5', category_id: 'cc5', fiscal_year: 2026, budget_amount: 12000000, monthly_call: 1000000, status: 'APPROVED' },
  { id: 'cb6', category_id: 'cc6', fiscal_year: 2026, budget_amount: 30000000, monthly_call: 2500000, status: 'APPROVED' },
  { id: 'cb7', category_id: 'cc7', fiscal_year: 2026, budget_amount: 15000000, monthly_call: 1250000, status: 'APPROVED' },
  { id: 'cb8', category_id: 'cc8', fiscal_year: 2026, budget_amount: 8000000, monthly_call: 666667, status: 'APPROVED' },
  { id: 'cb9', category_id: 'cc9', fiscal_year: 2026, budget_amount: 6000000, monthly_call: 500000, status: 'APPROVED' },
  { id: 'cb10', category_id: 'cc10', fiscal_year: 2026, budget_amount: 20000000, monthly_call: 1666667, status: 'APPROVED' },
];

const mockSettlements: SettlementRun[] = [
  { id: 'sr1', fiscal_year: 2025, run_date: '2026-03-15', status: 'COMPLETED', total_actual: 198500000, total_provisions_called: 204000000, net_to_settle: -5500000 },
  { id: 'sr2', fiscal_year: 2024, run_date: '2025-04-10', status: 'POSTED', total_actual: 185200000, total_provisions_called: 180000000, net_to_settle: 5200000 },
];

const totalBudget = mockBudgets.reduce((s, b) => s + b.budget_amount, 0);
const totalMonthly = mockBudgets.reduce((s, b) => s + b.monthly_call, 0);

const keyLabels: Record<DistributionKey, string> = {
  SURFACE_RATIO: 'Quote-part surface',
  TANTIEME: 'Tantièmes',
  EQUAL_UNIT: 'Unité égale',
  CONTRACT_FIXED: 'Forfait',
  CUSTOM: 'Personnalisée',
};

const statusVariant: Record<SettlementStatus, 'default' | 'info' | 'success' | 'warning'> = {
  PENDING: 'default',
  IN_PROGRESS: 'info',
  COMPLETED: 'success',
  POSTED: 'success',
};

// ─── Tabs ───────────────────────────────────────────────────

type TabKey = 'budget' | 'actuals' | 'settlement';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'budget', label: 'Budget prévisionnel' },
  { key: 'actuals', label: 'Charges réelles' },
  { key: 'settlement', label: 'Régularisation' },
];

// ─── Page ───────────────────────────────────────────────────

export function ChargesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('budget');

  return (
    <div>
      <Topbar title="Charges & Régularisation" subtitle="M15 — Cycle annuel provisions → régularisation" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* KPI */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Budget annuel 2026" value={formatXOF(totalBudget)} subtitle="10 catégories" icon={Calculator} />
          <StatCard label="Appel mensuel" value={formatXOF(totalMonthly)} subtitle="Provision 1/12" icon={FileText} />
          <StatCard label="Régul. 2025" value={formatXOF(Math.abs(mockSettlements[0].net_to_settle))} subtitle={mockSettlements[0].net_to_settle < 0 ? 'Avoir locataires' : 'Titre de recette'} icon={mockSettlements[0].net_to_settle < 0 ? CheckCircle2 : AlertTriangle} />
          <StatCard label="Catégories récupérables" value={`${mockCategories.filter(c => c.is_recoverable).length}/${mockCategories.length}`} subtitle="Charges récupérables" icon={Calculator} />
        </div>

        {/* Workflow étapes */}
        <div className="bg-white border border-neutral-200 rounded-lg px-5 py-4">
          <div className="flex items-center justify-between">
            {['Budget prévisionnel N', 'Provisions mensuelles 1/12', 'Saisie charges réelles', 'Clôture exercice', 'Calcul régularisation', 'Émission titres / avoirs'].map((step, idx) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className={clsx(
                  'w-6 h-6 rounded-full flex items-center justify-center text-2xs font-bold shrink-0',
                  idx <= 1 ? 'bg-neutral-900 text-white' : 'border-2 border-neutral-300 text-neutral-400',
                )}>
                  {idx + 1}
                </div>
                <span className={clsx('text-2xs', idx <= 1 ? 'font-bold text-neutral-900' : 'text-neutral-400')}>
                  {step}
                </span>
                {idx < 5 && <ChevronRight size={12} className="text-neutral-300 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-neutral-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                'px-4 py-2 text-xs font-medium border-b-2 transition-colors',
                activeTab === tab.key
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'budget' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-900">Budget prévisionnel 2026</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
                <Plus size={14} />
                Ajouter catégorie
              </button>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-neutral-500">Code</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-neutral-500">Catégorie</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-neutral-500">Clé répartition</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-neutral-500">Compte</th>
                    <th className="text-right px-4 py-2.5 font-semibold text-neutral-500">Budget annuel</th>
                    <th className="text-right px-4 py-2.5 font-semibold text-neutral-500">Appel mensuel</th>
                    <th className="text-center px-4 py-2.5 font-semibold text-neutral-500">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBudgets.map((budget) => {
                    const cat = mockCategories.find(c => c.id === budget.category_id)!;
                    return (
                      <tr key={budget.id} className="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer">
                        <td className="px-4 py-3 font-mono font-bold text-neutral-900">{cat.code}</td>
                        <td className="px-4 py-3 text-neutral-700">{cat.name}</td>
                        <td className="px-4 py-3"><Badge variant="default">{keyLabels[cat.distribution_key]}</Badge></td>
                        <td className="px-4 py-3 font-mono text-neutral-500">{cat.account_code}</td>
                        <td className="px-4 py-3 text-right font-mono font-semibold text-neutral-900">{formatXOF(budget.budget_amount)}</td>
                        <td className="px-4 py-3 text-right font-mono text-neutral-600">{formatXOF(budget.monthly_call)}</td>
                        <td className="px-4 py-3 text-center"><Badge variant="success">{budget.status}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-neutral-50 border-t border-neutral-200">
                    <td colSpan={4} className="px-4 py-2.5 font-semibold text-neutral-900">Total</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-neutral-900">{formatXOF(totalBudget)}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-neutral-900">{formatXOF(totalMonthly)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'actuals' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-900">Charges réelles — Saisie 2026</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
                <Plus size={14} />
                Saisir charge
              </button>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-8 text-center">
              <Calculator size={40} className="text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500 mb-1">Saisie des charges réelles en cours</p>
              <p className="text-xs text-neutral-400">Importer les factures fournisseurs pour alimenter les charges réelles de l'exercice 2026</p>
            </div>
          </div>
        )}

        {activeTab === 'settlement' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-900">Historique régularisations</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
                <Plus size={14} />
                Lancer régularisation
              </button>
            </div>
            <div className="space-y-3">
              {mockSettlements.map((run) => (
                <div key={run.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-900">Exercice {run.fiscal_year}</span>
                        <Badge variant={statusVariant[run.status]}>{run.status}</Badge>
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">Exécuté le {run.run_date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-neutral-500">Charges réelles</div>
                      <div className="text-sm font-mono font-bold text-neutral-900">{formatXOF(run.total_actual)} XOF</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-neutral-500">Provisions appelées</div>
                      <div className="text-sm font-mono text-neutral-700">{formatXOF(run.total_provisions_called)} XOF</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-neutral-500">Solde</div>
                      <div className={clsx(
                        'text-sm font-mono font-bold',
                        run.net_to_settle < 0 ? 'text-success-600' : 'text-error-600',
                      )}>
                        {run.net_to_settle < 0 ? '' : '+'}{formatXOF(run.net_to_settle)} XOF
                      </div>
                      <div className="text-2xs text-neutral-400">{run.net_to_settle < 0 ? 'Avoir locataires' : 'Titre de recette'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
