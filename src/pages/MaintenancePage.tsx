import { Topbar } from '@/components/layout/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { formatXOF } from '@/lib/format';
import { Wrench, Plus, AlertTriangle, CheckCircle2, Clock, ExternalLink } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────

type RequestType = 'BREAKDOWN' | 'PREVENTIVE' | 'IMPROVEMENT';
type Responsibility = 'LANDLORD' | 'TENANT' | 'SHARED' | 'PENDING_REVIEW';
type RequestStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'INVOICED';

interface MaintenanceRequest {
  id: string;
  lease_tenant_name: string;
  unit_code: string;
  request_type: RequestType;
  description: string;
  responsibility: Responsibility;
  wisefm_wo_id: string | null;
  status: RequestStatus;
  reported_at: string;
  resolved_at: string | null;
  cost_total: number;
  cost_landlord: number;
  cost_tenant: number;
  to_invoice_tenant: boolean;
}

// ─── Mock Data ──────────────────────────────────────────────

const mockRequests: MaintenanceRequest[] = [
  { id: 'mr1', lease_tenant_name: 'CFAO Retail (Carrefour)', unit_code: 'LOT-RDC-001', request_type: 'BREAKDOWN', description: 'Climatisation en panne — groupe CVC zone A', responsibility: 'LANDLORD', wisefm_wo_id: 'WO-2026-0345', status: 'IN_PROGRESS', reported_at: '2026-03-28T10:30:00', resolved_at: null, cost_total: 750000, cost_landlord: 750000, cost_tenant: 0, to_invoice_tenant: false },
  { id: 'mr2', lease_tenant_name: 'Orange Store', unit_code: 'LOT-RDC-002', request_type: 'BREAKDOWN', description: 'Fuite d\'eau dans le faux plafond', responsibility: 'LANDLORD', wisefm_wo_id: 'WO-2026-0348', status: 'OPEN', reported_at: '2026-03-30T14:15:00', resolved_at: null, cost_total: 0, cost_landlord: 0, cost_tenant: 0, to_invoice_tenant: false },
  { id: 'mr3', lease_tenant_name: 'Chez Tantie', unit_code: 'LOT-RDC-003', request_type: 'BREAKDOWN', description: 'Hotte aspirante défaillante — extraction fumée', responsibility: 'TENANT', wisefm_wo_id: null, status: 'RESOLVED', reported_at: '2026-03-15T09:00:00', resolved_at: '2026-03-20T16:00:00', cost_total: 450000, cost_landlord: 0, cost_tenant: 450000, to_invoice_tenant: true },
  { id: 'mr4', lease_tenant_name: 'Jumia', unit_code: 'LOT-R1-001', request_type: 'PREVENTIVE', description: 'Remplacement filtre CVC — maintenance préventive Q1', responsibility: 'LANDLORD', wisefm_wo_id: 'WO-2026-0312', status: 'RESOLVED', reported_at: '2026-03-01T08:00:00', resolved_at: '2026-03-05T17:00:00', cost_total: 280000, cost_landlord: 280000, cost_tenant: 0, to_invoice_tenant: false },
  { id: 'mr5', lease_tenant_name: 'Canal+ Store', unit_code: 'LOT-R1-002', request_type: 'IMPROVEMENT', description: 'Demande renforcement éclairage LED local', responsibility: 'SHARED', wisefm_wo_id: null, status: 'OPEN', reported_at: '2026-03-29T11:00:00', resolved_at: null, cost_total: 1200000, cost_landlord: 600000, cost_tenant: 600000, to_invoice_tenant: true },
  { id: 'mr6', lease_tenant_name: 'Banque Atlantique', unit_code: 'LOT-R1-003', request_type: 'BREAKDOWN', description: 'Porte automatique bloquée — accès principal', responsibility: 'LANDLORD', wisefm_wo_id: 'WO-2026-0350', status: 'IN_PROGRESS', reported_at: '2026-03-31T07:30:00', resolved_at: null, cost_total: 0, cost_landlord: 0, cost_tenant: 0, to_invoice_tenant: false },
];

