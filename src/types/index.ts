// ============================================================
// ATLAS LEASE — TypeScript Types v2.1
// Mirrors PostgreSQL schema · 17 domains · 61 tables
// ============================================================

// ─── Enums ───────────────────────────────────────────────────

export type LeaseType = 'COMMERCIAL_OHADA' | 'PRECAIRE' | 'DEROGATOIRE' | 'SUBLEASE';
export type LeaseStatus = 'DRAFT' | 'ACTIVE' | 'EXPIRING' | 'EXPIRED' | 'TERMINATED' | 'HOLDOVER' | 'CANCELLED';
export type PropertyStatus = 'VACANT' | 'LEASED' | 'EPHEMERAL' | 'UNDER_WORKS' | 'RESERVED' | 'TECHNICAL' | 'RETIRED';
export type SpaceType = 'RETAIL' | 'OFFICE' | 'RESTAURANT' | 'STORAGE' | 'KIOSK' | 'COMMON' | 'TECHNICAL';
export type BuildingType = 'SHOPPING_CENTER' | 'OFFICE' | 'MIXED_USE' | 'LOGISTICS' | 'RESIDENTIAL';
export type BillingFrequency = 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUAL' | 'ANNUAL';
export type ProrateMethod = 'ACTUAL_DAYS' | '30_DAYS' | '360_DAYS';
export type EscalationType = 'NONE' | 'FIXED' | 'INDEXED' | 'STEPPED' | 'TURNOVER' | 'CPI';
export type ConditionType = 'BASE_RENT' | 'SERVICE_CHARGE' | 'PARKING' | 'MARKETING_FUND' | 'OTHER';
export type IndexType = 'BCEAO' | 'ICC' | 'IPC' | 'CUSTOM';

export type InvoiceStatus = 'DRAFT' | 'VALIDATED' | 'ISSUED' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type InvoiceType = 'INVOICE' | 'CREDIT_NOTE' | 'DEPOSIT_REQUEST' | 'REGULARIZATION' | 'KEY_MONEY';
export type PaymentMethod = 'BANK_TRANSFER' | 'CHEQUE' | 'CASH' | 'ORANGE_MONEY' | 'MTN_MOMO' | 'WAVE' | 'CARD';
export type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'REVERSED';

export type AmendmentType = 'EXTENSION' | 'EXPANSION' | 'CONTRACTION' | 'RENT_REVIEW' | 'ASSIGNMENT' | 'EARLY_TERMINATION' | 'OPTION_EXERCISE' | 'RENEWAL' | 'ADMINISTRATIVE';
export type AmendmentStatus = 'DRAFT' | 'NEGOTIATION' | 'PENDING_APPROVAL' | 'APPROVED' | 'SIGNED' | 'ACTIVE' | 'SUPERSEDED';

export type OptionType = 'AUTO_RENEWAL' | 'EARLY_TERMINATION' | 'EXPANSION' | 'LEASE_BREAK' | 'RENEWAL' | 'RENT_REVIEW' | 'FIRST_RIGHT_OFFER' | 'FIRST_RIGHT_REFUSAL';
export type RightStatus = 'YES' | 'NO' | 'SILENT' | 'NA';

export type DepositStatus = 'PENDING' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'RELEASED' | 'PARTIALLY_RETAINED' | 'FULLY_RETAINED';
export type DepositMovementType = 'RECEIPT' | 'INTEREST' | 'TOP_UP' | 'PARTIAL_RELEASE' | 'FULL_RELEASE' | 'RETENTION' | 'ADJUSTMENT';

export type KeyMoneyTreatment = 'IMMEDIATE' | 'DEFERRED_STRAIGHT_LINE' | 'DEFERRED_CUSTOM';
export type KeyMoneyStatus = 'PENDING' | 'PARTIAL' | 'RECEIVED' | 'DEFERRED_IN_PROGRESS' | 'FULLY_RECOGNIZED';

export type InstrumentType = 'SECURITY_DEPOSIT' | 'BANK_GUARANTEE' | 'LETTER_OF_CREDIT' | 'PERSONAL_GUARANTEE' | 'PARENT_GUARANTEE' | 'INSURANCE_GUARANTEE';
export type InstrumentStatus = 'ACTIVE' | 'EXPIRED' | 'RELEASED' | 'CALLED';

export type KycStatus = 'INCOMPLETE' | 'COMPLETE' | 'EXPIRED';
export type SolvencyScore = 'A' | 'B' | 'C' | 'D';

export type LicenseType = 'POPUP' | 'EVENT' | 'KIOSK' | 'SEASONAL' | 'PRECAIRE' | 'HOURLY';
export type PricingModel = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'HOURLY' | 'FLAT_FEE' | 'REVENUE_SHARE';
export type LicenseStatus = 'RESERVED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'RENEWED';

export type AdType = 'STATIC_PANEL' | 'LED_SCREEN' | 'TOTEM' | 'FLOOR_STICKER' | 'HANGING_BANNER' | 'NAMING_RIGHT' | 'DIGITAL_INTERACTIVE' | 'WINDOW_DISPLAY';
export type AdContractType = 'FIXED_FEE' | 'CPM' | 'REVENUE_SHARE' | 'BARTER' | 'NAMING_RIGHT';

