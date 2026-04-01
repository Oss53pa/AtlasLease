import { Topbar } from '@/components/layout/Topbar';
import { formatXOF } from '@/lib/format';
import { mockProperties, mockLeases, mockTenants } from '@/lib/mock-data';
import { Layers } from 'lucide-react';
import { clsx } from 'clsx';

// ─── Build floor data from mock ─────────────────────────────

interface FloorData {
  floor: number;
  label: string;
  units: UnitData[];
  totalGLA: number;
  occupiedGLA: number;
}

interface UnitData {
  id: string;
  code: string;
  gla: number;
  status: string;
  tenantName: string | null;
  tradeName: string | null;
  leaseEnd: string | null;
  rentPerSqm: number | null;
  spaceType: string;
}

const floorLabels: Record<number, string> = {
  '-1': 'Sous-sol', 0: 'Rez-de-chaussée', 1: 'Étage 1', 2: 'Étage 2', 3: 'Étage 3',
};

const statusColors: Record<string, string> = {
  LEASED: 'bg-success-100 border-success-300 text-success-800',
  VACANT: 'bg-error-50 border-error-200 text-error-700',
  EPHEMERAL: 'bg-amber-50 border-amber-200 text-amber-700',
  UNDER_WORKS: 'bg-blue-50 border-blue-200 text-blue-700',
  RESERVED: 'bg-purple-50 border-purple-200 text-purple-700',
  TECHNICAL: 'bg-neutral-100 border-neutral-300 text-neutral-500',
  RETIRED: 'bg-neutral-50 border-neutral-200 text-neutral-400',
};

const statusLabels: Record<string, string> = {
  LEASED: 'Loué', VACANT: 'Vacant', EPHEMERAL: 'Éphémère', UNDER_WORKS: 'En travaux',
  RESERVED: 'Réservé', TECHNICAL: 'Technique', RETIRED: 'Retiré',
};

function buildFloors(): FloorData[] {
  const floorMap = new Map<number, UnitData[]>();

  for (const prop of mockProperties) {
    const lease = mockLeases.find(l => l.property_id === prop.id && ['ACTIVE', 'EXPIRING'].includes(l.status));
    const tenant = lease ? mockTenants.find(t => t.id === lease.tenant_id) : null;

    const unit: UnitData = {
      id: prop.id,
      code: prop.property_code,
      gla: prop.gla_sqm,
      status: prop.status,
      tenantName: tenant?.company_name ?? null,
      tradeName: tenant?.trade_name ?? null,
      leaseEnd: lease?.termination_date ?? null,
      rentPerSqm: lease && prop.gla_sqm > 0
        ? Math.round((mockLeases.find(l => l.id === lease.id)?.leased_sqm ?? prop.gla_sqm) * (prop.market_rent_sqm ?? 0) / prop.gla_sqm)
        : null,
      spaceType: prop.space_type,
    };

    if (!floorMap.has(prop.floor_number)) floorMap.set(prop.floor_number, []);
    floorMap.get(prop.floor_number)!.push(unit);
  }

  const floors: FloorData[] = [];
  for (const [floor, units] of floorMap) {
    const totalGLA = units.reduce((s, u) => s + u.gla, 0);
    const occupiedGLA = units.filter(u => u.status === 'LEASED' || u.status === 'EPHEMERAL').reduce((s, u) => s + u.gla, 0);
    floors.push({ floor, label: floorLabels[floor] ?? `Étage ${floor}`, units, totalGLA, occupiedGLA });
  }

  return floors.sort((a, b) => b.floor - a.floor);
}

const floors = buildFloors();
const totalGLA = floors.reduce((s, f) => s + f.totalGLA, 0);
const totalOccupied = floors.reduce((s, f) => s + f.occupiedGLA, 0);

// ─── Page ───────────────────────────────────────────────────

export function StackingPlanPage() {
  return (
    <div>
      <Topbar title="Stacking Plan" subtitle="Cosmos Yopougon — Vue par étage" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Summary */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers size={20} className="text-neutral-400" />
            <div>
              <div className="text-sm font-semibold text-neutral-900">Cosmos Yopougon</div>
              <div className="text-xs text-neutral-500">{mockProperties.length} lots — {formatXOF(totalGLA)} m² GLA — {floors.length} niveaux</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-lg font-bold text-neutral-900">{Math.round(totalOccupied / totalGLA * 100)}%</div>
              <div className="text-2xs text-neutral-400">Occupation</div>
            </div>
            <div className="flex items-center gap-2">
              {Object.entries(statusLabels).slice(0, 4).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1">
                  <div className={clsx('w-2.5 h-2.5 rounded-sm border', statusColors[key])} />
                  <span className="text-2xs text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stacking plan */}
        <div className="space-y-3">
          {floors.map((floor) => (
            <div key={floor.floor} className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              {/* Floor header */}
              <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">{floor.label}</span>
                  <span className="text-2xs text-neutral-400">{floor.totalGLA} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success-500 rounded-full"
                      style={{ width: `${floor.totalGLA > 0 ? (floor.occupiedGLA / floor.totalGLA) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-2xs font-mono text-neutral-500">
                    {floor.totalGLA > 0 ? Math.round(floor.occupiedGLA / floor.totalGLA * 100) : 0}%
                  </span>
                </div>
              </div>

              {/* Units */}
              <div className="flex gap-1 p-2">
                {floor.units.map((unit) => (
                  <div
                    key={unit.id}
                    className={clsx(
                      'border rounded-md p-2.5 cursor-pointer transition-all hover:shadow-sm',
                      statusColors[unit.status],
                    )}
                    style={{ flex: unit.gla, minWidth: 100 }}
                  >
                    <div className="text-2xs font-mono font-bold truncate">{unit.code}</div>
                    <div className="text-2xs font-semibold truncate mt-0.5">
                      {unit.tradeName || unit.tenantName || statusLabels[unit.status]}
                    </div>
                    <div className="text-2xs opacity-70 mt-0.5">{unit.gla} m² — {unit.spaceType}</div>
                    {unit.leaseEnd && (
                      <div className="text-2xs opacity-60 mt-0.5">→ {unit.leaseEnd}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
