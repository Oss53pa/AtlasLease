import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF, formatDate } from '@/lib/format';
import { mockAdInventory, mockAdContracts } from '@/lib/mock-data';
import { Megaphone, BarChart3, TrendingUp, FileText, Eye, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

type Tab = 'inventory' | 'contracts';

const adTypeLabels: Record<string, string> = {
  STATIC_PANEL: 'Panneau fixe',
  LED_SCREEN: 'Ecran LED',
  TOTEM: 'Totem',
  FLOOR_STICKER: 'Sticker sol',
  HANGING_BANNER: 'Bannière suspendue',
  NAMING_RIGHT: 'Naming',
  DIGITAL_INTERACTIVE: 'Borne interactive',
  WINDOW_DISPLAY: 'Vitrine',
};

const adTypeVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  STATIC_PANEL: 'default',
  LED_SCREEN: 'info',
  TOTEM: 'warning',
  FLOOR_STICKER: 'default',
  HANGING_BANNER: 'success',
  NAMING_RIGHT: 'error',
  DIGITAL_INTERACTIVE: 'info',
  WINDOW_DISPLAY: 'warning',
};

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  AVAILABLE: 'success',
  BOOKED: 'info',
  MAINTENANCE: 'warning',
};

const statusLabels: Record<string, string> = {
  AVAILABLE: 'Disponible',
  BOOKED: 'Réservé',
  MAINTENANCE: 'Maintenance',
};

const contractTypeLabels: Record<string, string> = {
  FIXED_FEE: 'Forfait',
  CPM: 'CPM',
  REVENUE_SHARE: 'Revenue share',
  BARTER: 'Barter',
  NAMING_RIGHT: 'Naming',
};

const contractTypeVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  FIXED_FEE: 'default',
  CPM: 'info',
  REVENUE_SHARE: 'success',
  BARTER: 'warning',
  NAMING_RIGHT: 'error',
};

const contractStatusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  ACTIVE: 'success',
  DRAFT: 'default',
  EXPIRED: 'warning',
  CANCELLED: 'error',
};

const contractStatusLabels: Record<string, string> = {
  ACTIVE: 'Actif',
  DRAFT: 'Brouillon',
  EXPIRED: 'Expiré',
  CANCELLED: 'Annulé',
};