export type ProspectStatus = 'NEW' | 'QUALIFIED' | 'VISIT_PLANNED' | 'VISIT_DONE' | 'OFFER_SENT' | 'NEGOTIATION' | 'WON' | 'LOST' | 'ON_HOLD';
export type ProspectSource = 'INBOUND' | 'REFERRAL' | 'COLD_OUTREACH' | 'BROKER' | 'EVENT' | 'EPHEMERAL_CONVERTED';

export type WorkflowType = 'RENEWAL' | 'TERMINATION_NORMAL' | 'TERMINATION_BREAK' | 'TERMINATION_DEFAULT' | 'AMENDMENT' | 'ONBOARDING' | 'REGULARIZATION' | 'WORKS_APPROVAL';
export type WorkflowStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'BLOCKED';

export type NotificationType = 'OPTION_ALERT' | 'RENEWAL_ALERT' | 'INVOICE_ISSUED' | 'INVOICE_OVERDUE' | 'DEPOSIT_TOPUP' | 'GUARANTEE_EXPIRY' | 'INSURANCE_EXPIRY' | 'DECLARATION_DUE' | 'REMINDER_1' | 'REMINDER_2' | 'REMINDER_3' | 'AMENDMENT_APPROVAL' | 'WORKS_APPROVED' | 'WORKS_REJECTED';
export type NotificationChannel = 'EMAIL' | 'WHATSAPP' | 'SMS' | 'PORTAL';
export type NotificationPriority = 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW';

export type UserRole = 'super_admin' | 'dg' | 'asset_manager' | 'property_manager' | 'leasing_manager' | 'ad_manager' | 'accountant' | 'read_only';

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

// ─── Domain 1: Patrimoine ────────────────────────────────────

export interface Building {
  id: string;
  organization_id: string;
  name: string;
  code: string;
  building_type: BuildingType;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  country: string;
  total_gla_sqm?: number;
  nb_floors?: number;
  opening_date?: string;
  plan_url?: string;
  plan_scale?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  organization_id: string;
  building_id: string;
  property_code: string;
  floor_number: number;
  zone?: string;
  space_type: SpaceType;
  gla_sqm: number;
  gross_sqm?: number;
  frontage_ml?: number;
  status: PropertyStatus;
  vacancy_since?: string;
  market_rent_sqm?: number;
  plan_coordinates?: Record<string, unknown>;
  plan_color?: string;
  has_storefront: boolean;
  has_loading_dock: boolean;
  ceiling_height_m?: number;
  electric_power_kva?: number;
  photos: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined
  building?: Building;
  current_lease?: Lease;
}

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

// ─── Domain 6: Guarantees & Deposits ─────────────────────────

export interface SecurityInstrument {
  id: string;
  organization_id: string;
  lease_id: string;
  instrument_type: InstrumentType;
  document_number?: string;
  issuer_name?: string;
  amount: number;
  currency: string;
  instrument_date?: string;
  expiration_date?: string;
  is_auto_renewing: boolean;
  beneficiary_name?: string;
  status: InstrumentStatus;
  document_url?: string;
  alert_sent_60: boolean;
  comments?: string;
  created_at: string;
}

export interface SecurityDepositAccount {
  id: string;
  organization_id: string;
  lease_id: string;
  tenant_id: string;
  contractual_formula?: string;
  contractual_amount?: number;
  currency: string;
  balance: number;
  bank_account_ref?: string;
  bank_name?: string;
  interest_bearing: boolean;
  interest_rate?: number;
  status: DepositStatus;
  created_at: string;
  updated_at: string;
}

export interface SecurityDepositMovement {
  id: string;
  organization_id: string;
  deposit_id: string;
  movement_type: DepositMovementType;
  amount: number;
  movement_date: string;
  reference?: string;
  reason?: string;
  invoice_id?: string;
  edl_report_id?: string;
  syscohada_debit?: string;
  syscohada_credit?: string;
  atlas_finance_ref?: string;
  created_by?: string;
  approved_by?: string;
  approved_at?: string;
  notes?: string;
  created_at: string;
}

export interface KeyMoney {
  id: string;
  organization_id: string;
  lease_id: string;
  amount_ht: number;
  tva_applicable: boolean;
  tva_rate: number;
  amount_ttc?: number;
  currency: string;
  payment_schedule: unknown[];
  total_received: number;
  accounting_treatment: KeyMoneyTreatment;
  deferral_start?: string;
  deferral_end?: string;
  monthly_recognition?: number;
  total_recognized: number;
  remaining_to_recognize?: number;
  status: KeyMoneyStatus;
  created_at: string;
  updated_at: string;
}

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

// ─── Domain 10: Invoices ─────────────────────────────────────

