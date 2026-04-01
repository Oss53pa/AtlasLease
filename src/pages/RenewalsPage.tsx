import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { RefreshCw, Plus, Clock, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

// ─── Renewal workflow stages ────────────────────────────────

type RenewalStage = 'ALERT' | 'ANALYSIS' | 'NEGOTIATION' | 'APPROVAL' | 'EXECUTION' | 'COMPLETED';

const STAGES: { key: RenewalStage; label: string }[] = [
  { key: 'ALERT', label: 'Alerte envoyée' },
  { key: 'ANALYSIS', label: 'Analyse (renew vs exit)' },
  { key: 'NEGOTIATION', label: 'Négociation' },
  { key: 'APPROVAL', label: 'Approbation FA/DE/DG' },
  { key: 'EXECUTION', label: 'Signature avenant' },
  { key: 'COMPLETED', label: 'Terminé' },
];

interface RenewalDossier {
  id: string;
  lease_id: string;
  tenant_name: string;
  property_code: string;
  lease_number: string;
  current_end_date: string;
  current_rent_monthly: number;
  proposed_rent_monthly: number | null;
  proposed_extension_years: number | null;
  stage: RenewalStage;
  scenario_chosen: 'RENEW' | 'RENEGOTIATE' | 'EXIT' | null;
  days_until_expiry: number;
}

// ─── Mock Data ──────────────────────────────────────────────

const mockRenewals: RenewalDossier[] = [
  { id: 'rn1', lease_id: 'l1', tenant_name: 'CFAO Retail (Carrefour)', property_code: 'LOT-RDC-001', lease_number: 'BAL-2022-001', current_end_date: '2027-03-14', current_rent_monthly: 4_500_000, proposed_rent_monthly: 4_950_000, proposed_extension_years: 5, stage: 'NEGOTIATION', scenario_chosen: 'RENEW', days_until_expiry: 348 },
  { id: 'rn2', lease_id: 'l2', tenant_name: 'Orange Store', property_code: 'LOT-RDC-002', lease_number: 'BAL-2022-002', current_end_date: '2026-12-31', current_rent_monthly: 3_600_000, proposed_rent_monthly: 3_060_000, proposed_extension_years: 5, stage: 'APPROVAL', scenario_chosen: 'RENEGOTIATE', days_until_expiry: 275 },
  { id: 'rn3', lease_id: 'l5', tenant_name: 'Canal+ Store', property_code: 'LOT-R1-002', lease_number: 'BAL-2023-005', current_end_date: '2026-09-30', current_rent_monthly: 2_400_000, proposed_rent_monthly: null, proposed_extension_years: null, stage: 'ANALYSIS', scenario_chosen: null, days_until_expiry: 183 },
  { id: 'rn4', lease_id: 'l7', tenant_name: 'Ecobank', property_code: 'LOT-R1-003', lease_number: 'BAL-2024-007', current_end_date: '2026-06-30', current_rent_monthly: 1_500_000, proposed_rent_monthly: null, proposed_extension_years: null, stage: 'ALERT', scenario_chosen: null, days_until_expiry: 91 },
];

const stageBadgeVariant: Record<RenewalStage, 'default' | 'warning' | 'info' | 'success'> = {
  ALERT: 'warning', ANALYSIS: 'default', NEGOTIATION: 'info', APPROVAL: 'info', EXECUTION: 'info', COMPLETED: 'success',
};

const scenarioLabels: Record<string, { label: string; variant: 'success' | 'warning' | 'error' }> = {
  RENEW: { label: 'Renouvellement', variant: 'success' },
  RENEGOTIATE: { label: 'Renégociation', variant: 'warning' },
  EXIT: { label: 'Sortie', variant: 'error' },
};

const urgentCount = mockRenewals.filter(r => r.days_until_expiry <= 180).length;
const inNegotiation = mockRenewals.filter(r => ['NEGOTIATION', 'APPROVAL'].includes(r.stage)).length;

// ─── Page ───────────────────────────────────────────────────

export function RenewalsPage() {
  return (
    <div>
      <Topbar title="Renouvellements" subtitle="Lease Genius — Renewal Process" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* KPI */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Dossiers en cours" value={String(mockRenewals.length)} subtitle="Renouvellements ouverts" icon={RefreshCw} />
          <StatCard label="Urgents (< 6 mois)" value={String(urgentCount)} subtitle="Échéance proche" icon={AlertTriangle} />
          <StatCard label="En négociation" value={String(inNegotiation)} subtitle="Négo + approbation" icon={Clock} />
          <StatCard label="Complétés YTD" value="3" subtitle="Depuis janvier 2026" icon={CheckCircle2} />
        </div>

        {/* Workflow steps */}
        <div className="bg-white border border-neutral-200 rounded-lg px-5 py-4">
          <div className="flex items-center justify-between">
            {STAGES.map((stage, idx) => (
              <div key={stage.key} className="flex items-center gap-2 flex-1">
                <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-2xs font-bold text-neutral-500 shrink-0">
                  {idx + 1}
                </div>
                <span className="text-2xs text-neutral-600">{stage.label}</span>
                {idx < STAGES.length - 1 && <ChevronRight size={12} className="text-neutral-300 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Renewals list */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">Dossiers de renouvellement</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Initier renouvellement
          </button>
        </div>

        <div className="space-y-2">
          {mockRenewals.map((renewal) => (
            <div key={renewal.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-neutral-900">{renewal.lease_number}</span>
                    <Badge variant={stageBadgeVariant[renewal.stage]}>{STAGES.find(s => s.key === renewal.stage)?.label}</Badge>
                    {renewal.scenario_chosen && (
                      <Badge variant={scenarioLabels[renewal.scenario_chosen].variant}>
                        {scenarioLabels[renewal.scenario_chosen].label}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-neutral-700 font-medium">{renewal.tenant_name}</div>
                  <div className="text-2xs text-neutral-500">{renewal.property_code} — Échéance : {renewal.current_end_date}</div>

                  {/* Progress bar for stage */}
                  <div className="flex items-center gap-0.5 mt-2">
                    {STAGES.map((stage, idx) => {
                      const currentIdx = STAGES.findIndex(s => s.key === renewal.stage);
                      return (
                        <div
                          key={stage.key}
                          className={clsx(
                            'h-1.5 flex-1 rounded-full',
                            idx <= currentIdx ? 'bg-neutral-900' : 'bg-neutral-200',
                          )}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="text-right shrink-0 ml-4">
                  <div className={clsx(
                    'text-xs font-mono font-bold',
                    renewal.days_until_expiry <= 90 ? 'text-error-600' : renewal.days_until_expiry <= 180 ? 'text-warning-600' : 'text-neutral-900',
                  )}>
                    {renewal.days_until_expiry}j
                  </div>
                  <div className="text-2xs text-neutral-400">avant échéance</div>
                  <div className="mt-2">
                    <div className="text-2xs text-neutral-400">Loyer actuel</div>
                    <div className="text-xs font-mono text-neutral-700">{formatXOF(renewal.current_rent_monthly)}</div>
                  </div>
                  {renewal.proposed_rent_monthly && (
                    <div className="mt-1">
                      <div className="text-2xs text-neutral-400">Proposé</div>
                      <div className={clsx(
                        'text-xs font-mono font-semibold',
                        renewal.proposed_rent_monthly > renewal.current_rent_monthly ? 'text-success-600' : 'text-warning-600',
                      )}>
                        {formatXOF(renewal.proposed_rent_monthly)}
                        <span className="text-2xs ml-1">
                          ({renewal.proposed_rent_monthly > renewal.current_rent_monthly ? '+' : ''}
                          {Math.round((renewal.proposed_rent_monthly - renewal.current_rent_monthly) / renewal.current_rent_monthly * 100)}%)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
