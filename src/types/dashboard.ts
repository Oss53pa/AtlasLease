import type { LeaseStatus, SpaceType } from './enums';

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
