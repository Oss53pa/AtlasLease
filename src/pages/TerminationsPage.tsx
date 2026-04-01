import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { Scissors, Plus, AlertTriangle, Clock, CheckCircle2, ChevronRight, Shield } from 'lucide-react';
import { clsx } from 'clsx';

// ─── Types ──────────────────────────────────────────────────

type TerminationReason = 'EXPIRY_NO_RENEWAL' | 'EARLY_BREAK' | 'DEFAULT' | 'MUTUAL_AGREEMENT' | 'FORCE_MAJEURE';
type TerminationStage = 'NOTICE' | 'NEGOTIATION' | 'EDL_SORTIE' | 'RESTITUTION_DEPOT' | 'CLOTURE' | 'COMPLETED';

interface TerminationDossier {
  id: string;
  lease_number: string;
  tenant_name: string;
  property_code: string;
  reason: TerminationReason;
  stage: TerminationStage;
  notice_date: string;
  effective_date: string;
  penalty_amount: number;
  deposit_held: number;
  deposit_to_return: number;
  retention_amount: number;
  edl_done: boolean;
  keys_returned: boolean;
  meter_readings_done: boolean;
}

// ─── Mock Data ──────────────────────────────────────────────

const STAGES: { key: TerminationStage; label: string }[] = [
  { key: 'NOTICE', label: 'Notification' },
  { key: 'NEGOTIATION', label: 'Négociation sortie' },
  { key: 'EDL_SORTIE', label: 'État des lieux' },
  { key: 'RESTITUTION_DEPOT', label: 'Restitution dépôt' },
  { key: 'CLOTURE', label: 'Clôture bail' },
  { key: 'COMPLETED', label: 'Terminé' },
];

const mockTerminations: TerminationDossier[] = [
  {
    id: 'tm1', lease_number: 'BAL-2022-004', tenant_name: 'Chez Tantie', property_code: 'LOT-RDC-003',
    reason: 'DEFAULT', stage: 'EDL_SORTIE', notice_date: '2026-02-01', effective_date: '2026-05-01',
    penalty_amount: 2_400_000, deposit_held: 4_800_000, deposit_to_return: 1_200_000, retention_amount: 3_600_000,
    edl_done: false, keys_returned: false, meter_readings_done: true,
  },
  {
    id: 'tm2', lease_number: 'BAL-2023-006', tenant_name: 'MTN Money', property_code: 'KIO-RDC-001',
    reason: 'EARLY_BREAK', stage: 'NEGOTIATION', notice_date: '2026-03-15', effective_date: '2026-06-30',
    penalty_amount: 1_500_000, deposit_held: 1_050_000, deposit_to_return: 1_050_000, retention_amount: 0,
    edl_done: false, keys_returned: false, meter_readings_done: false,
  },
  {
    id: 'tm3', lease_number: 'BAL-2024-008', tenant_name: 'Startup XYZ', property_code: 'LOT-R1-004',
    reason: 'EXPIRY_NO_RENEWAL', stage: 'RESTITUTION_DEPOT', notice_date: '2025-12-01', effective_date: '2026-03-31',
    penalty_amount: 0, deposit_held: 3_000_000, deposit_to_return: 2_500_000, retention_amount: 500_000,
    edl_done: true, keys_returned: true, meter_readings_done: true,
  },
];

const reasonLabels: Record<TerminationReason, { label: string; variant: 'error' | 'warning' | 'default' | 'info' }> = {
  EXPIRY_NO_RENEWAL: { label: 'Fin de bail', variant: 'default' },
  EARLY_BREAK: { label: 'Résiliation anticipée', variant: 'warning' },
  DEFAULT: { label: 'Défaut locataire', variant: 'error' },
  MUTUAL_AGREEMENT: { label: 'Accord amiable', variant: 'info' },
  FORCE_MAJEURE: { label: 'Force majeure', variant: 'error' },
};

