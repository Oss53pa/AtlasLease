import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF, formatDate } from '@/lib/format';
import { mockParkingSpots, mockParkingSubscriptions } from '@/lib/mock-data';
import { Car, ParkingSquare, CreditCard, Users } from 'lucide-react';
import { clsx } from 'clsx';

type Tab = 'spots' | 'subscriptions';

const typeLabels: Record<string, string> = {
  SUBSCRIPTION: 'Abonnement',
  HOURLY: 'Horaire',
  RESERVED: 'Réservé',
  EVENT: 'Événement',
};

const zoneBg: Record<string, string> = {
  A: 'bg-neutral-900',
  B: 'bg-neutral-600',
  C: 'bg-neutral-400',
};

const statusDot: Record<string, string> = {
  OCCUPIED: 'bg-success-500',
  AVAILABLE: 'bg-neutral-300',
  RESERVED: 'bg-info-500',
};

const statusLabel: Record<string, string> = {
  OCCUPIED: 'Occupée',
  AVAILABLE: 'Disponible',
  RESERVED: 'Réservée',
};

const subStatusVariant: Record<string, 'success' | 'error' | 'warning'> = {
  ACTIVE: 'success',
  EXPIRED: 'error',
  PENDING: 'warning',
};

const subStatusLabel: Record<string, string> = {
  ACTIVE: 'Actif',
  EXPIRED: 'Expiré',
  PENDING: 'En attente',
};

export function ParkingPage() {
  const [tab, setTab] = useState<Tab>('spots');

  const totalSpots = mockParkingSpots.length;
  const occupiedSpots = mockParkingSpots.filter((s) => s.status === 'OCCUPIED').length;
  const monthlyRevenue = mockParkingSubscriptions
    .filter((s) => s.status === 'ACTIVE')
    .reduce((sum, s) => sum + s.monthly_rate, 0);
  const activeSubscriptions = mockParkingSubscriptions.filter((s) => s.status === 'ACTIVE').length;

  return (
    <div>
      <Topbar title="Parking" subtitle="Abonnements & réservations" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Places totales" value={String(totalSpots)} subtitle="Toutes zones confondues" icon={ParkingSquare} />
          <StatCard label="Occupées" value={String(occupiedSpots)} subtitle={`${((occupiedSpots / Math.max(1, totalSpots)) * 100).toFixed(0)}% d'occupation`} icon={Car} />
          <StatCard label="Revenus mensuels" value={formatXOF(monthlyRevenue)} subtitle="Abonnements actifs" icon={CreditCard} />
          <StatCard label="Abonnements actifs" value={String(activeSubscriptions)} subtitle={`${mockParkingSubscriptions.length} au total`} icon={Users} />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-0 border-b border-neutral-200">
          {([
            { key: 'spots' as Tab, label: 'Plan des places' },
            { key: 'subscriptions' as Tab, label: 'Abonnements' },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={clsx(
                'px-4 py-2 text-xs font-semibold transition-colors border-b-2 -mb-px',
                tab === t.key
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Spots tab */}
        {tab === 'spots' && (
          <div className="grid grid-cols-3 gap-3">
            {mockParkingSpots.map((spot) => (
              <div key={spot.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={clsx('inline-flex items-center justify-center w-7 h-7 rounded text-xs font-bold text-white', zoneBg[spot.zone] || 'bg-neutral-500')}>
                      {spot.zone}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">{spot.id.toUpperCase()}</div>
                      <div className="text-2xs text-neutral-500">{typeLabels[spot.type] || spot.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={clsx('w-2 h-2 rounded-full', statusDot[spot.status] || 'bg-neutral-300')} />
                    <span className="text-2xs text-neutral-500">{statusLabel[spot.status] || spot.status}</span>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {spot.tenant_name && (
                    <div className="text-xs text-neutral-900 font-medium">{spot.tenant_name}</div>
                  )}
                  {spot.plate_number && (
                    <div className="text-2xs font-mono text-neutral-500">{spot.plate_number}</div>
                  )}
                  {spot.monthly_rate > 0 && (
                    <div className="text-xs font-mono font-semibold text-neutral-700">{formatXOF(spot.monthly_rate)} XOF/mois</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subscriptions tab */}
        {tab === 'subscriptions' && (
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Locataire</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Zone</th>
                  <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Places</th>
                  <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Tarif/mois</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Début</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Fin</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Immatriculations</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Statut</th>
                </tr>
              </thead>
              <tbody>
                {mockParkingSubscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <td className="px-4 py-2.5 text-xs font-medium text-neutral-900">{sub.tenant_name}</td>
                    <td className="px-4 py-2.5">
                      <span className={clsx('inline-flex items-center justify-center w-6 h-6 rounded text-2xs font-bold text-white', zoneBg[sub.zone] || 'bg-neutral-500')}>
                        {sub.zone}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right">{sub.spots_count}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right font-semibold">{formatXOF(sub.monthly_rate)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-neutral-600">{formatDate(sub.start_date)}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-neutral-600">{formatDate(sub.end_date)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {sub.plate_numbers.map((plate) => (
                          <span key={plate} className="text-2xs font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">{plate}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={subStatusVariant[sub.status] || 'default'}>{subStatusLabel[sub.status] || sub.status}</Badge>
                    </td>
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
