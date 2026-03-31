import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { LeaseStatusBadge } from '@/components/ui/StatusBadge';
import { PaymentScoreBadge } from '@/components/ui/PaymentScoreBadge';
import { Badge } from '@/components/ui/Badge';
import { formatXOF, formatDate } from '@/lib/format';
import { mockLeases, mockTenants, mockProperties, mockRentConditions, mockOptions, mockAmendments } from '@/lib/mock-data';
import { Search, Plus, FileText, Calendar, ArrowUpDown } from 'lucide-react';
import { clsx } from 'clsx';

const leaseTypeLabels: Record<string, string> = {
  COMMERCIAL_OHADA: 'Commercial OHADA',
  PRECAIRE: 'Précaire',
  DEROGATOIRE: 'Dérogatoire',
  SUBLEASE: 'Sous-location',
};

export function LeasesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedLease, setSelectedLease] = useState<string | null>(null);

  const filtered = mockLeases.filter((l) => {
    if (statusFilter !== 'ALL' && l.status !== statusFilter) return false;
    const tenant = mockTenants.find((t) => t.id === l.tenant_id);
    if (search) {
      const q = search.toLowerCase();
      if (!l.lease_number.toLowerCase().includes(q) &&
          !tenant?.company_name.toLowerCase().includes(q) &&
          !tenant?.trade_name?.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const selected = selectedLease ? mockLeases.find((l) => l.id === selectedLease) : null;
  const selectedTenant = selected ? mockTenants.find((t) => t.id === selected.tenant_id) : null;
  const selectedProperty = selected ? mockProperties.find((p) => p.id === selected.property_id) : null;
  const selectedConditions = selected ? mockRentConditions.filter((r) => r.lease_id === selected.id) : [];
  const selectedOptions = selected ? mockOptions.filter((o) => o.lease_id === selected.id) : [];
  const selectedAmendments = selected ? mockAmendments.filter((a) => a.lease_id === selected.id) : [];

  return (
    <div>
      <Topbar title="Contrats" subtitle={`${mockLeases.length} baux`} />

      <div className="p-6 animate-fade-in">
        <div className="flex gap-5">
          {/* List panel */}
          <div className={clsx('flex-shrink-0 transition-all', selectedLease ? 'w-[380px]' : 'w-full')}>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un bail..."
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
                  <option value="ACTIVE">Actif</option>
                  <option value="DRAFT">Brouillon</option>
                  <option value="EXPIRING">Bientôt expiré</option>
                  <option value="EXPIRED">Expiré</option>
                  <option value="TERMINATED">Résilié</option>
                </select>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
                <Plus size={14} />
                Nouveau bail
              </button>
            </div>

            {/* Leases list */}
            <div className="space-y-1.5">
              {filtered.map((lease) => {
                const tenant = mockTenants.find((t) => t.id === lease.tenant_id);
                const property = mockProperties.find((p) => p.id === lease.property_id);
                const baseRent = mockRentConditions.find((r) => r.lease_id === lease.id && r.condition_type === 'BASE_RENT');
                const isSelected = selectedLease === lease.id;

                return (
                  <div
                    key={lease.id}
                    onClick={() => setSelectedLease(isSelected ? null : lease.id)}
                    className={clsx(
                      'bg-white border rounded-lg p-3 cursor-pointer transition-all',
                      isSelected ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-200 hover:border-neutral-300',
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-neutral-900">{lease.lease_number}</span>
                          <LeaseStatusBadge status={lease.status} />
                        </div>
                        <div className="text-xs text-neutral-700 font-medium mt-0.5">
                          {tenant?.trade_name || tenant?.company_name}
                        </div>
                      </div>
                      {tenant && <PaymentScoreBadge score={tenant.payment_score} />}
                    </div>
                    <div className="flex items-center gap-3 text-2xs text-neutral-500">
                      <span>{property?.property_code}</span>
                      <span>·</span>
                      <span>{formatXOF(property?.gla_sqm || 0)} m²</span>
                      <span>·</span>
                      <span className="font-mono">{baseRent ? formatXOF(baseRent.base_amount) : '—'} /mois</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-2xs text-neutral-400">
                      <Calendar size={10} />
                      <span>{lease.commencement_date ? formatDate(lease.commencement_date) : '—'}</span>
                      <span>→</span>
                      <span>{lease.termination_date ? formatDate(lease.termination_date) : '—'}</span>
                      <span>·</span>
                      <span>{leaseTypeLabels[lease.lease_type]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          {selected && selectedTenant && selectedProperty && (
            <div className="flex-1 bg-white border border-neutral-200 rounded-lg overflow-hidden animate-slide-up">
              {/* Header */}
              <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold">{selected.lease_number}</span>
                      <LeaseStatusBadge status={selected.status} />
                      <Badge variant="default">{leaseTypeLabels[selected.lease_type]}</Badge>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {selectedTenant.trade_name || selectedTenant.company_name} — {selectedProperty.property_code}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLease(null)}
                    className="text-xs text-neutral-400 hover:text-neutral-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(100vh-200px)]">
                {/* Section A — Identité */}
                <div>
                  <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-400 mb-3">A — Identité</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div><div className="text-2xs text-neutral-400">Locataire</div><div className="text-xs font-medium">{selectedTenant.company_name}</div></div>
                    <div><div className="text-2xs text-neutral-400">Enseigne</div><div className="text-xs font-medium">{selectedTenant.trade_name || '—'}</div></div>
                    <div><div className="text-2xs text-neutral-400">Secteur</div><div className="text-xs font-medium">{selectedTenant.activity_sector || '—'}</div></div>
                    <div><div className="text-2xs text-neutral-400">Local</div><div className="text-xs font-mono font-medium">{selectedProperty.property_code}</div></div>
                    <div><div className="text-2xs text-neutral-400">Surface GLA</div><div className="text-xs font-mono font-medium">{formatXOF(selectedProperty.gla_sqm)} m²</div></div>
                    <div><div className="text-2xs text-neutral-400">Score paiement</div><div><PaymentScoreBadge score={selectedTenant.payment_score} /></div></div>
                  </div>
                </div>

                {/* Section B — Dates */}
                <div>
                  <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-400 mb-3">B — Dates</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div><div className="text-2xs text-neutral-400">Début</div><div className="text-xs font-mono">{selected.commencement_date ? formatDate(selected.commencement_date) : '—'}</div></div>
                    <div><div className="text-2xs text-neutral-400">Fin</div><div className="text-xs font-mono">{selected.termination_date ? formatDate(selected.termination_date) : '—'}</div></div>
                    <div><div className="text-2xs text-neutral-400">Durée</div><div className="text-xs font-mono">{selected.duration_months} mois</div></div>
                  </div>
                </div>

                {/* Section C — Conditions financières */}
                <div>
                  <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-400 mb-3">C — Conditions financières</h4>
                  <div className="border border-neutral-200 rounded-lg overflow-hidden">
                    {selectedConditions.map((rc) => (
                      <div key={rc.id} className="flex items-center justify-between px-3 py-2 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50">
                        <div>
                          <div className="text-xs font-medium text-neutral-900">{rc.label}</div>
                          <div className="text-2xs text-neutral-400">
                            {rc.escalation_type !== 'NONE' && (
                              <span>Escalation: {rc.escalation_type} {rc.escalation_rate ? `(${(rc.escalation_rate * 100).toFixed(0)}%)` : ''}</span>
                            )}
                            {rc.mgr_amount && <span>MGR + {((rc.rs_rate || 0) * 100).toFixed(0)}% CA</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-bold text-neutral-900">{formatXOF(rc.base_amount)}</div>
                          <div className="text-2xs text-neutral-400 font-mono">{rc.syscohada_account}</div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-3 py-2 bg-neutral-50 font-semibold">
                      <span className="text-xs">Total mensuel HT</span>
                      <span className="text-xs font-mono">{formatXOF(selectedConditions.reduce((s, r) => s + r.base_amount, 0))} XOF</span>
                    </div>
                  </div>
                </div>

                {/* Section D — Options */}
                {selectedOptions.length > 0 && (
                  <div>
                    <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-400 mb-3">D — Options ({selectedOptions.length})</h4>
                    <div className="space-y-1.5">
                      {selectedOptions.map((opt) => {
                        const daysLeft = Math.ceil((new Date(opt.notification_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                        const isUrgent = daysLeft <= 30 && daysLeft > 0;
                        const isPassed = daysLeft <= 0;
                        return (
                          <div key={opt.id} className={clsx(
                            'flex items-center justify-between px-3 py-2 rounded-lg border',
                            isPassed ? 'bg-error-50 border-error-200' : isUrgent ? 'bg-warning-50 border-warning-200' : 'bg-white border-neutral-200',
                          )}>
                            <div>
                              <div className="text-xs font-medium">{opt.option_type.replace(/_/g, ' ')}</div>
                              <div className="text-2xs text-neutral-500">{opt.conditions}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-mono">{formatDate(opt.notification_date)}</div>
                              <div className={clsx('text-2xs font-bold', isPassed ? 'text-error-600' : isUrgent ? 'text-warning-600' : 'text-neutral-400')}>
                                {isPassed ? 'EXPIRÉ' : `J-${daysLeft}`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Amendments timeline */}
                {selectedAmendments.length > 0 && (
                  <div>
                    <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-400 mb-3">Amendments ({selectedAmendments.length})</h4>
                    <div className="space-y-2">
                      {selectedAmendments.map((amd) => (
                        <div key={amd.id} className="flex items-start gap-3 p-3 bg-white border border-neutral-200 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xs font-mono font-bold text-neutral-600">{amd.amendment_number.replace('AMD-', '')}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold">{amd.type.replace(/_/g, ' ')}</span>
                              <Badge variant={amd.status === 'ACTIVE' ? 'success' : amd.status === 'NEGOTIATION' ? 'info' : 'warning'}>
                                {amd.status}
                              </Badge>
                            </div>
                            <div className="text-2xs text-neutral-500 mt-0.5">{amd.description}</div>
                            {amd.financial_impact && (
                              <div className="text-2xs font-mono text-neutral-600 mt-1">
                                Impact: {amd.financial_impact.monthly_delta > 0 ? '+' : ''}{formatXOF(amd.financial_impact.monthly_delta)} /mois
                                {amd.financial_impact.wale_delta_years && ` · WALE +${amd.financial_impact.wale_delta_years} ans`}
                              </div>
                            )}
                          </div>
                          <div className="text-2xs text-neutral-400 font-mono">{formatDate(amd.effective_date)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
