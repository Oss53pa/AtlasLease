import type { BuildingType, PropertyStatus, SpaceType } from './enums';
import type { Lease } from './lease';

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