export function AdvertisingPage() {
  const [tab, setTab] = useState<Tab>('inventory');

  const totalSpaces = mockAdInventory.length;
  const bookedSpaces = mockAdInventory.filter((a) => a.status === 'BOOKED').length;
  const occupancyRate = totalSpaces > 0 ? ((bookedSpaces / totalSpaces) * 100).toFixed(1) : '0';
  const activeContracts = mockAdContracts.filter((c) => c.status === 'ACTIVE');
  const revenueMTD = activeContracts.reduce((s, c) => s + (c.net_amount_ht || 0), 0);

  return (
    <div>
      <Topbar title="Régie Publicitaire" subtitle="Inventaire & contrats pub" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard
            label="Espaces publicitaires"
            value={`${totalSpaces}`}
            subtitle={`${bookedSpaces} réservés · ${totalSpaces - bookedSpaces} disponibles`}
            icon={Megaphone}
          />
          <StatCard
            label="Taux d'utilisation"
            value={`${occupancyRate}%`}
            subtitle={`${bookedSpaces}/${totalSpaces} espaces`}
            icon={BarChart3}
          />
          <StatCard
            label="Revenus pub MTD"
            value={formatXOF(revenueMTD)}
            subtitle="Contrats actifs (net HT)"
            icon={TrendingUp}
          />
          <StatCard
            label="Contrats actifs"
            value={`${activeContracts.length}`}
            subtitle={`${mockAdContracts.length} total`}
            icon={FileText}
          />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 border-b border-neutral-200">
          <button
            onClick={() => setTab('inventory')}
            className={clsx(
              'px-4 py-2 text-xs font-semibold border-b-2 transition-colors',
              tab === 'inventory'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-600',
            )}
          >
            Inventaire
          </button>
          <button
            onClick={() => setTab('contracts')}
            className={clsx(
              'px-4 py-2 text-xs font-semibold border-b-2 transition-colors',
              tab === 'contracts'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-600',
            )}
          >
            Contrats
          </button>
        </div>

        {/* Inventory tab */}
        {tab === 'inventory' && (
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Code</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Type</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Emplacement</th>
                  <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Dimensions</th>
                  <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Footfall/j</th>
                  <th className="px-4 py-2.5 text-center text-2xs font-bold uppercase tracking-wide text-neutral-500">Visibilité</th>
                  <th className="px-4 py-2.5 text-right text-2xs font-bold uppercase tracking-wide text-neutral-500">Tarif mensuel</th>
                  <th className="px-4 py-2.5 text-left text-2xs font-bold uppercase tracking-wide text-neutral-500">Statut</th>
                </tr>
              </thead>
              <tbody>
                {mockAdInventory.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <td className="px-4 py-2.5 text-xs font-mono font-semibold text-neutral-900">{item.inventory_code}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={adTypeVariant[item.ad_type] || 'default'}>
                        {adTypeLabels[item.ad_type] || item.ad_type}
                      </Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="text-xs text-neutral-900">{item.location_description}</div>
                      <div className="text-2xs text-neutral-400">{item.zone}</div>
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right text-neutral-600">
                      {item.width_m && item.height_m ? `${item.width_m} x ${item.height_m} m` : '—'}
                      {item.surface_sqm && <div className="text-2xs text-neutral-400">{item.surface_sqm} m²</div>}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right text-neutral-900">
                      {item.daily_footfall ? formatXOF(item.daily_footfall) : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {item.visibility_score != null ? (
                        <div className="inline-flex items-center gap-1">
                          <Eye size={12} className="text-neutral-400" />
                          <span className={clsx(
                            'text-xs font-mono font-semibold',
                            item.visibility_score >= 80 ? 'text-success-600' : item.visibility_score >= 60 ? 'text-warning-600' : 'text-neutral-500',
                          )}>
                            {item.visibility_score}
                          </span>
                        </div>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-right font-semibold text-neutral-900">
                      {item.rate_card_monthly ? formatXOF(item.rate_card_monthly) : '—'}
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={statusVariant[item.status] || 'default'}>
                        {statusLabels[item.status] || item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contracts tab */}
        {tab === 'contracts' && (
          <div className="grid grid-cols-2 gap-3">
            {mockAdContracts.map((contract) => {
              const inventory = mockAdInventory.find((a) => a.id === contract.inventory_id);
              return (
                <div key={contract.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs font-mono font-bold text-neutral-900">{contract.contract_number}</div>
                      <div className="text-xs text-neutral-700 mt-0.5">{contract.advertiser_name}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={contractTypeVariant[contract.contract_type] || 'default'}>
                        {contractTypeLabels[contract.contract_type] || contract.contract_type}
                      </Badge>
                      <Badge variant={contractStatusVariant[contract.status] || 'default'}>
                        {contractStatusLabels[contract.status] || contract.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-2xs text-neutral-500 mb-3">
                    <span className="font-mono">{formatDate(contract.start_date)}</span>
                    <ArrowRight size={10} />
                    <span className="font-mono">{formatDate(contract.end_date)}</span>
                  </div>

                  {inventory && (
                    <div className="text-2xs text-neutral-400 mb-3">
                      Espace : <span className="font-mono text-neutral-600">{inventory.inventory_code}</span> — {inventory.location_description}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100">
                    <div>
                      <div className="text-2xs text-neutral-400">Montant HT</div>
                      <div className="text-xs font-mono font-semibold text-neutral-900">
                        {contract.total_amount_ht ? formatXOF(contract.total_amount_ht) : '—'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xs text-neutral-400">Remise</div>
                      <div className="text-xs font-mono font-semibold text-neutral-600">
                        {contract.discount_pct > 0 ? `${contract.discount_pct}%` : '—'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xs text-neutral-400">Net HT</div>
                      <div className="text-xs font-mono font-bold text-neutral-900">
                        {contract.net_amount_ht ? formatXOF(contract.net_amount_ht) : '—'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
