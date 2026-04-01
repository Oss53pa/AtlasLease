import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { TrendingUp, Plus, GitCompare } from 'lucide-react';
import { clsx } from 'clsx';

// ─── Types ──────────────────────────────────────────────────

type EventType = 'DEPARTURE' | 'RENEWAL' | 'RENEGOTIATION' | 'VACANCY' | 'DISPOSAL';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  base_date: string;
  status: 'DRAFT' | 'COMPUTED' | 'ARCHIVED';
  events: SimulationEvent[];
  results: SimulationResult[];
}

interface SimulationEvent {
  id: string;
  event_type: EventType;
  tenant_name: string;
  event_date: string;
  params: Record<string, unknown>;
}

interface SimulationResult {
  projection_year: number;
  noi_projected: number;
  occupancy_rate: number;
  wale_years: number;
  passing_rent: number;
  vacancy_cost: number;
  delta_vs_base: number;
}

// ─── Mock Data ──────────────────────────────────────────────

const baseNOI = 850_000_000;

const mockScenarios: SimulationScenario[] = [
  {
    id: 's1', name: 'Scénario de base (statu quo)', description: 'Aucun changement — projection des baux en cours jusqu\'à échéance',
    base_date: '2026-04-01', status: 'COMPUTED',
    events: [],
    results: [
      { projection_year: 2026, noi_projected: 850_000_000, occupancy_rate: 92, wale_years: 4.2, passing_rent: 1_020_000_000, vacancy_cost: 48_000_000, delta_vs_base: 0 },
      { projection_year: 2027, noi_projected: 870_000_000, occupancy_rate: 90, wale_years: 3.5, passing_rent: 1_044_000_000, vacancy_cost: 60_000_000, delta_vs_base: 0 },
      { projection_year: 2028, noi_projected: 830_000_000, occupancy_rate: 85, wale_years: 2.8, passing_rent: 996_000_000, vacancy_cost: 96_000_000, delta_vs_base: 0 },
      { projection_year: 2029, noi_projected: 810_000_000, occupancy_rate: 82, wale_years: 2.1, passing_rent: 972_000_000, vacancy_cost: 120_000_000, delta_vs_base: 0 },
      { projection_year: 2030, noi_projected: 780_000_000, occupancy_rate: 78, wale_years: 1.5, passing_rent: 936_000_000, vacancy_cost: 156_000_000, delta_vs_base: 0 },
    ],
  },
  {
    id: 's2', name: 'Départ CFAO + Vacance 6 mois', description: 'CFAO Retail ne renouvelle pas — vacance estimée 6 mois puis relocation à -10%',
    base_date: '2026-04-01', status: 'COMPUTED',
    events: [
      { id: 'e1', event_type: 'DEPARTURE', tenant_name: 'CFAO Retail (Carrefour)', event_date: '2027-03-15', params: { vacancy_months: 6, relocation_rent_delta: -0.10 } },
    ],
    results: [
      { projection_year: 2026, noi_projected: 850_000_000, occupancy_rate: 92, wale_years: 4.2, passing_rent: 1_020_000_000, vacancy_cost: 48_000_000, delta_vs_base: 0 },
      { projection_year: 2027, noi_projected: 780_000_000, occupancy_rate: 82, wale_years: 3.1, passing_rent: 936_000_000, vacancy_cost: 120_000_000, delta_vs_base: -90_000_000 },
      { projection_year: 2028, noi_projected: 820_000_000, occupancy_rate: 88, wale_years: 3.8, passing_rent: 984_000_000, vacancy_cost: 72_000_000, delta_vs_base: -10_000_000 },
      { projection_year: 2029, noi_projected: 835_000_000, occupancy_rate: 88, wale_years: 3.2, passing_rent: 1_002_000_000, vacancy_cost: 72_000_000, delta_vs_base: 25_000_000 },
      { projection_year: 2030, noi_projected: 845_000_000, occupancy_rate: 88, wale_years: 2.5, passing_rent: 1_014_000_000, vacancy_cost: 72_000_000, delta_vs_base: 65_000_000 },
    ],
  },
  {
    id: 's3', name: 'Renégociation Orange -15%', description: 'Orange renégocie son loyer à la baisse de 15% pour rester 5 ans de plus',
    base_date: '2026-04-01', status: 'COMPUTED',
    events: [
      { id: 'e2', event_type: 'RENEGOTIATION', tenant_name: 'Orange Store', event_date: '2026-09-01', params: { rent_delta: -0.15, extension_years: 5 } },
    ],
    results: [
      { projection_year: 2026, noi_projected: 838_000_000, occupancy_rate: 92, wale_years: 4.8, passing_rent: 1_005_600_000, vacancy_cost: 48_000_000, delta_vs_base: -12_000_000 },
      { projection_year: 2027, noi_projected: 856_000_000, occupancy_rate: 92, wale_years: 4.2, passing_rent: 1_027_200_000, vacancy_cost: 48_000_000, delta_vs_base: -14_000_000 },
      { projection_year: 2028, noi_projected: 845_000_000, occupancy_rate: 92, wale_years: 3.5, passing_rent: 1_014_000_000, vacancy_cost: 48_000_000, delta_vs_base: 15_000_000 },
      { projection_year: 2029, noi_projected: 855_000_000, occupancy_rate: 92, wale_years: 2.8, passing_rent: 1_026_000_000, vacancy_cost: 48_000_000, delta_vs_base: 45_000_000 },
      { projection_year: 2030, noi_projected: 860_000_000, occupancy_rate: 92, wale_years: 2.1, passing_rent: 1_032_000_000, vacancy_cost: 48_000_000, delta_vs_base: 80_000_000 },
    ],
  },
];

