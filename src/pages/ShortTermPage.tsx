import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF, formatDate } from '@/lib/format';
import { mockShortTermLicenses, mockProperties } from '@/lib/mock-data';
import { Search, Plus, Calendar, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

type LicenseType = 'POPUP' | 'EVENT' | 'KIOSK' | 'SEASONAL' | 'PRECAIRE' | 'HOURLY';
type LicenseStatus = 'RESERVED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'RENEWED';

const licenseTypeLabels: Record<LicenseType, string> = {
  POPUP: 'Pop-up',
  EVENT: 'Événement',
  KIOSK: 'Kiosque',
  SEASONAL: 'Saisonnier',
  PRECAIRE: 'Précaire',
  HOURLY: 'Horaire',
};

const licenseTypeVariants: Record<LicenseType, 'info' | 'warning' | 'success' | 'default'> = {
  POPUP: 'info',
  EVENT: 'warning',
  KIOSK: 'success',
  SEASONAL: 'default',
  PRECAIRE: 'default',
  HOURLY: 'default',
};

const statusLabels: Record<LicenseStatus, string> = {
  RESERVED: 'Réservée',
  ACTIVE: 'Active',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
  RENEWED: 'Renouvelée',
};

const statusVariants: Record<LicenseStatus, 'success' | 'info' | 'default' | 'error'> = {
  ACTIVE: 'success',
  RESERVED: 'info',
  COMPLETED: 'default',
  CANCELLED: 'error',
  RENEWED: 'success',
};

const statusFilterLabels: Record<string, string> = {
  ALL: 'Tous statuts',
  ACTIVE: 'Active',
  RESERVED: 'Réservée',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
};

export function ShortTermPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filtered = mockShortTermLicenses.filter((lic) => {
    if (statusFilter !== 'ALL' && lic.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const property = mockProperties.find((p) => p.id === lic.property_id);
      if (
        !lic.license_number?.toLowerCase().includes(q) &&
        !lic.occupant_name?.toLowerCase().includes(q) &&
        !(property?.property_code.toLowerCase().includes(q))
      ) return false;
    }
    return true;
  });

  const activeLicenses = mockShortTermLicenses.filter((l) => l.status === 'ACTIVE');
  const revenueMTD = activeLicenses.reduce((sum, l) => sum + (l.total_amount_ht ?? 0), 0);
  const totalLicenses = mockShortTermLicenses.length;
  const occupancyRate = totalLicenses > 0
    ? ((activeLicenses.length / totalLicenses) * 100).toFixed(1)
    : '0.0';

  const now = new Date();
  const expiringCount = mockShortTermLicenses.filter((l) => {
    if (l.status !== 'ACTIVE') return false;
    const end = new Date(l.end_date);
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 && daysLeft <= 30;
  }).length;

  return (
    <div>
      <Topbar title="Locations Éphémères" subtitle={`${mockShortTermLicenses.length} licences`} />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard
            label="Licences actives"
            value={`${activeLicenses.length}`}
            subtitle={`sur ${totalLicenses} total`}
            icon={Zap}
          />
          <StatCard
            label="Revenus MTD"
            value={formatXOF(revenueMTD)}
            subtitle="Montant HT"
            icon={TrendingUp}
          />
          <StatCard
            label="Taux occupation éphémère"
            value={`${occupancyRate}%`}
            subtitle="Licences actives / total"
            icon={Clock}
          />
          <StatCard
            label="Prochaines expirations"
            value={`${expiringCount}`}
            subtitle="Dans les 30 prochains jours"
            icon={AlertTriangle}
          />
        </div>

        {/* Filter toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher une licence..."
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
              {Object.entries(statusFilterLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Nouvelle licence
          </button>
        </div>

        {/* License cards */}
        <div className="space-y-2">
          {filtered.map((lic) => {
            const property = mockProperties.find((p) => p.id === lic.property_id);
            const pricingParts: string[] = [];
            if (lic.hourly_rate) pricingParts.push(`${formatXOF(lic.hourly_rate)} /h`);
            if (lic.daily_rate) pricingParts.push(`${formatXOF(lic.daily_rate)} /jour`);
            if (lic.weekly_rate) pricingParts.push(`${formatXOF(lic.weekly_rate)} /sem`);
            if (lic.monthly_rate) pricingParts.push(`${formatXOF(lic.monthly_rate)} /mois`);
            if (lic.flat_fee) pricingParts.push(`${formatXOF(lic.flat_fee)} forfait`);

            const depositReceived = lic.deposit_required && lic.deposit_received;
            const depositPending = lic.deposit_required && !lic.deposit_received;

            return (
              <div
                key={lic.id}
                className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Header row: license number + type badge + status badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-neutral-900">{lic.license_number}</span>
                      <Badge variant={licenseTypeVariants[lic.license_type as LicenseType]}>
                        {licenseTypeLabels[lic.license_type as LicenseType] || lic.license_type}
                      </Badge>
                      <Badge variant={statusVariants[lic.status as LicenseStatus]}>
                        {statusLabels[lic.status as LicenseStatus] || lic.status}
                      </Badge>
                      {depositReceived && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-2xs font-semibold bg-success-50 text-success-700">
                          Dépôt reçu
                        </span>
                      )}
                      {depositPending && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-2xs font-semibold bg-warning-50 text-warning-700">
                          Dépôt en attente
                        </span>
                      )}
                    </div>

                    {/* Occupant + property */}
                    <div className="text-xs text-neutral-700 font-medium mt-1">
                      {lic.occupant_name}
                      {property && (
                        <span className="text-neutral-400 ml-2 font-mono">{property.property_code}</span>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-2 mt-1.5 text-2xs text-neutral-500">
                      <Calendar size={10} className="text-neutral-400" />
                      <span className="font-mono">{formatDate(lic.start_date)}</span>
                      {lic.start_time && <span className="font-mono text-neutral-400">{lic.start_time}</span>}
                      <span>→</span>
                      <span className="font-mono">{formatDate(lic.end_date)}</span>
                      {lic.end_time && <span className="font-mono text-neutral-400">{lic.end_time}</span>}
                      <span className="text-neutral-400">·</span>
                      <span>{lic.duration_days ?? 0} jour{(lic.duration_days ?? 0) > 1 ? 's' : ''}</span>
                    </div>

                    {/* Pricing info */}
                    {pricingParts.length > 0 && (
                      <div className="flex items-center gap-3 mt-1.5 text-2xs text-neutral-500">
                        <span className="font-mono">{pricingParts.join(' · ')}</span>
                        {lic.rs_pct != null && lic.rs_pct > 0 && (
                          <>
                            <span className="text-neutral-400">·</span>
                            <span className="font-mono">RS {(lic.rs_pct * 100).toFixed(0)}%</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right side: amounts */}
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-xs font-mono font-bold text-neutral-900">{formatXOF(lic.total_amount_ht ?? 0)} HT</div>
                    <div className="text-2xs font-mono text-neutral-500 mt-0.5">
                      {formatXOF(lic.total_ttc ?? 0)} TTC
                    </div>
                    {lic.tva_rate != null && (
                      <div className="text-2xs text-neutral-400 mt-0.5">
                        TVA {(lic.tva_rate * 100).toFixed(0)}%
                      </div>
                    )}
                    {lic.deposit_required && lic.deposit_amount != null && (
                      <div className={clsx(
                        'text-2xs font-mono mt-1',
                        depositReceived ? 'text-success-600' : 'text-warning-600',
                      )}>
                        Dépôt {formatXOF(lic.deposit_amount)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {lic.notes && (
                  <div className="text-2xs text-neutral-400 mt-2 truncate">{lic.notes}</div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-xs text-neutral-400">
              Aucune licence trouvée
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