export interface Invoice {
  id: string;
  organization_id: string;
  lease_id: string;
  invoice_number: string;
  invoice_type: InvoiceType;
  period_start: string;
  period_end: string;
  issue_date: string;
  due_date: string;
  subtotal_ht: number;
  tva_amount: number;
  total_ttc: number;
  amount_paid: number;
  balance_due?: number;
  is_prorated: boolean;
  prorate_note?: string;
  status: InvoiceStatus;
  sent_at?: string;
  sent_to?: string;
  reminder_1_sent?: string;
  reminder_2_sent?: string;
  reminder_3_sent?: string;
  credited_by?: string;
  auto_generated: boolean;
  validated_by?: string;
  validated_at?: string;
  exported_to_finance: boolean;
  exported_at?: string;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
  // Joined
  lines?: InvoiceLine[];
  lease?: Lease;
  payments?: Payment[];
}

export interface InvoiceLine {
  id: string;
  invoice_id: string;
  line_type: string;
  description: string;
  line_period_start?: string;
  line_period_end?: string;
  quantity: number;
  unit_price_ht: number;
  amount_ht: number;
  tva_rate: number;
  tva_amount?: number;
  amount_ttc?: number;
  escalation_applied: boolean;
  escalation_detail?: Record<string, unknown>;
  is_prorated: boolean;
  prorate_days?: number;
  prorate_total_days?: number;
  prorate_factor?: number;
  syscohada_account?: string;
  sort_order: number;
}

// ─── Domain 11: Payments ─────────────────────────────────────

export interface Payment {
  id: string;
  organization_id: string;
  invoice_id: string;
  lease_id: string;
  amount: number;
  currency: string;
  payment_date: string;
  payment_method?: PaymentMethod;
  payment_reference?: string;
  status: PaymentStatus;
  is_reconciled: boolean;
  reconciled_at?: string;
  exported_to_finance: boolean;
  recorded_by?: string;
  created_at: string;
}

export interface TurnoverDeclaration {
  id: string;
  organization_id: string;
  lease_id: string;
  period_start: string;
  period_end: string;
  declaration_type: string;
  gross_turnover?: number;
  exclusions_detail?: Record<string, unknown>;
  net_turnover?: number;
  declared_at?: string;
  declared_by?: string;
  mgr_applied?: number;
  rs_calculated?: number;
  rent_due?: number;
  mgr_used?: boolean;
  already_invoiced?: number;
  adjustment_amount?: number;
  status: string;
  created_at: string;
}

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

// ─── Domain 15: Advertising ──────────────────────────────────

export interface AdInventory {
  id: string;
  organization_id: string;
  building_id: string;
  inventory_code: string;
  location_description?: string;
  floor_number?: number;
  zone?: string;
  ad_type: AdType;
  width_m?: number;
  height_m?: number;
  surface_sqm?: number;
  daily_footfall?: number;
  visibility_score?: number;
  prime_location: boolean;
  rate_card_daily?: number;
  rate_card_monthly?: number;
  rate_card_annual?: number;
  status: string;
  is_active: boolean;
  created_at: string;
}

export interface AdContract {
  id: string;
  organization_id: string;
  contract_number: string;
  advertiser_name: string;
  advertiser_type?: string;
  tenant_id?: string;
  inventory_id: string;
  start_date: string;
  end_date: string;
  contract_type: AdContractType;
  total_amount_ht?: number;
  discount_pct: number;
  net_amount_ht?: number;
  status: string;
  created_at: string;
}

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

// ─── Materialized View ───────────────────────────────────────

export interface ActiveLeaseView {
  lease_id: string;
  organization_id: string;
  lease_number: string;
  status: LeaseStatus;
  commencement_date: string;
  termination_date: string;
  currency: string;
  remaining_years: number;
  property_id: string;
  property_code: string;
  gla_sqm: number;
  zone?: string;
  space_type: SpaceType;
  floor_number: number;
  market_rent_sqm?: number;
  building_id: string;
  tenant_id: string;
  company_name: string;
  trade_name?: string;
  activity_sector?: string;
  payment_score: number;
  base_rent_monthly: number;
  base_rent_annual: number;
  service_charge_monthly: number;
  total_monthly: number;
  rent_per_sqm: number;
  vs_market_pct?: number;
}

// ─── Dashboard / NOI ─────────────────────────────────────────

export interface NOILineItem {
  label: string;
  mtd: number;
  ytd: number;
  budget_mtd?: number;
  budget_ytd?: number;
}

export interface NOIDashboard {
  building_id: string;
  period: string;
  rental_revenue: NOILineItem[];
  non_rental_revenue: NOILineItem[];
  expenses: NOILineItem[];
  total_gross_revenue_mtd: number;
  total_gross_revenue_ytd: number;
  noi_mtd: number;
  noi_ytd: number;
  noi_per_sqm: number;
  noi_margin_pct: number;
  occupancy_rate: number;
  vacancy_rate: number;
  wale_income: number;
  wale_area: number;
  collection_rate: number;
}

// ─── Utility types ───────────────────────────────────────────

export type Currency = 'XOF' | 'XAF' | 'EUR' | 'USD';

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export function formatXOF(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
