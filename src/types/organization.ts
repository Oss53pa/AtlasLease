import type { UserRole, ProrateMethod } from './enums';

// ─── Domain 0: Organization & Users ─────────────────────────

export interface Organization {
  id: string;
  name: string;
  slug: string;
  country: string;
  currency: string;
  timezone: string;
  logo_url?: string;
  default_tva_rate: number;
  default_prorate_method: ProrateMethod;
  invoice_prefix: string;
  lease_prefix: string;
  receipt_prefix: string;
  renewal_alert_days: number[];
  option_alert_days: number[];
  guarantee_alert_days: number;
  insurance_alert_days: number;
  approval_threshold_pm: number;
  approval_threshold_daf: number;
  approval_threshold_dga: number;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  organization_id: string;
  full_name: string;
  role: UserRole;
  email: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  last_login?: string;
  mfa_enabled: boolean;
  created_at: string;
}
