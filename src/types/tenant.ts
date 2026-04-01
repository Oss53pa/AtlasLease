import type { KycStatus, SolvencyScore } from './enums';

// ─── Domain 2: Tenants & KYC ─────────────────────────────────

export interface Tenant {
  id: string;
  organization_id: string;
  company_name: string;
  trade_name?: string;
  legal_form?: string;
  activity_sector?: string;
  activity_type?: string;
  rccm_number?: string;
  tax_id?: string;
  cnps_number?: string;
  head_office_address?: string;
  phone?: string;
  email?: string;
  website?: string;
  contact_name?: string;
  contact_title?: string;
  contact_phone?: string;
  contact_email?: string;
  kyc_status: KycStatus;
  kyc_completed_at?: string;
  kyc_expires_at?: string;
  solvency_score?: SolvencyScore;
  solvency_score_at?: string;
  payment_score: number;
  recommended_guarantee?: string;
  portal_access: boolean;
  portal_email?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TenantKycDocument {
  id: string;
  tenant_id: string;
  doc_type: string;
  doc_name?: string;
  file_url?: string;
  upload_date?: string;
  expiry_date?: string;
  is_verified: boolean;
  verified_by?: string;
  verified_at?: string;
  notes?: string;
}
