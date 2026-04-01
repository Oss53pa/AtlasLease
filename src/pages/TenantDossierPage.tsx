import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Topbar } from '@/components/layout/Topbar';
import { Badge } from '@/components/ui/Badge';
import { formatXOF, formatDate, formatDateLong, daysUntil } from '@/lib/format';
import {
  mockDossiers,
  mockTimelineEvents,
  mockProperties,
  mockLeases,
  mockRentConditions,
  mockInvoices,
  mockTenants,
  mockDeposits,
  mockDossierDocuments,
  mockDossierChecklists,
  mockOfferDetails,
  mockVisitReports,
} from '@/lib/mock-data';
import type { LifecycleStage, TimelineEventType, TenantDossier } from '@/types';
import { clsx } from 'clsx';
import {
  ArrowLeft,
  Building2,
  FileText,
  Phone,
  Mail,
  Calendar,
  User,
  Target,
  CreditCard,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  MessageSquare,
  Hammer,
  Store,
  Search,
  Handshake,
  FileCheck,
  Eye,
  Send,
  MapPin,
  ClipboardCheck,
  Check,
  ChevronRight,
  Shield,
  BarChart3,
  Receipt,
  TrendingUp,
  Paperclip,
  Plus,
} from 'lucide-react';

// ─── Constants ──────────────────────────────────────────────

const STAGES: LifecycleStage[] = [
  'PROSPECT', 'QUALIFICATION', 'VISITE', 'OFFRE', 'NEGOCIATION',
  'RESERVATION', 'BAIL', 'AMENAGEMENT', 'EXPLOITATION',
];

const STAGE_LABELS: Record<LifecycleStage, string> = {
  PROSPECT: 'Prospect', QUALIFICATION: 'Qualification', VISITE: 'Visite',
  OFFRE: 'Offre', NEGOCIATION: 'Négociation', RESERVATION: 'Réservation',
  BAIL: 'Bail', AMENAGEMENT: 'Aménagement', EXPLOITATION: 'Exploitation',
};

const STAGE_BADGE_VARIANT: Record<LifecycleStage, 'default' | 'success' | 'warning' | 'info' | 'error'> = {
  PROSPECT: 'default', QUALIFICATION: 'default', VISITE: 'info',
  OFFRE: 'warning', NEGOCIATION: 'warning', RESERVATION: 'info',
  BAIL: 'info', AMENAGEMENT: 'info', EXPLOITATION: 'success',
};

function stageIndex(stage: LifecycleStage): number {
  return STAGES.indexOf(stage);
}

// ─── Phase tabs ─────────────────────────────────────────────

interface PhaseTab {
  key: string;
  label: string;
  icon: React.ElementType;
  stages: LifecycleStage[];
}

const PHASE_TABS: PhaseTab[] = [
  { key: 'prospection', label: 'Prospection', icon: Search, stages: ['PROSPECT', 'QUALIFICATION', 'VISITE'] },
  { key: 'negociation', label: 'Offre & Négo', icon: Handshake, stages: ['OFFRE', 'NEGOCIATION'] },
  { key: 'reservation', label: 'Réservation', icon: FileCheck, stages: ['RESERVATION'] },
  { key: 'bail', label: 'Bail', icon: FileText, stages: ['BAIL'] },
  { key: 'amenagement', label: 'Aménagement', icon: Hammer, stages: ['AMENAGEMENT'] },
  { key: 'exploitation', label: 'Exploitation', icon: Store, stages: ['EXPLOITATION'] },
];

function getActiveTabForStage(stage: LifecycleStage): string {
  for (const tab of PHASE_TABS) {
    if (tab.stages.includes(stage)) return tab.key;
  }
  return 'prospection';
}

function isTabReached(tab: PhaseTab, currentStage: LifecycleStage): boolean {
  const currentIdx = stageIndex(currentStage);
  const tabMinIdx = Math.min(...tab.stages.map(stageIndex));
  return currentIdx >= tabMinIdx;
}

// ─── Event dot colors ───────────────────────────────────────

const EVENT_DOT_COLOR: Record<TimelineEventType, string> = {
  STAGE_CHANGE: 'bg-neutral-900', NOTE: 'bg-info-500', EMAIL: 'bg-blue-500',
  CALL: 'bg-blue-500', MEETING: 'bg-purple-500', VISIT: 'bg-green-500',
  OFFER_SENT: 'bg-amber-500', OFFER_ACCEPTED: 'bg-amber-500', OFFER_REJECTED: 'bg-amber-500',
  RESERVATION_SIGNED: 'bg-success-500', LEASE_SIGNED: 'bg-success-500',
  PAYMENT: 'bg-green-500', ALERT: 'bg-red-500', DOCUMENT: 'bg-neutral-400',
  AMENAGEMENT_START: 'bg-orange-500', AMENAGEMENT_END: 'bg-orange-500',
  EXPLOITATION_START: 'bg-success-500',
};

const EVENT_TYPE_LABEL: Record<TimelineEventType, string> = {
  STAGE_CHANGE: 'Changement étape', NOTE: 'Note', EMAIL: 'Email',
  CALL: 'Appel', MEETING: 'Réunion', VISIT: 'Visite',
  OFFER_SENT: 'Offre envoyée', OFFER_ACCEPTED: 'Offre acceptée', OFFER_REJECTED: 'Offre refusée',
  RESERVATION_SIGNED: 'Réservation signée', LEASE_SIGNED: 'Bail signé',
  PAYMENT: 'Paiement', ALERT: 'Alerte', DOCUMENT: 'Document',
  AMENAGEMENT_START: 'Début travaux', AMENAGEMENT_END: 'Fin travaux',
  EXPLOITATION_START: 'Début exploitation',
};

// ─── Lifecycle Progress Bar ─────────────────────────────────