const typeLabels: Record<RequestType, { label: string; variant: 'error' | 'info' | 'warning' }> = {
  BREAKDOWN: { label: 'Panne', variant: 'error' },
  PREVENTIVE: { label: 'Préventif', variant: 'info' },
  IMPROVEMENT: { label: 'Amélioration', variant: 'warning' },
};

const respLabels: Record<Responsibility, { label: string; variant: 'default' | 'success' | 'warning' | 'info' }> = {
  LANDLORD: { label: 'Bailleur', variant: 'info' },
  TENANT: { label: 'Locataire', variant: 'warning' },
  SHARED: { label: 'Partagé', variant: 'default' },
  PENDING_REVIEW: { label: 'À déterminer', variant: 'default' },
};

const statusLabels: Record<RequestStatus, { label: string; variant: 'default' | 'info' | 'success' | 'warning' }> = {
  OPEN: { label: 'Ouvert', variant: 'warning' },
  IN_PROGRESS: { label: 'En cours', variant: 'info' },
  RESOLVED: { label: 'Résolu', variant: 'success' },
  INVOICED: { label: 'Facturé', variant: 'default' },
};

const openCount = mockRequests.filter(r => r.status === 'OPEN').length;
const inProgressCount = mockRequests.filter(r => r.status === 'IN_PROGRESS').length;
const totalCostLandlord = mockRequests.reduce((s, r) => s + r.cost_landlord, 0);
const totalCostTenant = mockRequests.reduce((s, r) => s + r.cost_tenant, 0);

// ─── Page ───────────────────────────────────────────────────

export function MaintenancePage() {
  return (
    <div>
      <Topbar title="Maintenance" subtitle="M18 — Demandes locataires & lien WiseFM" />

      <div className="p-6 space-y-5 animate-fade-in">
        {/* KPI */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Demandes ouvertes" value={String(openCount)} subtitle="En attente de traitement" icon={AlertTriangle} />
          <StatCard label="En cours" value={String(inProgressCount)} subtitle="WiseFM en intervention" icon={Clock} />
          <StatCard label="Coût bailleur (YTD)" value={formatXOF(totalCostLandlord)} subtitle="Mars 2026" icon={Wrench} />
          <StatCard label="À facturer locataires" value={formatXOF(totalCostTenant)} subtitle={`${mockRequests.filter(r => r.to_invoice_tenant).length} demande(s)`} icon={CheckCircle2} />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
              <button key={status} className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
                {status === 'ALL' ? 'Toutes' : statusLabels[status as RequestStatus]?.label}
                <span className="ml-1 text-2xs font-mono text-neutral-400">
                  {status === 'ALL' ? mockRequests.length : mockRequests.filter(r => r.status === status).length}
                </span>
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 transition-colors">
            <Plus size={14} />
            Nouvelle demande
          </button>
        </div>

        {/* Requests list */}
        <div className="space-y-2">
          {mockRequests.map((req) => {
            const typeMeta = typeLabels[req.request_type];
            const respMeta = respLabels[req.responsibility];
            const statusMeta = statusLabels[req.status];

            return (
              <div key={req.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={typeMeta.variant}>{typeMeta.label}</Badge>
                      <Badge variant={respMeta.variant}>{respMeta.label}</Badge>
                      <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
                      {req.wisefm_wo_id && (
                        <span className="flex items-center gap-1 text-2xs text-blue-500 font-mono">
                          <ExternalLink size={10} />
                          {req.wisefm_wo_id}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-neutral-900 mb-0.5">{req.description}</div>
                    <div className="text-2xs text-neutral-500">
                      {req.lease_tenant_name} — {req.unit_code} — Signalé le {new Date(req.reported_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    {req.cost_total > 0 && (
                      <>
                        <div className="text-xs font-mono font-bold text-neutral-900">{formatXOF(req.cost_total)} XOF</div>
                        <div className="text-2xs text-neutral-500">
                          {req.cost_landlord > 0 && <span>Bailleur : {formatXOF(req.cost_landlord)}</span>}
                          {req.cost_landlord > 0 && req.cost_tenant > 0 && <span> | </span>}
                          {req.cost_tenant > 0 && <span className="text-warning-600">Locataire : {formatXOF(req.cost_tenant)}</span>}
                        </div>
                      </>
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
