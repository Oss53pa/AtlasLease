import type { AdType, AdContractType } from './enums';

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
