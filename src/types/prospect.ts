import type {
  ProspectStatus,
  ProspectSource,
  LifecycleStage,
  TimelineEventType,
} from './enums';

// ─── Domain 16: Prospects ────────────────────────────────────

export interface Prospect {
  id: string;
  organization_id: string;
  company_name: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  activity_sector?: string;
  surface_min_sqm?: number;
  surface_max_sqm?: number;
  target_zone?: string;
  budget_rent_max?: number;
  target_opening?: string;
  source?: ProspectSource;
  status: ProspectStatus;
  match_score?: number;
  matched_properties?: unknown[];
  converted_to_lease?: string;
  converted_at?: string;
  lost_reason?: string;
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// ─── Domain 17: Tenant Lifecycle (Dossier Locataire) ────────

export interface TenantDossier {
  id: string;
  organization_id: string;
  tenant_id?: string;
  prospect_id?: string;
  stage: LifecycleStage;
  company_name: string;
  trade_name?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  activity_sector?: string;
  surface_need_min?: number;
  surface_need_max?: number;
  budget_rent_max?: number;
  target_property_id?: string;
  source?: ProspectSource;
  match_score?: number;
  reservation_date?: string;
  reservation_expiry?: string;
  reservation_deposit?: number;
  reservation_deposit_paid?: boolean;
  lease_id?: string;
  amenagement_start?: string;
  amenagement_end?: string;
  amenagement_budget?: number;
  exploitation_start?: string;
  lost_reason?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface TenantTimelineEvent {
  id: string;
  dossier_id: string;
  event_type: TimelineEventType;
  title: string;
  description?: string;
  stage: LifecycleStage;
  created_by?: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}
