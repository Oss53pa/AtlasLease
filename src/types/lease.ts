import type {
  LeaseType,
  LeaseStatus,
  BillingFrequency,
  ProrateMethod,
  ConditionType,
  EscalationType,
  IndexType,
  OptionType,
  RightStatus,
} from './enums';
import type { Property } from './property';
import type { Tenant } from './tenant';
import type { LeaseAmendment } from './amendment';

// ─── Domain 3: Leases ────────────────────────────────────────

export interface Lease {
  id: string;
  organization_id: string;
  lease_number: string;
  property_id: string;
  tenant_id: string;
  lease_type: LeaseType;
  abstract_type?: string;
  space_type?: string;
  status: LeaseStatus;
  execution_date?: string;
  commencement_date?: string;
  termination_date?: string;
  rent_commencement_date?: string;
  early_occupancy_date?: string;
  duration_months?: number;
  billing_frequency: BillingFrequency;
  billing_day: number;
  billing_advance_days: number;
  auto_validate_invoices: boolean;
  auto_send_invoices: boolean;
  send_channel: string;
  prorate_method: ProrateMethod;
  leased_sqm?: number;
  leased_frontage_ml?: number;
  currency: string;
  tva_rate: number;
  deposit_formula?: string;
  deposit_months: number;
  has_revenue_share: boolean;
  managed_by?: string;
  lease_document_url?: string;
  imported_via_ai: boolean;
  ai_import_confidence?: number;
  notes?: string;
  tags?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
  // Joined
  property?: Property;
  tenant?: Tenant;
  rent_conditions?: RentCondition[];
  amendments?: LeaseAmendment[];
  options?: LeaseOption[];
}

// ─── Domain 4: Financial Conditions ──────────────────────────

export interface SteppedScheduleEntry {
  month_from: number;
  month_to: number;
  pct_of_base: number;
  label?: string;
}

export interface RentCondition {
  id: string;
  organization_id: string;
  lease_id: string;
  amendment_id?: string;
  condition_type: ConditionType;
  label?: string;
  syscohada_account?: string;
  start_date: string;
  end_date?: string;
  base_amount: number;
  escalation_type: EscalationType;
  escalation_rate?: number;
  review_month?: number;
  index_type?: IndexType;
  base_index_value?: number;
  base_index_date?: string;
  cap_rate?: number;
  floor_rate?: number;
  stepped_schedule?: SteppedScheduleEntry[];
  mgr_amount?: number;
  rs_rate?: number;
  natural_breakpoint?: number;
  artificial_breakpoint?: number;
  ca_exclusions?: Record<string, boolean>;
  declaration_deadline_days?: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface RentScheduleEntry {
  id: string;
  organization_id: string;
  lease_id: string;
  period_start: string;
  period_end: string;
  period_year: number;
  period_month: number;
  base_rent_ht: number;
  service_charge_ht: number;
  parking_ht: number;
  other_ht: number;
  is_prorated: boolean;
  prorate_days?: number;
  prorate_total_days?: number;
  prorate_factor?: number;
  escalation_type?: string;
  escalation_detail?: Record<string, unknown>;
  total_ht: number;
  tva_amount: number;
  total_ttc: number;
  status: string;
  invoice_id?: string;
  computed_at: string;
  computation_version: number;
}

// ─── Domain 5: Options, Rights & Obligations ─────────────────

export interface LeaseOption {
  id: string;
  lease_id: string;
  option_type: OptionType;
  status: boolean;
  option_start_date?: string;
  option_end_date?: string;
  notification_date: string;
  notice_months?: number;
  conditions?: string;
  article_reference?: string;
  comments?: string;
  alert_sent_60: boolean;
  alert_sent_30: boolean;
  alert_sent_7: boolean;
  created_at: string;
}

export interface LeaseRight {
  id: string;
  lease_id: string;
  right_type: string;
  status: RightStatus;
  article_reference?: string;
  comments?: string;
}

export interface LeaseObligation {
  id: string;
  lease_id: string;
  element: string;
  party?: string;
  can_maintain?: boolean;
  can_repair?: boolean;
  can_replace?: boolean;
  article_reference?: string;
  comments?: string;
  wisefm_gamme_id?: string;
}
