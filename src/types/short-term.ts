import type { LicenseType, PricingModel, LicenseStatus } from './enums';

// ─── Domain 14: Short-term Licenses ──────────────────────────

export interface ShortTermLicense {
  id: string;
  organization_id: string;
  license_number?: string;
  license_type: LicenseType;
  property_id: string;
  tenant_id?: string;
  occupant_name?: string;
  occupant_contact?: string;
  start_date: string;
  start_time?: string;
  end_date: string;
  end_time?: string;
  duration_days?: number;
  pricing_model: PricingModel;
  daily_rate?: number;
  weekly_rate?: number;
  monthly_rate?: number;
  hourly_rate?: number;
  flat_fee?: number;
  rs_pct?: number;
  total_amount_ht?: number;
  tva_rate: number;
  total_ttc?: number;
  deposit_required: boolean;
  deposit_amount?: number;
  deposit_received: boolean;
  status: LicenseStatus;
  converted_to_lease?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