const eventTypeLabels: Record<EventType, { label: string; variant: 'error' | 'success' | 'warning' | 'info' | 'default' }> = {
  DEPARTURE: { label: 'Départ', variant: 'error' },
  RENEWAL: { label: 'Renouvellement', variant: 'success' },
  RENEGOTIATION: { label: 'Renégociation', variant: 'warning' },
  VACANCY: { label: 'Vacance', variant: 'default' },
  DISPOSAL: { label: 'Cession', variant: 'info' },
};

// ─── Page ───────────────────────────────────────────────────

export function SimulationPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['s1', 's2']);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev,
    );
  };

  const selectedScenarios = mockScenarios.filter((s) => selectedIds.includes(s.id));

  return (
    <div>
      <Topbar title="Simulation What-if" subtitle="M17 — Modélisation d'impact portefeuille" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* KPI */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="NOI actuel" value={formatXOF(baseNOI)} subtitle="Référence 2026" icon={TrendingUp} />
          <StatCard label="Scénarios créés" value={String(mockScenarios.length)} subtitle="1 base + 2 what-if" icon={GitCompare} />
          <StatCard label="Pire cas N+1" value={formatXOF(780_000_000)} subtitle="Départ CFAO" icon={TrendingUp} />
          <StatCard label="Meilleur cas N+4" value={formatXOF(860_000_000)} subtitle="Renégo Orange" icon={TrendingUp} />
        </div>

        {/* Scenarios selector */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">Scénarios (sélectionnez 2-3 pour comparer)</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Nouveau scénario
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {mockScenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => toggleSelect(scenario.id)}
              className={clsx(
                'bg-white border rounded-lg p-4 cursor-pointer transition-all',
                selectedIds.includes(scenario.id)
                  ? 'border-neutral-900 ring-1 ring-neutral-900'
                  : 'border-neutral-200 hover:border-neutral-300',
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-bold text-neutral-900">{scenario.name}</span>
                <Badge variant={scenario.status === 'COMPUTED' ? 'success' : 'default'}>{scenario.status}</Badge>
              </div>
              <p className="text-2xs text-neutral-500 mb-3">{scenario.description}</p>
              {scenario.events.length > 0 && (
                <div className="space-y-1">
                  {scenario.events.map((ev) => {
                    const meta = eventTypeLabels[ev.event_type];
                    return (
                      <div key={ev.id} className="flex items-center gap-1.5">
                        <Badge variant={meta.variant}>{meta.label}</Badge>
                        <span className="text-2xs text-neutral-600">{ev.tenant_name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison table */}
        {selectedScenarios.length >= 2 && (
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
              <h3 className="text-xs font-bold text-neutral-900">Comparaison des projections N → N+4</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-2.5 font-semibold text-neutral-500">Année</th>
                  {selectedScenarios.map((s) => (
                    <th key={s.id} colSpan={2} className="text-center px-4 py-2.5 font-semibold text-neutral-900 border-l border-neutral-200">
                      {s.name.length > 30 ? s.name.slice(0, 30) + '...' : s.name}
                    </th>
                  ))}
                </tr>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th></th>
                  {selectedScenarios.map((s) => (
                    <><th key={`${s.id}-noi`} className="text-right px-3 py-2 font-semibold text-neutral-500 border-l border-neutral-200">NOI</th>
                    <th key={`${s.id}-occ`} className="text-right px-3 py-2 font-semibold text-neutral-500">Occupation</th></>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4].map((idx) => (
                  <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-2.5 font-mono font-semibold text-neutral-900">
                      {selectedScenarios[0]?.results[idx]?.projection_year}
                    </td>
                    {selectedScenarios.map((s) => {
                      const r = s.results[idx];
                      if (!r) return <><td key={`${s.id}-${idx}-n`}></td><td key={`${s.id}-${idx}-o`}></td></>;
                      return (
                        <><td key={`${s.id}-${idx}-n`} className="px-3 py-2.5 text-right font-mono border-l border-neutral-200">
                          <span className="text-neutral-900">{formatXOF(r.noi_projected)}</span>
                          {r.delta_vs_base !== 0 && (
                            <span className={clsx('ml-1 text-2xs', r.delta_vs_base > 0 ? 'text-success-600' : 'text-error-600')}>
                              {r.delta_vs_base > 0 ? '+' : ''}{formatXOF(r.delta_vs_base)}
                            </span>
                          )}
                        </td>
                        <td key={`${s.id}-${idx}-o`} className="px-3 py-2.5 text-right font-mono text-neutral-600">{r.occupancy_rate}%</td></>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
