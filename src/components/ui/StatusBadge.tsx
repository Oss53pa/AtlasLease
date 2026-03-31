import { Badge } from './Badge';
import type { LeaseStatus, InvoiceStatus, PropertyStatus, AmendmentStatus } from '@/types';

const leaseStatusMap: Record<LeaseStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'default' }> = {
  DRAFT: { label: 'Brouillon', variant: 'default' },
  ACTIVE: { label: 'Actif', variant: 'success' },
  EXPIRING: { label: 'Bientôt expiré', variant: 'warning' },
  EXPIRED: { label: 'Expiré', variant: 'error' },
  TERMINATED: { label: 'Résilié', variant: 'error' },
  HOLDOVER: { label: 'Maintien', variant: 'warning' },
  CANCELLED: { label: 'Annulé', variant: 'default' },
};

const invoiceStatusMap: Record<InvoiceStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'default' }> = {
  DRAFT: { label: 'Brouillon', variant: 'default' },
  VALIDATED: { label: 'Validée', variant: 'info' },
  ISSUED: { label: 'Émise', variant: 'info' },
  PARTIALLY_PAID: { label: 'Partiel', variant: 'warning' },
  PAID: { label: 'Payée', variant: 'success' },
  OVERDUE: { label: 'Impayée', variant: 'error' },
  CANCELLED: { label: 'Annulée', variant: 'default' },
};

const propertyStatusMap: Record<PropertyStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'default' }> = {
  VACANT: { label: 'Vacant', variant: 'error' },
  LEASED: { label: 'Loué', variant: 'success' },
  EPHEMERAL: { label: 'Éphémère', variant: 'info' },
  UNDER_WORKS: { label: 'Travaux', variant: 'warning' },
  RESERVED: { label: 'Réservé', variant: 'info' },
  TECHNICAL: { label: 'Technique', variant: 'default' },
  RETIRED: { label: 'Retiré', variant: 'default' },
};

const amendmentStatusMap: Record<AmendmentStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'default' }> = {
  DRAFT: { label: 'Brouillon', variant: 'default' },
  NEGOTIATION: { label: 'Négociation', variant: 'info' },
  PENDING_APPROVAL: { label: 'En approbation', variant: 'warning' },
  APPROVED: { label: 'Approuvé', variant: 'success' },
  SIGNED: { label: 'Signé', variant: 'success' },
  ACTIVE: { label: 'Actif', variant: 'success' },
  SUPERSEDED: { label: 'Remplacé', variant: 'default' },
};

export function LeaseStatusBadge({ status }: { status: LeaseStatus }) {
  const s = leaseStatusMap[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const s = invoiceStatusMap[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}

export function PropertyStatusBadge({ status }: { status: PropertyStatus }) {
  const s = propertyStatusMap[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}

export function AmendmentStatusBadge({ status }: { status: AmendmentStatus }) {
  const s = amendmentStatusMap[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