const stageBadgeVariant: Record<TerminationStage, 'default' | 'warning' | 'info' | 'success'> = {
  NOTICE: 'warning', NEGOTIATION: 'info', EDL_SORTIE: 'info', RESTITUTION_DEPOT: 'warning', CLOTURE: 'info', COMPLETED: 'success',
};

const totalDepositsHeld = mockTerminations.reduce((s, t) => s + t.deposit_held, 0);
const totalPenalties = mockTerminations.reduce((s, t) => s + t.penalty_amount, 0);

// ─── Page ───────────────────────────────────────────────────

export function TerminationsPage() {
  return (
    <div>
      <Topbar title="Résiliations" subtitle="Lease Genius — Termination Process" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* KPI */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Résiliations en cours" value={String(mockTerminations.length)} subtitle="Dossiers ouverts" icon={Scissors} />
          <StatCard label="Pénalités dues" value={formatXOF(totalPenalties)} subtitle="Indemnités de résiliation" icon={AlertTriangle} />
          <StatCard label="Dépôts détenus" value={formatXOF(totalDepositsHeld)} subtitle="À restituer / retenir" icon={Shield} />
          <StatCard label="EDL à planifier" value={String(mockTerminations.filter(t => !t.edl_done).length)} subtitle="États des lieux" icon={Clock} />
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

        {/* Terminations list */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">Dossiers de résiliation</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Initier résiliation
          </button>
        </div>

        <div className="space-y-2">
          {mockTerminations.map((term) => {
            const reasonMeta = reasonLabels[term.reason];
            const currentStageIdx = STAGES.findIndex(s => s.key === term.stage);

            return (
              <div key={term.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-neutral-900">{term.lease_number}</span>
                      <Badge variant={reasonMeta.variant}>{reasonMeta.label}</Badge>
                      <Badge variant={stageBadgeVariant[term.stage]}>{STAGES.find(s => s.key === term.stage)?.label}</Badge>
                    </div>
                    <div className="text-xs text-neutral-700 font-medium">{term.tenant_name}</div>
                    <div className="text-2xs text-neutral-500">
                      {term.property_code} — Notification : {term.notice_date} — Effet : {term.effective_date}
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-0.5 mt-2">
                      {STAGES.map((stage, idx) => (
                        <div
                          key={stage.key}
                          className={clsx(
                            'h-1.5 flex-1 rounded-full',
                            idx <= currentStageIdx ? 'bg-neutral-900' : 'bg-neutral-200',
                          )}
                        />
                      ))}
                    </div>

                    {/* Checklist */}
                    <div className="flex items-center gap-4 mt-3">
                      {[
                        { label: 'EDL sortie', done: term.edl_done },
                        { label: 'Clés restituées', done: term.keys_returned },
                        { label: 'Relevés compteurs', done: term.meter_readings_done },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-1">
                          {item.done
                            ? <CheckCircle2 size={12} className="text-success-500" />
                            : <Clock size={12} className="text-neutral-300" />
                          }
                          <span className={clsx('text-2xs', item.done ? 'text-neutral-700' : 'text-neutral-400')}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-4 space-y-2">
                    {term.penalty_amount > 0 && (
                      <div>
                        <div className="text-2xs text-neutral-400">Pénalité</div>
                        <div className="text-xs font-mono font-bold text-error-600">{formatXOF(term.penalty_amount)}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-2xs text-neutral-400">Dépôt détenu</div>
                      <div className="text-xs font-mono text-neutral-700">{formatXOF(term.deposit_held)}</div>
                    </div>
                    <div>
                      <div className="text-2xs text-neutral-400">À restituer</div>
                      <div className="text-xs font-mono font-semibold text-success-600">{formatXOF(term.deposit_to_return)}</div>
                    </div>
                    {term.retention_amount > 0 && (
                      <div>
                        <div className="text-2xs text-neutral-400">Retenue</div>
                        <div className="text-xs font-mono text-warning-600">{formatXOF(term.retention_amount)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
