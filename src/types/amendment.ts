import type { AmendmentType, AmendmentStatus } from './enums';

// ─── Domain 9: Amendments ────────────────────────────────────

export interface AmendmentFinancialImpact {
  monthly_delta: number;
  annual_delta: number;
  npv_delta?: number;
  wale_delta_years?: number;
  old_termination_date?: string;
  new_termination_date?: string;
}

export interface LeaseAmendment {
  id: string;
  organization_id: string;
  lease_id: string;
  amendment_number: string;
  type: AmendmentType;
  status: AmendmentStatus;
  effective_date: string;
  execution_date?: string;
  version: number;
  is_final_version: boolean;
  description?: string;
  financial_impact?: AmendmentFinancialImpact;
  requires_approval: boolean;
  approval_threshold_hit?: string;
  submitted_to?: string;
  submitted_at?: string;
  approved_by?: string;
  approved_at?: string;
  rejected_by?: string;
  rejected_at?: string;
  rejection_reason?: string;
  document_url?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  // Joined
  changes?: LeaseAmendmentChange[];
  versions?: AmendmentVersion[];
}

export interface LeaseAmendmentChange {
  id: string;
  amendment_id: string;
  section?: string;
  field_name: string;
  old_value: unknown;
  new_value: unknown;
  article_reference?: string;
  display_label?: string;
}

export interface AmendmentVersion {
  id: string;
  amendment_id: string;
  version_number: number;
  version_label?: string;
  conditions: Record<string, unknown>;
  sent_to_tenant: boolean;
  sent_at?: string;
  tenant_response?: string;
  tenant_response_at?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
}