function LifecycleProgressBar({
  currentStage,
  onStageClick,
}: {
  currentStage: LifecycleStage;
  onStageClick?: (stage: LifecycleStage) => void;
}) {
  const currentIdx = stageIndex(currentStage);

  return (
    <div className="bg-white border border-neutral-200 rounded-lg px-5 py-4">
      <div className="flex items-center justify-between relative">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isFuture = idx > currentIdx;

          const stageColor = isCurrent
            ? currentStage === 'EXPLOITATION'
              ? 'ring-green-500 bg-green-500'
              : ['RESERVATION', 'BAIL', 'AMENAGEMENT'].includes(currentStage)
                ? 'ring-blue-500 bg-blue-500'
                : ['OFFRE', 'NEGOCIATION'].includes(currentStage)
                  ? 'ring-amber-500 bg-amber-500'
                  : 'ring-neutral-900 bg-neutral-900'
            : '';

          return (
            <div
              key={stage}
              className={clsx(
                'flex flex-col items-center relative z-10',
                (isCompleted || isCurrent) && 'cursor-pointer',
              )}
              style={{ flex: 1 }}
              onClick={() => {
                if ((isCompleted || isCurrent) && onStageClick) onStageClick(stage);
              }}
            >
              {idx > 0 && (
                <div
                  className="absolute top-3 right-1/2 h-0.5"
                  style={{ width: '100%', left: '-50%' }}
                >
                  <div className={clsx(
                    'w-full h-full',
                    idx <= currentIdx ? 'bg-neutral-900' : 'border-t border-dashed border-neutral-300',
                  )} />
                </div>
              )}
              <div className={clsx(
                'relative flex items-center justify-center rounded-full transition-all',
                isCompleted && 'w-6 h-6 bg-neutral-900',
                isCurrent && `w-8 h-8 ${stageColor} ring-4 ring-opacity-30`,
                isFuture && 'w-6 h-6 border-2 border-neutral-300 bg-white',
              )}>
                {isCompleted && <CheckCircle2 size={14} className="text-white" />}
                {isCurrent && <Circle size={10} className="text-white fill-white" />}
              </div>
              <span className={clsx(
                'mt-1.5 text-2xs text-center leading-tight',
                (isCompleted || isCurrent) && 'font-bold text-neutral-900',
                isFuture && 'text-neutral-400',
              )}>
                {STAGE_LABELS[stage]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section helpers ────────────────────────────────────────

function SectionCard({ title, icon: Icon, children, actions }: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className="text-neutral-500" />}
          <h3 className="text-xs font-bold text-neutral-900">{title}</h3>
        </div>
        {actions}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-1.5 border-b border-neutral-50 last:border-0">
      <span className="text-2xs text-neutral-400 shrink-0 w-36">{label}</span>
      <div className="text-xs text-neutral-900 text-right">{children}</div>
    </div>
  );
}

function ChecklistItem({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1.5">
      {done ? (
        <div className="w-4 h-4 rounded-full bg-success-500 flex items-center justify-center shrink-0">
          <Check size={10} className="text-white" />
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-neutral-300 shrink-0" />
      )}
      <span className={clsx('text-xs', done ? 'text-neutral-900' : 'text-neutral-400')}>{label}</span>
    </div>
  );
}

// ─── Timeline (compact, filterable) ─────────────────────────

function TimelinePanel({
  dossierId,
  filterStages,
}: {
  dossierId: string;
  filterStages?: LifecycleStage[];
}) {
  let events = mockTimelineEvents
    .filter((e) => e.dossier_id === dossierId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (filterStages) {
    events = events.filter((e) => filterStages.includes(e.stage));
  }

  if (events.length === 0) {
    return <p className="text-2xs text-neutral-400 text-center py-4">Aucun événement</p>;
  }

  return (
    <div className="space-y-0">
      {events.map((evt, idx) => (
        <div key={evt.id} className="flex gap-3 py-2.5 border-b border-neutral-50 last:border-0">
          <div className="flex flex-col items-center pt-0.5">
            <div className={clsx('w-2 h-2 rounded-full shrink-0', EVENT_DOT_COLOR[evt.event_type])} />
            {idx < events.length - 1 && <div className="w-px flex-1 bg-neutral-100 mt-1" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-900">{evt.title}</span>
              <span className="text-2xs px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 shrink-0">
                {EVENT_TYPE_LABEL[evt.event_type]}
              </span>
            </div>
            {evt.description && (
              <p className="text-2xs text-neutral-500 mt-0.5 leading-relaxed">{evt.description}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xs text-neutral-400 font-mono">{formatDate(evt.created_at)}</span>
              {evt.created_by && <span className="text-2xs text-neutral-400">· {evt.created_by}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TAB: Prospection ───────────────────────────────────────

function TabProspection({ dossier }: { dossier: TenantDossier }) {
  const docs = mockDossierDocuments.filter((d) => d.dossier_id === dossier.id);
  const checklist = mockDossierChecklists.find((c) => c.dossier_id === dossier.id);
  const visits = mockVisitReports.filter((v) => v.dossier_id === dossier.id);
  const targetProp = dossier.target_property_id
    ? mockProperties.find((p) => p.id === dossier.target_property_id)
    : null;

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Col 1+2: Contact + Besoin + Visites */}
      <div className="col-span-2 space-y-4">
        {/* Contact & Identité */}
        <SectionCard title="Identité & Contact" icon={User}>
          <div className="grid grid-cols-2 gap-x-8">
            <div className="space-y-0">
              <InfoRow label="Raison sociale">
                <span className="font-semibold">{dossier.company_name}</span>
              </InfoRow>
              {dossier.trade_name && (
                <InfoRow label="Nom commercial">{dossier.trade_name}</InfoRow>
              )}
              {dossier.activity_sector && (
                <InfoRow label="Secteur d'activité">{dossier.activity_sector}</InfoRow>
              )}
              {dossier.source && (
                <InfoRow label="Source">
                  <Badge variant={
                    dossier.source === 'INBOUND' ? 'info' :
                    dossier.source === 'REFERRAL' ? 'success' :
                    dossier.source === 'BROKER' ? 'warning' : 'default'
                  }>
                    {dossier.source}
                  </Badge>
                </InfoRow>
              )}
              {dossier.assigned_to && (
                <InfoRow label="Assigné à">{dossier.assigned_to}</InfoRow>
              )}
            </div>
            <div className="space-y-0">
              {dossier.contact_name && (
                <InfoRow label="Contact principal">{dossier.contact_name}</InfoRow>
              )}
              {dossier.contact_email && (
                <InfoRow label="Email">
                  <span className="flex items-center gap-1">
                    <Mail size={10} className="text-neutral-400" />
                    {dossier.contact_email}
                  </span>
                </InfoRow>
              )}
              {dossier.contact_phone && (
                <InfoRow label="Téléphone">
                  <span className="flex items-center gap-1">
                    <Phone size={10} className="text-neutral-400" />
                    {dossier.contact_phone}
                  </span>
                </InfoRow>
              )}
            </div>
          </div>
        </SectionCard>

        {/* Besoin & Matching */}
        <SectionCard title="Besoin & Matching" icon={Target}>
          <div className="grid grid-cols-2 gap-x-8">
            <div className="space-y-0">
              {(dossier.surface_need_min || dossier.surface_need_max) && (
                <InfoRow label="Surface recherchée">
                  <span className="font-mono font-semibold">
                    {dossier.surface_need_min ?? '?'} – {dossier.surface_need_max ?? '?'} m²
                  </span>
                </InfoRow>
              )}
              {dossier.budget_rent_max && (
                <InfoRow label="Budget loyer max">
                  <span className="font-mono">{formatXOF(dossier.budget_rent_max)} XOF/mois</span>
                </InfoRow>
              )}
              {targetProp && (
                <InfoRow label="Local ciblé">
                  <span className="flex items-center gap-1 font-mono">
                    <Building2 size={10} className="text-neutral-400" />
                    {targetProp.property_code}
                    <span className="text-neutral-400">({targetProp.gla_sqm} m²)</span>
                  </span>
                </InfoRow>
              )}
            </div>
            <div className="space-y-0">
              {dossier.match_score != null && (
                <InfoRow label="Score de matching">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full',
                          dossier.match_score >= 80 ? 'bg-success-500' :
                          dossier.match_score >= 60 ? 'bg-warning-500' : 'bg-error-500',
                        )}
                        style={{ width: `${dossier.match_score}%` }}
                      />
                    </div>
                    <span className={clsx(
                      'font-mono font-bold text-xs',
                      dossier.match_score >= 80 ? 'text-success-700' :
                      dossier.match_score >= 60 ? 'text-warning-700' : 'text-error-700',
                    )}>
                      {dossier.match_score}%
                    </span>
                  </div>
                </InfoRow>
              )}
              {targetProp && (
                <InfoRow label="Zone">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} className="text-neutral-400" />
                    {targetProp.zone}
                  </span>
                </InfoRow>
              )}
              {targetProp?.market_rent_sqm && (
                <InfoRow label="Loyer marché/m²">
                  <span className="font-mono">{formatXOF(targetProp.market_rent_sqm)} XOF</span>
                </InfoRow>
              )}
            </div>
          </div>
        </SectionCard>

        {/* Comptes-rendus de visite */}
        {visits.length > 0 && (
          <SectionCard title="Comptes-rendus de visite" icon={Eye}>
            <div className="space-y-3">
              {visits.map((v) => (
                <div key={v.id} className="border border-neutral-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-neutral-400" />
                      <span className="text-xs font-semibold text-neutral-900">{formatDate(v.date)}</span>
                      <span className="text-2xs text-neutral-400">— {v.property_code}</span>
                    </div>
                    <Badge variant={v.impression === 'POSITIVE' ? 'success' : v.impression === 'MITIGEE' ? 'warning' : 'default'}>
                      {v.impression}
                    </Badge>
                  </div>
                  <p className="text-2xs text-neutral-600 leading-relaxed">{v.notes}</p>
                  <div className="flex items-center gap-4 mt-2 text-2xs text-neutral-400">
                    <span>Participants : {v.participants.join(', ')}</span>
                  </div>
                  {v.next_steps && (
                    <div className="mt-2 text-2xs text-info-600 bg-info-50 rounded px-2 py-1">
                      Prochaine étape : {v.next_steps}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Historique phase Prospection */}
        <SectionCard title="Historique prospection" icon={Clock}>
          <TimelinePanel dossierId={dossier.id} filterStages={['PROSPECT', 'QUALIFICATION', 'VISITE']} />
        </SectionCard>
      </div>

      {/* Col 3: Checklist + Documents */}
      <div className="space-y-4">
        {/* Checklist qualification */}
        <SectionCard title="Checklist qualification" icon={ClipboardCheck}>
          {checklist ? (
            <div className="space-y-0">
              {checklist.items.map((item, i) => (
                <ChecklistItem key={i} label={item.label} done={item.done} />
              ))}
              <div className="mt-3 pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <span className="text-2xs text-neutral-400">Progression</span>
                  <span className="text-xs font-mono font-bold text-neutral-900">
                    {checklist.items.filter((i) => i.done).length}/{checklist.items.length}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-neutral-900 rounded-full transition-all"
                    style={{ width: `${(checklist.items.filter((i) => i.done).length / checklist.items.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-2xs text-neutral-400 text-center py-4">Aucune checklist</p>
          )}
        </SectionCard>

        {/* Documents */}
        <SectionCard
          title="Documents"
          icon={Paperclip}
          actions={
            <button className="flex items-center gap-1 text-2xs text-neutral-500 hover:text-neutral-700">
              <Plus size={12} /> Ajouter
            </button>
          }
        >
          {docs.length > 0 ? (
            <div className="space-y-2">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center gap-2 py-1.5 border-b border-neutral-50 last:border-0">
                  <FileText size={14} className="text-neutral-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-neutral-900 truncate">{doc.name}</div>
                    <div className="text-2xs text-neutral-400">{formatDate(doc.uploaded_at)}</div>
                  </div>
                  {doc.verified ? (
                    <CheckCircle2 size={14} className="text-success-500 shrink-0" />
                  ) : (
                    <Clock size={14} className="text-warning-500 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-2xs text-neutral-400 text-center py-4">Aucun document</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

// ─── TAB: Offre & Négociation ───────────────────────────────

function TabNegociation({ dossier }: { dossier: TenantDossier }) {
  const offer = mockOfferDetails.find((o) => o.dossier_id === dossier.id);
  const targetProp = dossier.target_property_id
    ? mockProperties.find((p) => p.id === dossier.target_property_id)
    : null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        {/* Offre commerciale */}
        <SectionCard title="Offre commerciale" icon={Send}>
          {offer ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-x-8">
                <div className="space-y-0">
                  <InfoRow label="Local proposé">
                    <span className="font-mono font-semibold">{offer.property_code}</span>
                  </InfoRow>
                  <InfoRow label="Surface proposée">
                    <span className="font-mono">{offer.surface_sqm} m²</span>
                  </InfoRow>
                  <InfoRow label="Loyer/m²/mois">
                    <span className="font-mono">{formatXOF(offer.rent_per_sqm)} XOF</span>
                  </InfoRow>
                  <InfoRow label="Loyer mensuel total">
                    <span className="font-mono font-bold">{formatXOF(offer.total_rent_monthly)} XOF</span>
                  </InfoRow>
                </div>
                <div className="space-y-0">
                  <InfoRow label="Charges mensuelles">
                    <span className="font-mono">{formatXOF(offer.charges_monthly)} XOF</span>
                  </InfoRow>
                  <InfoRow label="Durée proposée">
                    <span>{offer.duration_months} mois</span>
                  </InfoRow>
                  {offer.franchise_months > 0 && (
                    <InfoRow label="Franchise de loyer">
                      <Badge variant="info">{offer.franchise_months} mois</Badge>
                    </InfoRow>
                  )}
                  {offer.contribution_amenagement > 0 && (
                    <InfoRow label="Contribution aménagement">
                      <span className="font-mono">{formatXOF(offer.contribution_amenagement)} XOF</span>
                    </InfoRow>
                  )}
                  {offer.deposit_months > 0 && (
                    <InfoRow label="Dépôt de garantie">
                      <span>{offer.deposit_months} mois de loyer</span>
                    </InfoRow>
                  )}
                </div>
              </div>

              {/* Paliers */}
              {offer.stepped_rent && offer.stepped_rent.length > 0 && (
                <div className="border-t border-neutral-100 pt-3">
                  <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-500 mb-2">Paliers progressifs</h4>
                  <div className="space-y-1">
                    {offer.stepped_rent.map((step, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1 px-2 bg-neutral-50 rounded">
                        <span className="text-neutral-600">Mois {step.from} – {step.to}</span>
                        <span className="font-mono font-semibold text-neutral-900">{step.pct}% du loyer</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Revenue share */}
              {offer.revenue_share_pct != null && offer.revenue_share_pct > 0 && (
                <div className="border-t border-neutral-100 pt-3">
                  <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-500 mb-2">Revenue Share</h4>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InfoRow label="Taux RS">
                      <span className="font-mono font-bold">{(offer.revenue_share_pct * 100).toFixed(0)}%</span>
                    </InfoRow>
                    {offer.mgr_amount && (
                      <InfoRow label="MGR (Minimum garanti)">
                        <span className="font-mono">{formatXOF(offer.mgr_amount)} XOF</span>
                      </InfoRow>
                    )}
                  </div>
                </div>
              )}

              {/* Status de l'offre */}
              <div className="border-t border-neutral-100 pt-3 flex items-center gap-3">
                <span className="text-2xs text-neutral-400">Statut de l'offre :</span>
                <Badge variant={
                  offer.status === 'ACCEPTED' ? 'success' :
                  offer.status === 'COUNTER_PROPOSAL' ? 'warning' :
                  offer.status === 'REJECTED' ? 'error' : 'info'
                }>
                  {offer.status === 'ACCEPTED' ? 'Acceptée' :
                   offer.status === 'COUNTER_PROPOSAL' ? 'Contre-proposition' :
                   offer.status === 'REJECTED' ? 'Refusée' :
                   offer.status === 'SENT' ? 'Envoyée' : offer.status}
                </Badge>
                <span className="text-2xs text-neutral-400 font-mono">envoyée le {formatDate(offer.sent_date)}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Send size={24} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-xs text-neutral-400">Aucune offre émise pour ce dossier</p>
              <button className="mt-3 px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors">
                Créer une offre
              </button>
            </div>
          )}
        </SectionCard>

        {/* Historique négociation */}
        <SectionCard title="Historique négociation" icon={MessageSquare}>
          <TimelinePanel dossierId={dossier.id} filterStages={['OFFRE', 'NEGOCIATION']} />
        </SectionCard>
      </div>

      {/* Col 3: Synthèse financière */}
      <div className="space-y-4">
        {offer && (
          <SectionCard title="Synthèse financière" icon={BarChart3}>
            <div className="space-y-3">
              <div className="bg-neutral-50 rounded-lg p-3 text-center">
                <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Loyer annuel total</p>
                <p className="mt-1 text-lg font-bold font-mono text-neutral-900">
                  {formatXOF(offer.total_rent_monthly * 12)}
                </p>
                <p className="text-2xs text-neutral-400">XOF HT/an</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3 text-center">
                <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Valeur totale bail</p>
                <p className="mt-1 text-lg font-bold font-mono text-neutral-900">
                  {formatXOF(offer.total_rent_monthly * offer.duration_months)}
                </p>
                <p className="text-2xs text-neutral-400">XOF HT sur {offer.duration_months} mois</p>
              </div>
              {offer.franchise_months > 0 && (
                <div className="bg-warning-50 rounded-lg p-3 text-center">
                  <p className="text-2xs font-semibold uppercase tracking-wide text-warning-600">Manque à gagner franchise</p>
                  <p className="mt-1 text-lg font-bold font-mono text-warning-700">
                    {formatXOF(offer.total_rent_monthly * offer.franchise_months)}
                  </p>
                  <p className="text-2xs text-warning-500">{offer.franchise_months} mois de franchise</p>
                </div>
              )}
              {targetProp?.market_rent_sqm && (
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Loyer vs Marché</p>
                  <p className={clsx(
                    'mt-1 text-lg font-bold font-mono',
                    offer.rent_per_sqm >= targetProp.market_rent_sqm ? 'text-success-700' : 'text-warning-700',
                  )}>
                    {offer.rent_per_sqm >= targetProp.market_rent_sqm ? '+' : ''}
                    {(((offer.rent_per_sqm - targetProp.market_rent_sqm) / targetProp.market_rent_sqm) * 100).toFixed(1)}%
                  </p>
                  <p className="text-2xs text-neutral-400">{formatXOF(offer.rent_per_sqm)} vs {formatXOF(targetProp.market_rent_sqm)} /m²</p>
                </div>
              )}
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}

// ─── TAB: Réservation ───────────────────────────────────────

function TabReservation({ dossier }: { dossier: TenantDossier }) {
  const daysRemaining = dossier.reservation_expiry
    ? daysUntil(dossier.reservation_expiry)
    : null;

  const targetProp = dossier.target_property_id
    ? mockProperties.find((p) => p.id === dossier.target_property_id)
    : null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        {/* Contrat de réservation */}
        <SectionCard title="Contrat de réservation" icon={FileCheck}>
          {dossier.reservation_date ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-x-8">
                <div className="space-y-0">
                  <InfoRow label="Date de réservation">
                    <span className="font-mono font-semibold">{formatDateLong(dossier.reservation_date)}</span>
                  </InfoRow>
                  {dossier.reservation_expiry && (
                    <InfoRow label="Date d'expiration">
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{formatDate(dossier.reservation_expiry)}</span>
                        {daysRemaining != null && (
                          <Badge variant={daysRemaining < 7 ? 'error' : daysRemaining < 15 ? 'warning' : 'info'}>
                            {daysRemaining > 0 ? `${daysRemaining}j restant${daysRemaining > 1 ? 's' : ''}` : 'Expiré'}
                          </Badge>
                        )}
                      </div>
                    </InfoRow>
                  )}
                </div>
                <div className="space-y-0">
                  {targetProp && (
                    <InfoRow label="Local réservé">
                      <span className="font-mono font-semibold">{targetProp.property_code}</span>
                    </InfoRow>
                  )}
                  {targetProp && (
                    <InfoRow label="Surface">{targetProp.gla_sqm} m²</InfoRow>
                  )}
                </div>
              </div>

              {/* Dépôt de réservation */}
              {dossier.reservation_deposit != null && (
                <div className="border-t border-neutral-100 pt-4">
                  <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-500 mb-3">Dépôt de réservation</h4>
                  <div className="flex items-center gap-4">
                    <div className={clsx(
                      'flex-1 rounded-lg p-4 border-2',
                      dossier.reservation_deposit_paid
                        ? 'bg-success-50 border-success-200'
                        : 'bg-warning-50 border-warning-200',
                    )}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xs font-semibold uppercase text-neutral-500">Montant dépôt</p>
                          <p className="text-xl font-bold font-mono text-neutral-900 mt-1">
                            {formatXOF(dossier.reservation_deposit)} XOF
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {dossier.reservation_deposit_paid ? (
                            <>
                              <CheckCircle2 size={24} className="text-success-500" />
                              <div>
                                <p className="text-xs font-bold text-success-700">Encaissé</p>
                                <p className="text-2xs text-success-500">Virement confirmé</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <AlertCircle size={24} className="text-warning-500" />
                              <div>
                                <p className="text-xs font-bold text-warning-700">En attente</p>
                                <p className="text-2xs text-warning-500">Paiement non reçu</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Countdown */}
              {daysRemaining != null && daysRemaining > 0 && (
                <div className="border-t border-neutral-100 pt-4">
                  <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-500 mb-3">Délai restant</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full transition-all',
                          daysRemaining < 7 ? 'bg-error-500' : daysRemaining < 15 ? 'bg-warning-500' : 'bg-info-500',
                        )}
                        style={{ width: `${Math.max(5, Math.min(100, (daysRemaining / 30) * 100))}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono font-bold text-neutral-900">{daysRemaining}j</span>
                  </div>
                  <p className="text-2xs text-neutral-400 mt-1">
                    Prochaine action : signature du bail avant le {formatDate(dossier.reservation_expiry!)}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileCheck size={24} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-xs text-neutral-400">Aucune réservation pour ce dossier</p>
            </div>
          )}
        </SectionCard>

        {/* Historique */}
        <SectionCard title="Historique réservation" icon={Clock}>
          <TimelinePanel dossierId={dossier.id} filterStages={['RESERVATION']} />
        </SectionCard>
      </div>

      {/* Col 3: Conditions suspensives */}
      <div className="space-y-4">
        <SectionCard title="Conditions suspensives" icon={Shield}>
          <div className="space-y-0">
            <ChecklistItem
              label="Dépôt de réservation encaissé"
              done={!!dossier.reservation_deposit_paid}
            />
            <ChecklistItem
              label="Documents KYC complets"
              done={stageIndex(dossier.stage) >= stageIndex('RESERVATION')}
            />
            <ChecklistItem
              label="Validation solvabilité"
              done={stageIndex(dossier.stage) >= stageIndex('RESERVATION')}
            />
            <ChecklistItem
              label="Plans d'aménagement approuvés"
              done={stageIndex(dossier.stage) >= stageIndex('BAIL')}
            />
            <ChecklistItem
              label="Accord comité d'engagement"
              done={stageIndex(dossier.stage) >= stageIndex('BAIL')}
            />
          </div>
        </SectionCard>

        <SectionCard title="Prochaines étapes" icon={ChevronRight}>
          <div className="space-y-2">
            {stageIndex(dossier.stage) <= stageIndex('RESERVATION') && (
              <>
                <div className="text-xs text-neutral-600 bg-neutral-50 rounded p-2">
                  <span className="font-semibold">1.</span> Finaliser les conditions du bail
                </div>
                <div className="text-xs text-neutral-600 bg-neutral-50 rounded p-2">
                  <span className="font-semibold">2.</span> Rédaction du bail par le juridique
                </div>
                <div className="text-xs text-neutral-600 bg-neutral-50 rounded p-2">
                  <span className="font-semibold">3.</span> Signature du bail
                </div>
              </>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── TAB: Bail ──────────────────────────────────────────────

function TabBail({ dossier }: { dossier: TenantDossier }) {
  const lease = dossier.lease_id ? mockLeases.find((l) => l.id === dossier.lease_id) : null;
  const conditions = lease ? mockRentConditions.filter((rc) => rc.lease_id === lease.id && rc.is_active) : [];
  const totalMonthly = conditions.reduce((sum, rc) => sum + rc.base_amount, 0);
  const deposit = dossier.lease_id ? mockDeposits.find((d) => d.lease_id === dossier.lease_id) : null;
  const leaseInvoices = lease ? mockInvoices.filter((inv) => inv.lease_id === lease.id) : [];

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        {lease ? (
          <>
            {/* Informations bail */}
            <SectionCard title="Bail commercial" icon={FileText}>
              <div className="grid grid-cols-2 gap-x-8">
                <div className="space-y-0">
                  <InfoRow label="N° de bail">
                    <span className="font-mono font-bold">{lease.lease_number}</span>
                  </InfoRow>
                  <InfoRow label="Type de bail">
                    <Badge variant={lease.lease_type === 'COMMERCIAL_OHADA' ? 'info' : 'default'}>
                      {lease.lease_type}
                    </Badge>
                  </InfoRow>
                  <InfoRow label="Statut">
                    <Badge variant={lease.status === 'ACTIVE' ? 'success' : 'warning'}>
                      {lease.status}
                    </Badge>
                  </InfoRow>
                  <InfoRow label="Durée">{lease.duration_months} mois</InfoRow>
                </div>
                <div className="space-y-0">
                  <InfoRow label="Date de début">
                    <span className="font-mono">{formatDate(lease.commencement_date!)}</span>
                  </InfoRow>
                  <InfoRow label="Date de fin">
                    <span className="font-mono">{formatDate(lease.termination_date!)}</span>
                  </InfoRow>
                  <InfoRow label="Surface louée">
                    <span className="font-mono">{lease.leased_sqm} m²</span>
                  </InfoRow>
                  <InfoRow label="Fréquence facturation">{lease.billing_frequency}</InfoRow>
                </div>
              </div>
            </SectionCard>

            {/* Conditions financières */}
            <SectionCard title="Conditions financières" icon={CreditCard}>
              <div className="space-y-2">
                {conditions.map((rc) => (
                  <div key={rc.id} className="flex items-center justify-between py-2 px-3 bg-neutral-50 rounded-lg">
                    <div>
                      <span className="text-xs font-semibold text-neutral-900">{rc.label}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="default">{rc.condition_type}</Badge>
                        {rc.escalation_type !== 'NONE' && (
                          <span className="text-2xs text-neutral-400">
                            Révision : {rc.escalation_type}
                            {rc.escalation_rate ? ` ${(rc.escalation_rate * 100).toFixed(0)}%` : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-mono font-bold text-neutral-900">
                      {formatXOF(rc.base_amount)} XOF
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-3 px-3 bg-neutral-900 rounded-lg text-white">
                  <span className="text-xs font-bold">Total mensuel HT</span>
                  <span className="text-lg font-mono font-bold">{formatXOF(totalMonthly)} XOF</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3">
                  <span className="text-xs text-neutral-500">TVA ({(lease.tva_rate * 100).toFixed(0)}%)</span>
                  <span className="text-xs font-mono text-neutral-500">{formatXOF(totalMonthly * lease.tva_rate)} XOF</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 border-t border-neutral-100">
                  <span className="text-xs font-bold text-neutral-700">Total mensuel TTC</span>
                  <span className="text-sm font-mono font-bold text-neutral-900">
                    {formatXOF(totalMonthly * (1 + lease.tva_rate))} XOF
                  </span>
                </div>
              </div>
            </SectionCard>
          </>
        ) : (
          <SectionCard title="Bail" icon={FileText}>
            <div className="text-center py-8">
              <FileText size={24} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-xs text-neutral-400">Bail en cours de rédaction</p>
              <p className="text-2xs text-neutral-300 mt-1">Le bail sera disponible une fois signé</p>
            </div>
          </SectionCard>
        )}

        {/* Historique */}
        <SectionCard title="Historique bail" icon={Clock}>
          <TimelinePanel dossierId={dossier.id} filterStages={['BAIL']} />
        </SectionCard>
      </div>

      {/* Col 3: Dépôt + Synthèse */}
      <div className="space-y-4">
        {/* Dépôt de garantie */}
        <SectionCard title="Dépôt de garantie" icon={Shield}>
          {deposit ? (
            <div className="space-y-2">
              <InfoRow label="Formule">{deposit.contractual_formula}</InfoRow>
              <InfoRow label="Montant contractuel">
                <span className="font-mono font-bold">{formatXOF(deposit.contractual_amount!)} XOF</span>
              </InfoRow>
              <InfoRow label="Solde actuel">
                <span className="font-mono">{formatXOF(deposit.balance)} XOF</span>
              </InfoRow>
              <InfoRow label="Statut">
                <Badge variant={deposit.status === 'FULLY_PAID' ? 'success' : 'warning'}>
                  {deposit.status === 'FULLY_PAID' ? 'Encaissé' : deposit.status}
                </Badge>
              </InfoRow>
            </div>
          ) : lease ? (
            <div className="space-y-2">
              <InfoRow label="Formule">{lease.deposit_formula}</InfoRow>
              <InfoRow label="Mois de dépôt">{lease.deposit_months} mois</InfoRow>
              <div className="mt-2 text-2xs text-warning-600 bg-warning-50 rounded p-2">
                Dépôt en attente de réception
              </div>
            </div>
          ) : (
            <p className="text-2xs text-neutral-400 text-center py-4">Non applicable</p>
          )}
        </SectionCard>

        {/* Factures liées */}
        {leaseInvoices.length > 0 && (
          <SectionCard title="Factures liées" icon={Receipt}>
            <div className="space-y-1">
              {leaseInvoices.slice(0, 5).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-1.5 border-b border-neutral-50 last:border-0">
                  <div>
                    <span className="text-xs font-mono text-neutral-900">{inv.invoice_number}</span>
                    <p className="text-2xs text-neutral-400">{formatDate(inv.issue_date)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold">{formatXOF(inv.total_ttc)}</span>
                    <div>
                      <Badge variant={inv.status === 'PAID' ? 'success' : inv.status === 'OVERDUE' ? 'error' : 'default'}>
                        {inv.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              {leaseInvoices.length > 5 && (
                <p className="text-2xs text-neutral-400 text-center pt-2">
                  + {leaseInvoices.length - 5} autres factures
                </p>
              )}
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}

// ─── TAB: Aménagement ───────────────────────────────────────

function TabAmenagement({ dossier }: { dossier: TenantDossier }) {
  const start = dossier.amenagement_start ? new Date(dossier.amenagement_start) : null;
  const end = dossier.amenagement_end ? new Date(dossier.amenagement_end) : null;
  const now = new Date();

  let progress = 0;
  let daysElapsed = 0;
  let totalDays = 0;
  if (start && end) {
    totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    daysElapsed = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    progress = Math.min(100, Math.max(0, Math.round((daysElapsed / totalDays) * 100)));
  }

  const daysRemaining = end ? daysUntil(dossier.amenagement_end!) : null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        <SectionCard title="Suivi aménagement" icon={Hammer}>
          {start ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-x-8">
                <div className="space-y-0">
                  <InfoRow label="Début travaux">
                    <span className="font-mono font-semibold">{formatDateLong(dossier.amenagement_start!)}</span>
                  </InfoRow>
                  {end && (
                    <InfoRow label="Fin prévue">
                      <span className="font-mono">{formatDateLong(dossier.amenagement_end!)}</span>
                    </InfoRow>
                  )}
                  <InfoRow label="Durée totale">{totalDays} jours</InfoRow>
                </div>
                <div className="space-y-0">
                  {dossier.amenagement_budget != null && (
                    <InfoRow label="Budget">
                      <span className="font-mono font-bold">{formatXOF(dossier.amenagement_budget)} XOF</span>
                    </InfoRow>
                  )}
                  <InfoRow label="Jours écoulés">{daysElapsed} / {totalDays}</InfoRow>
                  {daysRemaining != null && (
                    <InfoRow label="Jours restants">
                      <Badge variant={daysRemaining < 15 ? 'warning' : 'info'}>
                        {daysRemaining > 0 ? `${daysRemaining}j` : 'Terminé'}
                      </Badge>
                    </InfoRow>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="border-t border-neutral-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xs font-bold uppercase tracking-wide text-neutral-500">Avancement</span>
                  <span className="text-sm font-mono font-bold text-neutral-900">{progress}%</span>
                </div>
                <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      'h-full rounded-full transition-all',
                      progress >= 100 ? 'bg-success-500' : progress >= 75 ? 'bg-info-500' : 'bg-blue-500',
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xs text-neutral-400 font-mono">{formatDate(dossier.amenagement_start!)}</span>
                  {end && <span className="text-2xs text-neutral-400 font-mono">{formatDate(dossier.amenagement_end!)}</span>}
                </div>
              </div>

              {/* Jalons */}
              <div className="border-t border-neutral-100 pt-4">
                <h4 className="text-2xs font-bold uppercase tracking-wide text-neutral-500 mb-3">Jalons</h4>
                <div className="space-y-2">
                  <ChecklistItem label="Permis de construire / déclaration préalable" done={progress > 0} />
                  <ChecklistItem label="Début des travaux de gros-oeuvre" done={progress >= 20} />
                  <ChecklistItem label="Second oeuvre et installations techniques" done={progress >= 50} />
                  <ChecklistItem label="Agencement et mobilier" done={progress >= 75} />
                  <ChecklistItem label="Réception des travaux" done={progress >= 100} />
                  <ChecklistItem label="Conformité & PV de réception" done={dossier.stage === 'EXPLOITATION'} />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Hammer size={24} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-xs text-neutral-400">Phase d'aménagement non démarrée</p>
            </div>
          )}
        </SectionCard>

        {/* Historique */}
        <SectionCard title="Historique aménagement" icon={Clock}>
          <TimelinePanel dossierId={dossier.id} filterStages={['AMENAGEMENT']} />
        </SectionCard>
      </div>

      {/* Col 3: Budget */}
      <div className="space-y-4">
        {dossier.amenagement_budget != null && (
          <SectionCard title="Suivi budgétaire" icon={CreditCard}>
            <div className="space-y-3">
              <div className="bg-neutral-50 rounded-lg p-3 text-center">
                <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Budget total</p>
                <p className="mt-1 text-xl font-bold font-mono text-neutral-900">
                  {formatXOF(dossier.amenagement_budget)}
                </p>
                <p className="text-2xs text-neutral-400">XOF</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3 text-center">
                <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Dépensé estimé</p>
                <p className="mt-1 text-xl font-bold font-mono text-neutral-900">
                  {formatXOF(Math.round(dossier.amenagement_budget * (progress / 100)))}
                </p>
                <p className="text-2xs text-neutral-400">{progress}% du budget</p>
              </div>
              <div className="bg-info-50 rounded-lg p-3 text-center">
                <p className="text-2xs font-semibold uppercase tracking-wide text-info-600">Reste à engager</p>
                <p className="mt-1 text-xl font-bold font-mono text-info-700">
                  {formatXOF(Math.round(dossier.amenagement_budget * (1 - progress / 100)))}
                </p>
              </div>
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}

// ─── TAB: Exploitation ──────────────────────────────────────

function TabExploitation({ dossier }: { dossier: TenantDossier }) {
  const tenant = dossier.tenant_id ? mockTenants.find((t) => t.id === dossier.tenant_id) : null;
  const lease = dossier.lease_id ? mockLeases.find((l) => l.id === dossier.lease_id) : null;
  const deposit = dossier.lease_id ? mockDeposits.find((d) => d.lease_id === dossier.lease_id) : null;
  const conditions = lease ? mockRentConditions.filter((rc) => rc.lease_id === lease.id && rc.is_active) : [];
  const totalMonthly = conditions.reduce((sum, rc) => sum + rc.base_amount, 0);
  const leaseInvoices = lease ? mockInvoices.filter((inv) => inv.lease_id === lease.id) : [];
  const totalInvoiced = leaseInvoices.reduce((sum, inv) => sum + inv.total_ttc, 0);
  const totalPaid = leaseInvoices.reduce((sum, inv) => sum + inv.amount_paid, 0);
  const overdueInvoices = leaseInvoices.filter((inv) => inv.status === 'OVERDUE' || inv.status === 'PARTIALLY_PAID');
  const totalOverdue = overdueInvoices.reduce((sum, inv) => sum + (inv.balance_due || 0), 0);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        {/* KPIs exploitation */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white border border-neutral-200 rounded-lg p-3 text-center">
            <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Loyer mensuel</p>
            <p className="mt-1 text-base font-bold font-mono text-neutral-900">{formatXOF(totalMonthly)}</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg p-3 text-center">
            <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Total facturé</p>
            <p className="mt-1 text-base font-bold font-mono text-neutral-900">{formatXOF(totalInvoiced)}</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg p-3 text-center">
            <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Total encaissé</p>
            <p className="mt-1 text-base font-bold font-mono text-success-700">{formatXOF(totalPaid)}</p>
          </div>
          <div className={clsx(
            'border rounded-lg p-3 text-center',
            totalOverdue > 0 ? 'bg-error-50 border-error-200' : 'bg-white border-neutral-200',
          )}>
            <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">Impayés</p>
            <p className={clsx(
              'mt-1 text-base font-bold font-mono',
              totalOverdue > 0 ? 'text-error-700' : 'text-neutral-900',
            )}>
              {formatXOF(totalOverdue)}
            </p>
          </div>
        </div>

        {/* Scoring */}
        {tenant && (
          <SectionCard title="Performance locataire" icon={TrendingUp}>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="space-y-0">
                <InfoRow label="Score paiement">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full',
                          tenant.payment_score >= 90 ? 'bg-success-500' :
                          tenant.payment_score >= 75 ? 'bg-warning-500' : 'bg-error-500',
                        )}
                        style={{ width: `${tenant.payment_score}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold">{tenant.payment_score}/100</span>
                  </div>
                </InfoRow>
                <InfoRow label="Statut KYC">
                  <Badge variant={tenant.kyc_status === 'COMPLETE' ? 'success' : 'warning'}>
                    {tenant.kyc_status === 'COMPLETE' ? 'Complet' : tenant.kyc_status}
                  </Badge>
                </InfoRow>
              </div>
              <div className="space-y-0">
                <InfoRow label="Taux recouvrement">
                  <span className="font-mono font-bold">
                    {totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(1) : '0.0'}%
                  </span>
                </InfoRow>
                <InfoRow label="Factures en retard">
                  <span className={clsx('font-mono', overdueInvoices.length > 0 ? 'text-error-600 font-bold' : 'text-neutral-400')}>
                    {overdueInvoices.length}
                  </span>
                </InfoRow>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Historique factures */}
        <SectionCard title="Historique facturation" icon={Receipt}>
          {leaseInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 text-2xs font-bold uppercase tracking-wide text-neutral-500">
                    <th className="text-left py-2">N° facture</th>
                    <th className="text-left py-2">Période</th>
                    <th className="text-right py-2">Montant TTC</th>
                    <th className="text-right py-2">Payé</th>
                    <th className="text-right py-2">Solde</th>
                    <th className="text-left py-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {leaseInvoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-neutral-50 text-xs hover:bg-neutral-50 transition-colors">
                      <td className="py-2 font-mono font-semibold text-neutral-900">{inv.invoice_number}</td>
                      <td className="py-2 text-neutral-600 font-mono text-2xs">
                        {formatDate(inv.period_start)} → {formatDate(inv.period_end)}
                      </td>
                      <td className="py-2 text-right font-mono">{formatXOF(inv.total_ttc)}</td>
                      <td className="py-2 text-right font-mono text-success-600">{formatXOF(inv.amount_paid)}</td>
                      <td className={clsx(
                        'py-2 text-right font-mono font-semibold',
                        (inv.balance_due || 0) > 0 ? 'text-error-600' : 'text-neutral-400',
                      )}>
                        {formatXOF(inv.balance_due || 0)}
                      </td>
                      <td className="py-2">
                        <Badge variant={
                          inv.status === 'PAID' ? 'success' :
                          inv.status === 'OVERDUE' ? 'error' :
                          inv.status === 'PARTIALLY_PAID' ? 'warning' : 'default'
                        }>
                          {inv.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-2xs text-neutral-400 text-center py-4">Aucune facture</p>
          )}
        </SectionCard>
      </div>

      {/* Col 3 */}
      <div className="space-y-4">
        {/* Exploitation info */}
        <SectionCard title="Exploitation" icon={Store}>
          <div className="space-y-2">
            {dossier.exploitation_start && (
              <InfoRow label="Début exploitation">
                <span className="font-mono">{formatDateLong(dossier.exploitation_start)}</span>
              </InfoRow>
            )}
            {lease && (
              <>
                <InfoRow label="Fin de bail">
                  <span className="font-mono">{formatDate(lease.termination_date!)}</span>
                </InfoRow>
                <InfoRow label="Durée restante">
                  <span className="font-mono">
                    {Math.max(0, Math.round(daysUntil(lease.termination_date!) / 365 * 10) / 10)} ans
                  </span>
                </InfoRow>
              </>
            )}
          </div>
        </SectionCard>

        {/* Dépôt */}
        {deposit && (
          <SectionCard title="Dépôt de garantie" icon={Shield}>
            <div className="space-y-2">
              <InfoRow label="Montant">
                <span className="font-mono font-bold">{formatXOF(deposit.contractual_amount!)} XOF</span>
              </InfoRow>
              <InfoRow label="Solde">
                <span className="font-mono">{formatXOF(deposit.balance)} XOF</span>
              </InfoRow>
              <InfoRow label="Statut">
                <Badge variant={deposit.status === 'FULLY_PAID' ? 'success' : 'warning'}>
                  {deposit.status === 'FULLY_PAID' ? 'Encaissé' : deposit.status}
                </Badge>
              </InfoRow>
            </div>
          </SectionCard>
        )}

        {/* Historique exploitation */}
        <SectionCard title="Historique" icon={Clock}>
          <TimelinePanel dossierId={dossier.id} filterStages={['EXPLOITATION']} />
        </SectionCard>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────

export function TenantDossierPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dossier = mockDossiers.find((d) => d.id === id);

  const [activeTab, setActiveTab] = useState<string>(
    dossier ? getActiveTabForStage(dossier.stage) : 'prospection',
  );
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  if (!dossier) {
    return (
      <div>
        <Topbar title="Dossier locataire" subtitle="Introuvable" />
        <div className="p-6 animate-fade-in">
          <div className="max-w-md mx-auto text-center py-20">
            <AlertCircle size={48} className="mx-auto text-neutral-300 mb-4" />
            <h2 className="text-sm font-bold text-neutral-900 mb-1">Dossier introuvable</h2>
            <p className="text-2xs text-neutral-500 mb-4">Le dossier « {id} » n'existe pas ou a été supprimé.</p>
            <button
              onClick={() => navigate('/tenants')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft size={14} /> Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  function handleStageClick(stage: LifecycleStage) {
    const tab = getActiveTabForStage(stage);
    setActiveTab(tab);
  }

  return (
    <div>
      <Topbar title="Dossier locataire" subtitle={dossier.company_name} />

      <div className="p-6 space-y-4 animate-fade-in">
        {/* ─── Header ────────────────────────────────────── */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <button
                onClick={() => navigate('/tenants')}
                className="mt-0.5 p-1.5 rounded-md hover:bg-neutral-100 transition-colors"
              >
                <ArrowLeft size={16} className="text-neutral-500" />
              </button>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-sm font-bold text-neutral-900">{dossier.company_name}</h1>
                  {dossier.trade_name && (
                    <span className="text-xs text-neutral-400">({dossier.trade_name})</span>
                  )}
                  <Badge variant={STAGE_BADGE_VARIANT[dossier.stage]}>
                    {STAGE_LABELS[dossier.stage]}
                  </Badge>
                  {dossier.match_score != null && (
                    <span className={clsx(
                      'inline-flex items-center px-1.5 py-0.5 rounded text-2xs font-bold font-mono',
                      dossier.match_score >= 80 ? 'bg-success-50 text-success-700' :
                      dossier.match_score >= 60 ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700',
                    )}>
                      Score {dossier.match_score}%
                    </span>
                  )}
                </div>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-1.5 text-2xs text-neutral-500">
                  {dossier.contact_name && (
                    <span className="flex items-center gap-1">
                      <User size={10} className="text-neutral-400" /> {dossier.contact_name}
                    </span>
                  )}
                  {dossier.contact_email && (
                    <span className="flex items-center gap-1">
                      <Mail size={10} className="text-neutral-400" /> {dossier.contact_email}
                    </span>
                  )}
                  {dossier.contact_phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={10} className="text-neutral-400" /> {dossier.contact_phone}
                    </span>
                  )}
                  {dossier.activity_sector && (
                    <span className="flex items-center gap-1">
                      <Store size={10} className="text-neutral-400" /> {dossier.activity_sector}
                    </span>
                  )}
                  {dossier.assigned_to && (
                    <span className="flex items-center gap-1">
                      <User size={10} className="text-neutral-400" /> Resp: {dossier.assigned_to}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowFullTimeline(!showFullTimeline)}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors',
                  showFullTimeline
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50',
                )}
              >
                <Clock size={14} />
                Historique complet
              </button>
            </div>
          </div>
        </div>

        {/* ─── Lifecycle Progress Bar ────────────────────── */}
        <LifecycleProgressBar currentStage={dossier.stage} onStageClick={handleStageClick} />

        {/* ─── Full Timeline (toggle) ────────────────────── */}
        {showFullTimeline && (
          <SectionCard
            title="Historique complet du dossier"
            icon={Clock}
            actions={
              <Badge variant="default">
                {mockTimelineEvents.filter((e) => e.dossier_id === dossier.id).length} événements
              </Badge>
            }
          >
            <TimelinePanel dossierId={dossier.id} />
          </SectionCard>
        )}

        {/* ─── Phase Tabs ────────────────────────────────── */}
        <div className="flex items-center gap-0 border-b border-neutral-200 bg-white rounded-t-lg px-1">
          {PHASE_TABS.map((tab) => {
            const reached = isTabReached(tab, dossier.stage);
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                onClick={() => reached && setActiveTab(tab.key)}
                disabled={!reached}
                className={clsx(
                  'flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 -mb-px',
                  isActive && 'border-neutral-900 text-neutral-900',
                  !isActive && reached && 'border-transparent text-neutral-400 hover:text-neutral-600',
                  !reached && 'border-transparent text-neutral-300 cursor-not-allowed',
                )}
              >
                <Icon size={14} />
                {tab.label}
                {/* Dot if current stage is in this tab */}
                {tab.stages.includes(dossier.stage) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-success-500 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* ─── Tab Content ───────────────────────────────── */}
        <div className="min-h-[400px]">
          {activeTab === 'prospection' && <TabProspection dossier={dossier} />}
          {activeTab === 'negociation' && <TabNegociation dossier={dossier} />}
          {activeTab === 'reservation' && <TabReservation dossier={dossier} />}
          {activeTab === 'bail' && <TabBail dossier={dossier} />}
          {activeTab === 'amenagement' && <TabAmenagement dossier={dossier} />}
          {activeTab === 'exploitation' && <TabExploitation dossier={dossier} />}
        </div>
      </div>
    </div>
  );
}
