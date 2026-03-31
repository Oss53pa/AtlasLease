import { Topbar } from '@/components/layout/Topbar';
import { AmendmentStatusBadge } from '@/components/ui/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { formatXOF, formatDate } from '@/lib/format';
import { mockAmendments, mockLeases, mockTenants } from '@/lib/mock-data';
import { GitBranch, Plus, ArrowRight } from 'lucide-react';

const typeLabels: Record<string, string> = {
  EXTENSION: 'Extension', EXPANSION: 'Expansion', CONTRACTION: 'Contraction',
  RENT_REVIEW: 'Révision loyer', ASSIGNMENT: 'Cession', EARLY_TERMINATION: 'Résiliation',
  OPTION_EXERCISE: 'Exercice option', RENEWAL: 'Renouvellement', ADMINISTRATIVE: 'Admin',
};

const typeColors: Record<string, string> = {
  EXTENSION: 'b-info', EXPANSION: 'b-success', CONTRACTION: 'b-warning',
  RENT_REVIEW: 'b-amber', ASSIGNMENT: 'b-purple', EARLY_TERMINATION: 'b-red',
};

export function AmendmentsPage() {
  return (
    <div>
      <Topbar title="Amendments" subtitle={`${mockAmendments.length} amendments`} />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {['ALL', 'DRAFT', 'NEGOTIATION', 'PENDING_APPROVAL', 'ACTIVE'].map((status) => (
              <button key={status} className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
                {status === 'ALL' ? 'Tous' : status.replace(/_/g, ' ').toLowerCase()}
                <span className="ml-1 text-2xs font-mono text-neutral-400">
                  {status === 'ALL' ? mockAmendments.length : mockAmendments.filter((a) => a.status === status).length}
                </span>
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Nouvel amendment
          </button>
        </div>

        {/* Amendments cards */}
        <div className="space-y-3">
          {mockAmendments.map((amd) => {
            const lease = mockLeases.find((l) => l.id === amd.lease_id);
            const tenant = lease ? mockTenants.find((t) => t.id === lease.tenant_id) : null;
            const impact = amd.financial_impact;

            return (
              <div key={amd.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <GitBranch size={18} className="text-neutral-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold text-neutral-900">{amd.amendment_number}</span>
                        <Badge variant="info">{typeLabels[amd.type] || amd.type}</Badge>
                        <AmendmentStatusBadge status={amd.status} />
                      </div>
                      <div className="text-xs text-neutral-600 mt-0.5">
                        {lease?.lease_number} — {tenant?.trade_name || tenant?.company_name}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">{amd.description}</div>

                      {/* Financial impact */}
                      {impact && (
                        <div className="mt-3 flex items-center gap-4">
                          {impact.monthly_delta !== 0 && (
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-neutral-400">Impact mensuel :</span>
                              <span className={`font-mono font-semibold ${impact.monthly_delta > 0 ? 'text-success-600' : 'text-error-600'}`}>
                                {impact.monthly_delta > 0 ? '+' : ''}{formatXOF(impact.monthly_delta)} XOF
                              </span>
                            </div>
                          )}
                          {impact.annual_delta !== 0 && (
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-neutral-400">Annuel :</span>
                              <span className={`font-mono font-semibold ${impact.annual_delta > 0 ? 'text-success-600' : 'text-error-600'}`}>
                                {impact.annual_delta > 0 ? '+' : ''}{formatXOF(impact.annual_delta)} XOF
                              </span>
                            </div>
                          )}
                          {impact.wale_delta_years && (
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-neutral-400">WALE :</span>
                              <span className="font-mono font-semibold text-info-600">
                                +{impact.wale_delta_years} ans
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Date change if applicable */}
                      {impact?.old_termination_date && impact?.new_termination_date && (
                        <div className="mt-2 flex items-center gap-2 text-xs">
                          <span className="font-mono text-neutral-400">{formatDate(impact.old_termination_date)}</span>
                          <ArrowRight size={12} className="text-neutral-300" />
                          <span className="font-mono text-neutral-900 font-semibold">{formatDate(impact.new_termination_date)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono text-neutral-400">Effective</div>
                    <div className="text-xs font-mono font-semibold">{formatDate(amd.effective_date)}</div>
                    <div className="text-2xs text-neutral-400 mt-1">v{amd.version}{amd.is_final_version ? ' (final)' : ''}</div>
                    {amd.approval_threshold_hit && (
                      <div className="mt-2">
                        <Badge variant="warning">Approbation {amd.approval_threshold_hit}</Badge>
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
