import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { mockProspects } from '@/lib/mock-data';
import type { Prospect, ProspectStatus } from '@/types';
import { Users, Target, TrendingUp, Handshake, Search, Plus, Mail, Phone } from 'lucide-react';
import { clsx } from 'clsx';

const PIPELINE_COLUMNS: { key: ProspectStatus; label: string }[] = [
  { key: 'QUALIFIED', label: 'Qualifié' },
  { key: 'VISIT_PLANNED', label: 'Visite planifiée' },
  { key: 'VISIT_DONE', label: 'Visite faite' },
  { key: 'OFFER_SENT', label: 'Offre envoyée' },
  { key: 'NEGOTIATION', label: 'Négociation' },
  { key: 'WON', label: 'Gagné' },
];

const sourceLabels: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'info' | 'error' }> = {
  INBOUND: { label: 'Inbound', variant: 'info' },
  REFERRAL: { label: 'Référence', variant: 'success' },
  BROKER: { label: 'Courtier', variant: 'warning' },
  COLD_OUTREACH: { label: 'Prospection', variant: 'default' },
  EVENT: { label: 'Événement', variant: 'info' },
  EPHEMERAL_CONVERTED: { label: 'Éphémère converti', variant: 'success' },
};

function MatchScoreBadge({ score }: { score: number }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-1.5 py-0.5 rounded text-2xs font-bold font-mono',
        score >= 80 && 'bg-success-50 text-success-700',
        score >= 60 && score < 80 && 'bg-warning-50 text-warning-700',
        score < 60 && 'bg-error-50 text-error-700',
      )}
    >
      {score}%
    </span>
  );
}

function ProspectCard({ prospect }: { prospect: Prospect }) {
  const src = prospect.source ? sourceLabels[prospect.source] : null;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-3 hover:border-neutral-300 transition-colors cursor-pointer space-y-2">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-xs font-bold text-neutral-900 truncate">{prospect.company_name}</div>
          {prospect.contact_name && (
            <div className="text-2xs text-neutral-500 truncate">{prospect.contact_name}</div>
          )}
        </div>
        {prospect.match_score != null && <MatchScoreBadge score={prospect.match_score} />}
      </div>

      {/* Contact */}
      {prospect.contact_email && (
        <div className="flex items-center gap-1 text-2xs text-neutral-400 truncate">
          <Mail size={10} className="shrink-0" />
          <span className="truncate">{prospect.contact_email}</span>
        </div>
      )}
      {prospect.contact_phone && (
        <div className="flex items-center gap-1 text-2xs text-neutral-400">
          <Phone size={10} className="shrink-0" />
          <span>{prospect.contact_phone}</span>
        </div>
      )}

      {/* Details */}
      {prospect.activity_sector && (
        <div className="text-2xs text-neutral-500">{prospect.activity_sector}</div>
      )}

      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-2xs">
        {(prospect.surface_min_sqm || prospect.surface_max_sqm) && (
          <span className="font-mono text-neutral-600">
            {prospect.surface_min_sqm ?? '?'} – {prospect.surface_max_sqm ?? '?'} m²
          </span>
        )}
        {prospect.budget_rent_max && (
          <span className="font-mono text-neutral-500">
            Max {formatXOF(prospect.budget_rent_max)} XOF
          </span>
        )}
      </div>

      {/* Source badge */}
      {src && (
        <div>
          <Badge variant={src.variant}>{src.label}</Badge>
        </div>
      )}
    </div>
  );
}

export function ProspectsPage() {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');

  // Filter prospects
  const filtered = mockProspects.filter((p) => {
    if (sourceFilter !== 'ALL' && p.source !== sourceFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const haystack = [p.company_name, p.contact_name, p.contact_email, p.activity_sector]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  // Stats
  const total = mockProspects.length;
  const inNegotiation = mockProspects.filter((p) => p.status === 'NEGOTIATION').length;
  const scores = mockProspects.filter((p) => p.match_score != null).map((p) => p.match_score!);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const wonCount = mockProspects.filter((p) => p.status === 'WON').length;
  const conversionRate = total > 0 ? ((wonCount / total) * 100).toFixed(1) : '0.0';

  return (
    <div>
      <Topbar title="Prospects" subtitle="Pipeline commercial" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Total prospects" value={`${total}`} icon={Users} />
          <StatCard label="En négociation" value={`${inNegotiation}`} icon={Handshake} />
          <StatCard label="Score moyen" value={`${avgScore}%`} icon={Target} />
          <StatCard label="Taux conversion" value={`${conversionRate}%`} subtitle={`${wonCount} gagné${wonCount > 1 ? 's' : ''}`} icon={TrendingUp} />
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un prospect..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
              />
            </div>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-2 py-1.5 text-xs bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
            >
              <option value="ALL">Toutes sources</option>
              <option value="INBOUND">Inbound</option>
              <option value="REFERRAL">Référence</option>
              <option value="BROKER">Courtier</option>
              <option value="COLD_OUTREACH">Prospection</option>
              <option value="EVENT">Événement</option>
              <option value="EPHEMERAL_CONVERTED">Éphémère converti</option>
            </select>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Nouveau prospect
          </button>
        </div>

        {/* Pipeline Kanban board */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {PIPELINE_COLUMNS.map((col) => {
            const columnProspects = filtered.filter((p) => p.status === col.key);
            return (
              <div key={col.key} className="flex-shrink-0 w-64">
                {/* Column header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-2xs font-bold uppercase tracking-wide text-neutral-500">{col.label}</h3>
                  <Badge variant="default">{columnProspects.length}</Badge>
                </div>
                {/* Cards */}
                <div className="space-y-2">
                  {columnProspects.length === 0 && (
                    <div className="py-8 text-center text-2xs text-neutral-300">Aucun prospect</div>
                  )}
                  {columnProspects.map((prospect) => (
                    <ProspectCard key={prospect.id} prospect={prospect} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
