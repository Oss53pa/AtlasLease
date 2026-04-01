import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { mockDossiers } from '@/lib/mock-data';
import type { LifecycleStage } from '@/types';
import { Users, Handshake, FileText, Building2, Search, Plus } from 'lucide-react';
import { clsx } from 'clsx';

const STAGE_ORDER: LifecycleStage[] = [
  'PROSPECT',
  'QUALIFICATION',
  'VISITE',
  'OFFRE',
  'NEGOCIATION',
  'RESERVATION',
  'BAIL',
  'AMENAGEMENT',
  'EXPLOITATION',
];

const STAGE_LABELS: Record<LifecycleStage, string> = {
  PROSPECT: 'Prospect',
  QUALIFICATION: 'Qualification',
  VISITE: 'Visite',
  OFFRE: 'Offre',
  NEGOCIATION: 'Négociation',
  RESERVATION: 'Réservation',
  BAIL: 'Bail',
  AMENAGEMENT: 'Aménagement',
  EXPLOITATION: 'Exploitation',
};

function stageIndex(stage: LifecycleStage): number {
  return STAGE_ORDER.indexOf(stage);
}

function StageDots({ stage }: { stage: LifecycleStage }) {
  const current = stageIndex(stage);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {STAGE_ORDER.map((s, i) => {
          const isCurrent = i === current;
          const isCompleted = i < current;

          let color = 'bg-neutral-200'; // future
          if (isCompleted) {
            color = 'bg-neutral-900';
          } else if (isCurrent) {
            // Highlight color based on stage group
            if (stage === 'EXPLOITATION') {
              color = 'bg-success-500';
            } else if (stage === 'RESERVATION' || stage === 'BAIL' || stage === 'AMENAGEMENT') {
              color = 'bg-info-500';
            } else if (stage === 'OFFRE' || stage === 'NEGOCIATION') {
              color = 'bg-warning-500';
            } else {
              color = 'bg-neutral-500';
            }
          }

          return (
            <span
              key={s}
              className={clsx(
                'inline-block rounded-full',
                isCurrent ? 'w-2 h-2' : 'w-1.5 h-1.5',
                color,
              )}
            />
          );
        })}
      </div>
      <span className="ml-1 text-2xs text-neutral-600">{STAGE_LABELS[stage]}</span>
    </div>
  );
}

export function TenantsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');

  // Filter dossiers
  const filtered = mockDossiers.filter((d) => {
    if (stageFilter !== 'ALL' && d.stage !== stageFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const haystack = [d.company_name, d.trade_name, d.contact_name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  // Stats
  const total = mockDossiers.length;
  const enProspection = mockDossiers.filter((d) =>
    ['PROSPECT', 'QUALIFICATION', 'VISITE'].includes(d.stage),
  ).length;
  const enNegociation = mockDossiers.filter((d) =>
    ['OFFRE', 'NEGOCIATION'].includes(d.stage),
  ).length;
  const enCours = mockDossiers.filter((d) =>
    ['RESERVATION', 'BAIL', 'AMENAGEMENT'].includes(d.stage),
  ).length;
  const enExploitation = mockDossiers.filter((d) => d.stage === 'EXPLOITATION').length;

  return (
    <div>
      <Topbar title="Dossiers Locataires" subtitle="De la prospection à l'exploitation" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-3">
          <StatCard label="Total dossiers" value={`${total}`} icon={Users} />
          <StatCard label="En prospection" value={`${enProspection}`} icon={Search} />
          <StatCard label="En négociation" value={`${enNegociation}`} icon={Handshake} />
          <StatCard label="En cours" value={`${enCours}`} icon={FileText} />
          <StatCard label="En exploitation" value={`${enExploitation}`} icon={Building2} />
        </div>

        {/* Filter toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un dossier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
              />
            </div>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-2 py-1.5 text-xs bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
            >
              <option value="ALL">Toutes les étapes</option>
              {STAGE_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Nouveau dossier
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left px-4 py-2.5 text-2xs font-bold uppercase tracking-wide text-neutral-500">Société</th>
                <th className="text-left px-4 py-2.5 text-2xs font-bold uppercase tracking-wide text-neutral-500">Contact</th>
                <th className="text-left px-4 py-2.5 text-2xs font-bold uppercase tracking-wide text-neutral-500">Secteur</th>
                <th className="text-left px-4 py-2.5 text-2xs font-bold uppercase tracking-wide text-neutral-500">Étape</th>
                <th className="text-left px-4 py-2.5 text-2xs font-bold uppercase tracking-wide text-neutral-500">Surface</th>
                <th className="text-left px-4 py-2.5 text-2xs font-bold uppercase tracking-wide text-neutral-500">Score</th>
                <th className="text-left px-4 py-2.5 text-2xs font-bold uppercase tracking-wide text-neutral-500">Responsable</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dossier) => (
                <tr
                  key={dossier.id}
                  onClick={() => navigate(`/tenants/${dossier.id}`)}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {/* Société */}
                  <td className="px-4 py-3">
                    <div className="text-xs font-bold text-neutral-900">{dossier.company_name}</div>
                    {dossier.trade_name && (
                      <div className="text-2xs text-neutral-400">{dossier.trade_name}</div>
                    )}
                  </td>
                  {/* Contact */}
                  <td className="px-4 py-3">
                    {dossier.contact_name ? (
                      <>
                        <div className="text-xs text-neutral-900">{dossier.contact_name}</div>
                        {dossier.contact_email && (
                          <div className="text-2xs text-neutral-400">{dossier.contact_email}</div>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-neutral-300">&mdash;</span>
                    )}
                  </td>
                  {/* Secteur */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-neutral-600">{dossier.activity_sector ?? '—'}</span>
                  </td>
                  {/* Étape */}
                  <td className="px-4 py-3">
                    <StageDots stage={dossier.stage} />
                  </td>
                  {/* Surface */}
                  <td className="px-4 py-3">
                    {dossier.surface_need_min || dossier.surface_need_max ? (
                      <span className="text-xs font-mono text-neutral-600">
                        {dossier.surface_need_min ?? '?'} — {dossier.surface_need_max ?? '?'} m²
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-300">&mdash;</span>
                    )}
                  </td>
                  {/* Score */}
                  <td className="px-4 py-3">
                    {dossier.match_score != null ? (
                      <span
                        className={clsx(
                          'inline-flex items-center px-1.5 py-0.5 rounded text-2xs font-bold font-mono',
                          dossier.match_score >= 80 && 'bg-success-50 text-success-700',
                          dossier.match_score >= 60 && dossier.match_score < 80 && 'bg-warning-50 text-warning-700',
                          dossier.match_score < 60 && 'bg-error-50 text-error-700',
                        )}
                      >
                        {dossier.match_score}
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-300">&mdash;</span>
                    )}
                  </td>
                  {/* Responsable */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-neutral-600">{dossier.assigned_to ?? '—'}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-xs text-neutral-400">
                    Aucun dossier trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
