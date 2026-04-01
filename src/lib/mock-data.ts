import type {
  Building, Property, Tenant, Lease, RentCondition, Invoice,
  LeaseAmendment, LeaseOption, SecurityDepositAccount, ActiveLeaseView,
  ShortTermLicense, AdInventory, AdContract, TurnoverDeclaration, Prospect,
  TenantDossier, TenantTimelineEvent,
} from '@/types';

// ─── Building ────────────────────────────────────────────────

export const mockBuilding: Building = {
  id: 'b1',
  organization_id: 'org1',
  name: 'Cosmos Yopougon',
  code: 'COSMOS-YOP',
  building_type: 'SHOPPING_CENTER',
  address_line1: 'Boulevard Principal, Yopougon',
  city: 'Abidjan',
  country: 'CI',
  total_gla_sqm: 15000,
  nb_floors: 3,
  opening_date: '2022-03-15',
  is_active: true,
  created_at: '2022-01-01',
  updated_at: '2026-03-01',
};

// ─── Properties ──────────────────────────────────────────────

export const mockProperties: Property[] = [
  { id: 'p1', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-RDC-001', floor_number: 0, zone: 'Zone A - Entrée principale', space_type: 'RETAIL', gla_sqm: 250, status: 'LEASED', market_rent_sqm: 18000, has_storefront: true, has_loading_dock: false, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p2', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-RDC-002', floor_number: 0, zone: 'Zone A - Entrée principale', space_type: 'RETAIL', gla_sqm: 180, status: 'LEASED', market_rent_sqm: 20000, has_storefront: true, has_loading_dock: false, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p3', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-RDC-003', floor_number: 0, zone: 'Zone B - Galerie', space_type: 'RESTAURANT', gla_sqm: 320, status: 'LEASED', market_rent_sqm: 15000, has_storefront: true, has_loading_dock: true, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p4', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-RDC-004', floor_number: 0, zone: 'Zone B - Galerie', space_type: 'RETAIL', gla_sqm: 150, status: 'VACANT', vacancy_since: '2026-02-01', market_rent_sqm: 16000, has_storefront: true, has_loading_dock: false, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p5', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-R1-001', floor_number: 1, zone: 'Zone C - Étage 1', space_type: 'RETAIL', gla_sqm: 500, status: 'LEASED', market_rent_sqm: 14000, has_storefront: false, has_loading_dock: false, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p6', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-R1-002', floor_number: 1, zone: 'Zone C - Étage 1', space_type: 'OFFICE', gla_sqm: 200, status: 'LEASED', market_rent_sqm: 12000, has_storefront: false, has_loading_dock: false, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p7', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-R1-003', floor_number: 1, zone: 'Zone C - Étage 1', space_type: 'RETAIL', gla_sqm: 120, status: 'EPHEMERAL', market_rent_sqm: 13000, has_storefront: false, has_loading_dock: false, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p8', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-SS-001', floor_number: -1, zone: 'Sous-sol', space_type: 'STORAGE', gla_sqm: 80, status: 'LEASED', market_rent_sqm: 5000, has_storefront: false, has_loading_dock: true, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p9', organization_id: 'org1', building_id: 'b1', property_code: 'KIO-RDC-001', floor_number: 0, zone: 'Zone A - Entrée principale', space_type: 'KIOSK', gla_sqm: 12, status: 'LEASED', market_rent_sqm: 35000, has_storefront: false, has_loading_dock: false, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
  { id: 'p10', organization_id: 'org1', building_id: 'b1', property_code: 'LOT-R2-001', floor_number: 2, zone: 'Zone D - Étage 2', space_type: 'OFFICE', gla_sqm: 350, status: 'UNDER_WORKS', market_rent_sqm: 11000, has_storefront: false, has_loading_dock: false, photos: [], created_at: '2022-01-01', updated_at: '2026-03-01' },
];

// ─── Tenants ─────────────────────────────────────────────────

export const mockTenants: Tenant[] = [
  { id: 't1', organization_id: 'org1', company_name: 'CFAO Retail CI', trade_name: 'Carrefour', activity_sector: 'Grande Distribution', rccm_number: 'CI-ABJ-2018-B-12345', tax_id: 'DGI-CI-0987654', kyc_status: 'COMPLETE', payment_score: 95, portal_access: true, is_active: true, created_at: '2022-03-01', updated_at: '2026-03-01' },
  { id: 't2', organization_id: 'org1', company_name: 'Orange Côte d\'Ivoire', trade_name: 'Orange Store', activity_sector: 'Télécommunications', rccm_number: 'CI-ABJ-2019-B-23456', tax_id: 'DGI-CI-1234567', kyc_status: 'COMPLETE', payment_score: 100, portal_access: true, is_active: true, created_at: '2022-03-01', updated_at: '2026-03-01' },
  { id: 't3', organization_id: 'org1', company_name: 'Chez Tantie Restaurant SARL', trade_name: 'Chez Tantie', activity_sector: 'Restauration', rccm_number: 'CI-ABJ-2020-B-34567', tax_id: 'DGI-CI-2345678', kyc_status: 'COMPLETE', payment_score: 72, portal_access: false, is_active: true, created_at: '2022-04-01', updated_at: '2026-03-01' },
  { id: 't4', organization_id: 'org1', company_name: 'Jumia Technologies CI', trade_name: 'Jumia', activity_sector: 'E-commerce', rccm_number: 'CI-ABJ-2021-B-45678', tax_id: 'DGI-CI-3456789', kyc_status: 'COMPLETE', payment_score: 88, portal_access: true, is_active: true, created_at: '2023-01-01', updated_at: '2026-03-01' },
  { id: 't5', organization_id: 'org1', company_name: 'Canal+ Côte d\'Ivoire', trade_name: 'Canal+ Store', activity_sector: 'Médias', rccm_number: 'CI-ABJ-2022-B-56789', tax_id: 'DGI-CI-4567890', kyc_status: 'COMPLETE', payment_score: 100, portal_access: true, is_active: true, created_at: '2023-06-01', updated_at: '2026-03-01' },
  { id: 't6', organization_id: 'org1', company_name: 'Banque Atlantique CI', trade_name: 'Banque Atlantique', activity_sector: 'Banque', rccm_number: 'CI-ABJ-2018-B-67890', tax_id: 'DGI-CI-5678901', kyc_status: 'COMPLETE', payment_score: 100, portal_access: true, is_active: true, created_at: '2022-03-01', updated_at: '2026-03-01' },
  { id: 't7', organization_id: 'org1', company_name: 'MTN MoMo Agent', trade_name: 'MTN Kiosk', activity_sector: 'Fintech', rccm_number: 'CI-ABJ-2023-B-78901', tax_id: 'DGI-CI-6789012', kyc_status: 'COMPLETE', payment_score: 90, portal_access: false, is_active: true, created_at: '2024-01-01', updated_at: '2026-03-01' },
  { id: 't8', organization_id: 'org1', company_name: 'Ecobank Services', trade_name: 'Ecobank', activity_sector: 'Banque', rccm_number: 'CI-ABJ-2018-B-89012', tax_id: 'DGI-CI-7890123', kyc_status: 'COMPLETE', payment_score: 60, portal_access: true, is_active: true, created_at: '2022-03-01', updated_at: '2026-03-01' },
];

// ─── Leases ──────────────────────────────────────────────────

export const mockLeases: Lease[] = [
  { id: 'l1', organization_id: 'org1', lease_number: 'LEA-2022-0001', property_id: 'p1', tenant_id: 't1', lease_type: 'COMMERCIAL_OHADA', status: 'ACTIVE', commencement_date: '2022-04-01', termination_date: '2028-03-31', duration_months: 72, billing_frequency: 'MONTHLY', billing_day: 1, billing_advance_days: 5, auto_validate_invoices: false, auto_send_invoices: true, send_channel: 'EMAIL', prorate_method: 'ACTUAL_DAYS', leased_sqm: 250, currency: 'XOF', tva_rate: 0.18, deposit_formula: '2 × loyer mensuel base', deposit_months: 2, has_revenue_share: true, imported_via_ai: false, created_at: '2022-03-15', updated_at: '2026-03-01' },
  { id: 'l2', organization_id: 'org1', lease_number: 'LEA-2022-0002', property_id: 'p2', tenant_id: 't2', lease_type: 'COMMERCIAL_OHADA', status: 'ACTIVE', commencement_date: '2022-06-01', termination_date: '2027-05-31', duration_months: 60, billing_frequency: 'MONTHLY', billing_day: 1, billing_advance_days: 5, auto_validate_invoices: false, auto_send_invoices: true, send_channel: 'EMAIL', prorate_method: 'ACTUAL_DAYS', leased_sqm: 180, currency: 'XOF', tva_rate: 0.18, deposit_formula: '2 × loyer mensuel base', deposit_months: 2, has_revenue_share: false, imported_via_ai: false, created_at: '2022-05-20', updated_at: '2026-03-01' },
  { id: 'l3', organization_id: 'org1', lease_number: 'LEA-2022-0003', property_id: 'p3', tenant_id: 't3', lease_type: 'COMMERCIAL_OHADA', status: 'ACTIVE', commencement_date: '2022-07-01', termination_date: '2025-06-30', duration_months: 36, billing_frequency: 'MONTHLY', billing_day: 1, billing_advance_days: 5, auto_validate_invoices: false, auto_send_invoices: false, send_channel: 'EMAIL', prorate_method: 'ACTUAL_DAYS', leased_sqm: 320, currency: 'XOF', tva_rate: 0.18, deposit_formula: '3 × loyer mensuel base', deposit_months: 3, has_revenue_share: true, imported_via_ai: false, created_at: '2022-06-15', updated_at: '2026-03-01' },
  { id: 'l4', organization_id: 'org1', lease_number: 'LEA-2023-0004', property_id: 'p5', tenant_id: 't4', lease_type: 'COMMERCIAL_OHADA', status: 'ACTIVE', commencement_date: '2023-03-01', termination_date: '2029-02-28', duration_months: 72, billing_frequency: 'MONTHLY', billing_day: 1, billing_advance_days: 5, auto_validate_invoices: true, auto_send_invoices: true, send_channel: 'EMAIL', prorate_method: 'ACTUAL_DAYS', leased_sqm: 500, currency: 'XOF', tva_rate: 0.18, deposit_formula: '2 × loyer mensuel base', deposit_months: 2, has_revenue_share: false, imported_via_ai: false, created_at: '2023-02-15', updated_at: '2026-03-01' },
  { id: 'l5', organization_id: 'org1', lease_number: 'LEA-2023-0005', property_id: 'p6', tenant_id: 't5', lease_type: 'COMMERCIAL_OHADA', status: 'ACTIVE', commencement_date: '2023-09-01', termination_date: '2026-08-31', duration_months: 36, billing_frequency: 'MONTHLY', billing_day: 1, billing_advance_days: 5, auto_validate_invoices: false, auto_send_invoices: true, send_channel: 'EMAIL', prorate_method: 'ACTUAL_DAYS', leased_sqm: 200, currency: 'XOF', tva_rate: 0.18, deposit_formula: '2 × loyer mensuel base', deposit_months: 2, has_revenue_share: false, imported_via_ai: false, created_at: '2023-08-20', updated_at: '2026-03-01' },
  { id: 'l6', organization_id: 'org1', lease_number: 'LEA-2022-0006', property_id: 'p8', tenant_id: 't6', lease_type: 'COMMERCIAL_OHADA', status: 'ACTIVE', commencement_date: '2022-04-01', termination_date: '2032-03-31', duration_months: 120, billing_frequency: 'QUARTERLY', billing_day: 1, billing_advance_days: 15, auto_validate_invoices: true, auto_send_invoices: true, send_channel: 'EMAIL', prorate_method: 'ACTUAL_DAYS', leased_sqm: 80, currency: 'XOF', tva_rate: 0.18, deposit_formula: '2 × loyer mensuel base', deposit_months: 2, has_revenue_share: false, imported_via_ai: false, created_at: '2022-03-20', updated_at: '2026-03-01' },
  { id: 'l7', organization_id: 'org1', lease_number: 'LEA-2024-0007', property_id: 'p9', tenant_id: 't7', lease_type: 'PRECAIRE', status: 'ACTIVE', commencement_date: '2024-02-01', termination_date: '2026-01-31', duration_months: 24, billing_frequency: 'MONTHLY', billing_day: 1, billing_advance_days: 5, auto_validate_invoices: true, auto_send_invoices: false, send_channel: 'EMAIL', prorate_method: '30_DAYS', leased_sqm: 12, currency: 'XOF', tva_rate: 0.18, deposit_formula: '1 × loyer mensuel base', deposit_months: 1, has_revenue_share: false, imported_via_ai: false, created_at: '2024-01-15', updated_at: '2026-03-01' },
];

// ─── Rent Conditions ─────────────────────────────────────────

export const mockRentConditions: RentCondition[] = [
  { id: 'rc1', organization_id: 'org1', lease_id: 'l1', condition_type: 'BASE_RENT', label: 'Loyer de base', syscohada_account: '752100', start_date: '2022-04-01', base_amount: 4500000, escalation_type: 'FIXED', escalation_rate: 0.05, review_month: 4, sort_order: 0, is_active: true, created_at: '2022-03-15' },
  { id: 'rc2', organization_id: 'org1', lease_id: 'l1', condition_type: 'SERVICE_CHARGE', label: 'Charges locatives', syscohada_account: '706200', start_date: '2022-04-01', base_amount: 750000, escalation_type: 'NONE', sort_order: 1, is_active: true, created_at: '2022-03-15' },
  { id: 'rc3', organization_id: 'org1', lease_id: 'l2', condition_type: 'BASE_RENT', label: 'Loyer de base', syscohada_account: '752100', start_date: '2022-06-01', base_amount: 3600000, escalation_type: 'FIXED', escalation_rate: 0.05, review_month: 6, sort_order: 0, is_active: true, created_at: '2022-05-20' },
  { id: 'rc4', organization_id: 'org1', lease_id: 'l2', condition_type: 'SERVICE_CHARGE', label: 'Charges locatives', syscohada_account: '706200', start_date: '2022-06-01', base_amount: 540000, escalation_type: 'NONE', sort_order: 1, is_active: true, created_at: '2022-05-20' },
  { id: 'rc5', organization_id: 'org1', lease_id: 'l3', condition_type: 'BASE_RENT', label: 'Loyer de base (MGR)', syscohada_account: '752100', start_date: '2022-07-01', base_amount: 4800000, escalation_type: 'TURNOVER', mgr_amount: 4800000, rs_rate: 0.08, sort_order: 0, is_active: true, created_at: '2022-06-15' },
  { id: 'rc6', organization_id: 'org1', lease_id: 'l3', condition_type: 'SERVICE_CHARGE', label: 'Charges locatives', syscohada_account: '706200', start_date: '2022-07-01', base_amount: 960000, escalation_type: 'NONE', sort_order: 1, is_active: true, created_at: '2022-06-15' },
  { id: 'rc7', organization_id: 'org1', lease_id: 'l4', condition_type: 'BASE_RENT', label: 'Loyer de base', syscohada_account: '752100', start_date: '2023-03-01', base_amount: 7000000, escalation_type: 'STEPPED', stepped_schedule: [{ month_from: 1, month_to: 6, pct_of_base: 50 }, { month_from: 7, month_to: 12, pct_of_base: 75 }, { month_from: 13, month_to: 72, pct_of_base: 100 }], sort_order: 0, is_active: true, created_at: '2023-02-15' },
  { id: 'rc8', organization_id: 'org1', lease_id: 'l4', condition_type: 'SERVICE_CHARGE', label: 'Charges locatives', syscohada_account: '706200', start_date: '2023-03-01', base_amount: 1500000, escalation_type: 'NONE', sort_order: 1, is_active: true, created_at: '2023-02-15' },
  { id: 'rc9', organization_id: 'org1', lease_id: 'l5', condition_type: 'BASE_RENT', label: 'Loyer de base', syscohada_account: '752100', start_date: '2023-09-01', base_amount: 2400000, escalation_type: 'INDEXED', index_type: 'IPC', base_index_value: 112.3, base_index_date: '2023-09-01', cap_rate: 0.08, floor_rate: 0.02, sort_order: 0, is_active: true, created_at: '2023-08-20' },
  { id: 'rc10', organization_id: 'org1', lease_id: 'l5', condition_type: 'SERVICE_CHARGE', label: 'Charges locatives', syscohada_account: '706200', start_date: '2023-09-01', base_amount: 600000, escalation_type: 'NONE', sort_order: 1, is_active: true, created_at: '2023-08-20' },
  { id: 'rc11', organization_id: 'org1', lease_id: 'l6', condition_type: 'BASE_RENT', label: 'Loyer de base', syscohada_account: '752100', start_date: '2022-04-01', base_amount: 400000, escalation_type: 'FIXED', escalation_rate: 0.03, review_month: 4, sort_order: 0, is_active: true, created_at: '2022-03-20' },
  { id: 'rc12', organization_id: 'org1', lease_id: 'l7', condition_type: 'BASE_RENT', label: 'Loyer de base', syscohada_account: '752100', start_date: '2024-02-01', base_amount: 420000, escalation_type: 'NONE', sort_order: 0, is_active: true, created_at: '2024-01-15' },
];

// ─── Active Lease View (Rent Roll) ───────────────────────────

export const mockActiveLeases: ActiveLeaseView[] = mockLeases
  .filter((l) => l.status === 'ACTIVE')
  .map((l) => {
    const prop = mockProperties.find((p) => p.id === l.property_id)!;
    const tenant = mockTenants.find((t) => t.id === l.tenant_id)!;
    const rc = mockRentConditions.filter((r) => r.lease_id === l.id);
    const baseRent = rc.find((r) => r.condition_type === 'BASE_RENT')?.base_amount || 0;
    const sc = rc.find((r) => r.condition_type === 'SERVICE_CHARGE')?.base_amount || 0;
    const endDate = new Date(l.termination_date!);
    const now = new Date();
    const remainingYrs = Math.max(0, (endDate.getTime() - now.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    return {
      lease_id: l.id,
      organization_id: l.organization_id,
      lease_number: l.lease_number,
      status: l.status,
      commencement_date: l.commencement_date!,
      termination_date: l.termination_date!,
      currency: l.currency,
      remaining_years: Math.round(remainingYrs * 100) / 100,
      property_id: prop.id,
      property_code: prop.property_code,
      gla_sqm: prop.gla_sqm,
      zone: prop.zone,
      space_type: prop.space_type,
      floor_number: prop.floor_number,
      market_rent_sqm: prop.market_rent_sqm,
      building_id: prop.building_id,
      tenant_id: tenant.id,
      company_name: tenant.company_name,
      trade_name: tenant.trade_name,
      activity_sector: tenant.activity_sector,
      payment_score: tenant.payment_score,
      base_rent_monthly: baseRent,
      base_rent_annual: baseRent * 12,
      service_charge_monthly: sc,
      total_monthly: baseRent + sc,
      rent_per_sqm: prop.gla_sqm > 0 ? Math.round(baseRent / prop.gla_sqm) : 0,
      vs_market_pct: prop.market_rent_sqm && prop.gla_sqm > 0
        ? Math.round((baseRent / prop.gla_sqm - prop.market_rent_sqm) / prop.market_rent_sqm * 1000) / 10
        : undefined,
    };
  });

// ─── Invoices ────────────────────────────────────────────────

export const mockInvoices: Invoice[] = [
  { id: 'inv1', organization_id: 'org1', lease_id: 'l1', invoice_number: 'INV-2026-0045', invoice_type: 'INVOICE', period_start: '2026-03-01', period_end: '2026-03-31', issue_date: '2026-02-25', due_date: '2026-03-01', subtotal_ht: 5250000, tva_amount: 945000, total_ttc: 6195000, amount_paid: 6195000, balance_due: 0, is_prorated: false, status: 'PAID', auto_generated: true, exported_to_finance: true, created_at: '2026-02-25', updated_at: '2026-03-05' },
  { id: 'inv2', organization_id: 'org1', lease_id: 'l2', invoice_number: 'INV-2026-0046', invoice_type: 'INVOICE', period_start: '2026-03-01', period_end: '2026-03-31', issue_date: '2026-02-25', due_date: '2026-03-01', subtotal_ht: 4140000, tva_amount: 745200, total_ttc: 4885200, amount_paid: 4885200, balance_due: 0, is_prorated: false, status: 'PAID', auto_generated: true, exported_to_finance: true, created_at: '2026-02-25', updated_at: '2026-03-03' },
  { id: 'inv3', organization_id: 'org1', lease_id: 'l3', invoice_number: 'INV-2026-0047', invoice_type: 'INVOICE', period_start: '2026-03-01', period_end: '2026-03-31', issue_date: '2026-02-25', due_date: '2026-03-01', subtotal_ht: 5760000, tva_amount: 1036800, total_ttc: 6796800, amount_paid: 3000000, balance_due: 3796800, is_prorated: false, status: 'PARTIALLY_PAID', auto_generated: true, exported_to_finance: false, created_at: '2026-02-25', updated_at: '2026-03-15' },
  { id: 'inv4', organization_id: 'org1', lease_id: 'l4', invoice_number: 'INV-2026-0048', invoice_type: 'INVOICE', period_start: '2026-03-01', period_end: '2026-03-31', issue_date: '2026-02-25', due_date: '2026-03-01', subtotal_ht: 8500000, tva_amount: 1530000, total_ttc: 10030000, amount_paid: 10030000, balance_due: 0, is_prorated: false, status: 'PAID', auto_generated: true, exported_to_finance: true, created_at: '2026-02-25', updated_at: '2026-03-01' },
  { id: 'inv5', organization_id: 'org1', lease_id: 'l5', invoice_number: 'INV-2026-0049', invoice_type: 'INVOICE', period_start: '2026-03-01', period_end: '2026-03-31', issue_date: '2026-02-25', due_date: '2026-03-01', subtotal_ht: 3000000, tva_amount: 540000, total_ttc: 3540000, amount_paid: 3540000, balance_due: 0, is_prorated: false, status: 'PAID', auto_generated: true, exported_to_finance: true, created_at: '2026-02-25', updated_at: '2026-03-02' },
  { id: 'inv6', organization_id: 'org1', lease_id: 'l3', invoice_number: 'INV-2026-0035', invoice_type: 'INVOICE', period_start: '2026-02-01', period_end: '2026-02-28', issue_date: '2026-01-25', due_date: '2026-02-01', subtotal_ht: 5760000, tva_amount: 1036800, total_ttc: 6796800, amount_paid: 0, balance_due: 6796800, is_prorated: false, status: 'OVERDUE', auto_generated: true, exported_to_finance: false, reminder_1_sent: '2026-02-04', reminder_2_sent: '2026-02-11', created_at: '2026-01-25', updated_at: '2026-03-01' },
  { id: 'inv7', organization_id: 'org1', lease_id: 'l1', invoice_number: 'INV-2026-0050', invoice_type: 'INVOICE', period_start: '2026-04-01', period_end: '2026-04-30', issue_date: '2026-03-26', due_date: '2026-04-01', subtotal_ht: 5250000, tva_amount: 945000, total_ttc: 6195000, amount_paid: 0, balance_due: 6195000, is_prorated: false, status: 'ISSUED', auto_generated: true, exported_to_finance: false, created_at: '2026-03-26', updated_at: '2026-03-26' },
];

// ─── Amendments ──────────────────────────────────────────────

export const mockAmendments: LeaseAmendment[] = [
  { id: 'amd1', organization_id: 'org1', lease_id: 'l1', amendment_number: 'AMD-001', type: 'RENT_REVIEW', status: 'ACTIVE', effective_date: '2024-04-01', version: 1, is_final_version: true, description: 'Révision annuelle +5%', financial_impact: { monthly_delta: 225000, annual_delta: 2700000 }, requires_approval: true, created_at: '2024-03-15', updated_at: '2024-04-01' },
  { id: 'amd2', organization_id: 'org1', lease_id: 'l3', amendment_number: 'AMD-002', type: 'EXTENSION', status: 'NEGOTIATION', effective_date: '2025-07-01', version: 2, is_final_version: false, description: 'Extension 24 mois', financial_impact: { monthly_delta: 0, annual_delta: 0, wale_delta_years: 2, old_termination_date: '2025-06-30', new_termination_date: '2027-06-30' }, requires_approval: true, created_at: '2025-01-10', updated_at: '2026-03-01' },
  { id: 'amd3', organization_id: 'org1', lease_id: 'l4', amendment_number: 'AMD-003', type: 'EXPANSION', status: 'PENDING_APPROVAL', effective_date: '2026-06-01', version: 1, is_final_version: true, description: 'Expansion +120m² zone adjacente', financial_impact: { monthly_delta: 1680000, annual_delta: 20160000 }, requires_approval: true, approval_threshold_hit: 'DGA', created_at: '2026-02-20', updated_at: '2026-03-10' },
];

// ─── Options ─────────────────────────────────────────────────

export const mockOptions: LeaseOption[] = [
  { id: 'opt1', lease_id: 'l1', option_type: 'RENEWAL', notification_date: '2027-10-01', notice_months: 6, status: true, conditions: 'Renouvellement 36 mois aux conditions de marché', alert_sent_60: false, alert_sent_30: false, alert_sent_7: false, created_at: '2022-03-15' },
  { id: 'opt2', lease_id: 'l1', option_type: 'RENT_REVIEW', notification_date: '2026-03-01', notice_months: 1, status: true, conditions: 'Révision annuelle +5% fixe, mois anniversaire', alert_sent_60: true, alert_sent_30: true, alert_sent_7: true, created_at: '2022-03-15' },
  { id: 'opt3', lease_id: 'l3', option_type: 'EARLY_TERMINATION', notification_date: '2025-01-01', notice_months: 6, status: true, conditions: 'Indemnité 6 mois de loyer', alert_sent_60: true, alert_sent_30: true, alert_sent_7: true, created_at: '2022-06-15' },
  { id: 'opt4', lease_id: 'l4', option_type: 'EXPANSION', notification_date: '2026-09-01', notice_months: 3, status: true, conditions: 'Droit d\'expansion sur LOT-R1-004 si vacant', alert_sent_60: false, alert_sent_30: false, alert_sent_7: false, created_at: '2023-02-15' },
  { id: 'opt5', lease_id: 'l5', option_type: 'RENEWAL', notification_date: '2026-02-28', notice_months: 6, status: true, conditions: 'Renouvellement 36 mois, loyer révisé IPC', alert_sent_60: true, alert_sent_30: true, alert_sent_7: true, created_at: '2023-08-20' },
];

// ─── Deposits ────────────────────────────────────────────────

export const mockDeposits: SecurityDepositAccount[] = [
  { id: 'dep1', organization_id: 'org1', lease_id: 'l1', tenant_id: 't1', contractual_formula: '2 × loyer mensuel base', contractual_amount: 9000000, currency: 'XOF', balance: 9000000, interest_bearing: false, status: 'FULLY_PAID', created_at: '2022-03-15', updated_at: '2022-04-01' },
  { id: 'dep2', organization_id: 'org1', lease_id: 'l2', tenant_id: 't2', contractual_formula: '2 × loyer mensuel base', contractual_amount: 7200000, currency: 'XOF', balance: 7200000, interest_bearing: false, status: 'FULLY_PAID', created_at: '2022-05-20', updated_at: '2022-06-01' },
  { id: 'dep3', organization_id: 'org1', lease_id: 'l3', tenant_id: 't3', contractual_formula: '3 × loyer mensuel base', contractual_amount: 14400000, currency: 'XOF', balance: 10000000, interest_bearing: false, status: 'PARTIALLY_PAID', created_at: '2022-06-15', updated_at: '2022-07-01' },
];

// ─── Prospects ───────────────────────────────────────────────

export const mockProspects: Prospect[] = [
  { id: 'pr1', organization_id: 'org1', company_name: 'Zara CI (Inditex)', contact_name: 'Marie Kouassi', contact_email: 'mkouassi@inditex.com', activity_sector: 'Prêt-à-porter', surface_min_sqm: 200, surface_max_sqm: 400, source: 'INBOUND', status: 'NEGOTIATION', match_score: 92, created_at: '2026-02-01', updated_at: '2026-03-15' },
  { id: 'pr2', organization_id: 'org1', company_name: 'KFC West Africa', contact_name: 'Paul Mensah', activity_sector: 'Restauration rapide', surface_min_sqm: 150, surface_max_sqm: 250, source: 'BROKER', status: 'VISIT_DONE', match_score: 78, created_at: '2026-01-15', updated_at: '2026-03-10' },
  { id: 'pr3', organization_id: 'org1', company_name: 'Décathlon Afrique', contact_name: 'Jean Dupont', contact_email: 'jdupont@decathlon.ci', activity_sector: 'Sport', surface_min_sqm: 500, surface_max_sqm: 800, source: 'COLD_OUTREACH', status: 'QUALIFIED', match_score: 65, created_at: '2026-03-01', updated_at: '2026-03-20' },
  { id: 'pr4', organization_id: 'org1', company_name: 'Orange Money CI', contact_name: 'Awa Diallo', contact_email: 'adiallo@orange.ci', contact_phone: '+225 01 02 03 04', activity_sector: 'Télécommunications', surface_min_sqm: 30, surface_max_sqm: 60, budget_rent_max: 1800000, source: 'REFERRAL', status: 'QUALIFIED', match_score: 85, created_at: '2026-03-05', updated_at: '2026-03-22' },
  { id: 'pr5', organization_id: 'org1', company_name: 'Pharmacie du Centre', contact_name: 'Dr. Koné Ibrahim', contact_email: 'ikone@pharmacentre.ci', activity_sector: 'Santé', surface_min_sqm: 80, surface_max_sqm: 120, budget_rent_max: 2400000, source: 'INBOUND', status: 'VISIT_PLANNED', match_score: 71, created_at: '2026-02-20', updated_at: '2026-03-18' },
  { id: 'pr6', organization_id: 'org1', company_name: 'Jumia Food CI', contact_name: 'Fatou Bamba', contact_email: 'fbamba@jumia.ci', activity_sector: 'E-commerce / Dark kitchen', surface_min_sqm: 100, surface_max_sqm: 180, source: 'EVENT', status: 'VISIT_PLANNED', match_score: 58, created_at: '2026-03-10', updated_at: '2026-03-25' },
  { id: 'pr7', organization_id: 'org1', company_name: 'Glovo Côte d\'Ivoire', contact_name: 'Moussa Traoré', contact_email: 'mtraore@glovo.ci', activity_sector: 'Livraison', surface_min_sqm: 40, surface_max_sqm: 80, budget_rent_max: 1200000, source: 'COLD_OUTREACH', status: 'OFFER_SENT', match_score: 74, created_at: '2026-01-20', updated_at: '2026-03-12' },
  { id: 'pr8', organization_id: 'org1', company_name: 'Maison du Cacao', contact_name: 'Amina Sanogo', contact_email: 'asanogo@maisoncacao.ci', activity_sector: 'Alimentation', surface_min_sqm: 60, surface_max_sqm: 100, budget_rent_max: 1500000, source: 'EPHEMERAL_CONVERTED', status: 'OFFER_SENT', match_score: 88, created_at: '2026-02-10', updated_at: '2026-03-20' },
  { id: 'pr9', organization_id: 'org1', company_name: 'Sephora CI', contact_name: 'Laetitia N\'Guessan', contact_email: 'lnguessan@sephora.ci', contact_phone: '+225 05 06 07 08', activity_sector: 'Cosmétique', surface_min_sqm: 120, surface_max_sqm: 200, budget_rent_max: 5000000, source: 'INBOUND', status: 'WON', match_score: 95, converted_to_lease: 'l-new-1', converted_at: '2026-03-28', created_at: '2025-12-01', updated_at: '2026-03-28' },
  { id: 'pr10', organization_id: 'org1', company_name: 'Burger King CI', contact_name: 'Yves Coulibaly', contact_email: 'ycoulibaly@bk-ci.com', activity_sector: 'Restauration rapide', surface_min_sqm: 180, surface_max_sqm: 300, budget_rent_max: 6000000, source: 'BROKER', status: 'NEGOTIATION', match_score: 82, created_at: '2026-01-10', updated_at: '2026-03-25' },
  { id: 'pr11', organization_id: 'org1', company_name: 'Wave Mobile Money', contact_name: 'Sekou Diarra', contact_email: 'sdiarra@wave.com', activity_sector: 'Fintech', surface_min_sqm: 20, surface_max_sqm: 40, source: 'REFERRAL', status: 'VISIT_DONE', match_score: 69, created_at: '2026-02-15', updated_at: '2026-03-15' },
  { id: 'pr12', organization_id: 'org1', company_name: 'Nike Store CI', contact_name: 'Adama Touré', contact_email: 'atoure@nike-ci.com', activity_sector: 'Sport', surface_min_sqm: 250, surface_max_sqm: 400, budget_rent_max: 8000000, source: 'INBOUND', status: 'WON', match_score: 91, converted_to_lease: 'l-new-2', converted_at: '2026-03-15', created_at: '2025-11-15', updated_at: '2026-03-15' },
];

// ─── Short-term Licenses ────────────────────────────────────

export const mockShortTermLicenses: ShortTermLicense[] = [
  { id: 'stl1', organization_id: 'org1', license_number: 'LIC-2026-001', license_type: 'POPUP', property_id: 'p4', occupant_name: 'Maison Ivoire Couture', occupant_contact: '+225 07 08 09 10', start_date: '2026-03-01', end_date: '2026-04-30', duration_days: 61, pricing_model: 'MONTHLY', monthly_rate: 850000, total_amount_ht: 1700000, tva_rate: 0.18, total_ttc: 2006000, deposit_required: true, deposit_amount: 850000, deposit_received: true, status: 'ACTIVE', created_at: '2026-02-15', updated_at: '2026-03-01' },
  { id: 'stl2', organization_id: 'org1', license_number: 'LIC-2026-002', license_type: 'EVENT', property_id: 'p7', occupant_name: 'Abidjan Comedy Club', occupant_contact: '+225 01 23 45 67', start_date: '2026-02-14', end_date: '2026-02-16', duration_days: 3, pricing_model: 'FLAT_FEE', flat_fee: 2500000, total_amount_ht: 2500000, tva_rate: 0.18, total_ttc: 2950000, deposit_required: true, deposit_amount: 1000000, deposit_received: true, status: 'COMPLETED', created_at: '2026-01-20', updated_at: '2026-02-17' },
  { id: 'stl3', organization_id: 'org1', license_number: 'LIC-2026-003', license_type: 'KIOSK', property_id: 'p4', tenant_id: 't7', occupant_name: 'MTN MoMo Agent', occupant_contact: '+225 05 55 66 77', start_date: '2026-04-01', end_date: '2026-06-30', duration_days: 91, pricing_model: 'MONTHLY', monthly_rate: 350000, total_amount_ht: 1050000, tva_rate: 0.18, total_ttc: 1239000, deposit_required: false, deposit_amount: 0, deposit_received: false, status: 'RESERVED', created_at: '2026-03-10', updated_at: '2026-03-15' },
  { id: 'stl4', organization_id: 'org1', license_number: 'LIC-2026-004', license_type: 'SEASONAL', property_id: 'p10', occupant_name: 'Noël Déco Afrique SARL', occupant_contact: '+225 07 77 88 99', start_date: '2025-11-15', end_date: '2026-01-05', duration_days: 52, pricing_model: 'DAILY', daily_rate: 75000, total_amount_ht: 3900000, tva_rate: 0.18, total_ttc: 4602000, deposit_required: true, deposit_amount: 1500000, deposit_received: true, status: 'COMPLETED', created_at: '2025-10-20', updated_at: '2026-01-06' },
  { id: 'stl5', organization_id: 'org1', license_number: 'LIC-2026-005', license_type: 'HOURLY', property_id: 'p7', occupant_name: 'Samba Fitness Studio', occupant_contact: '+225 01 11 22 33', start_date: '2026-03-15', end_date: '2026-03-15', start_time: '08:00', end_time: '13:00', duration_days: 1, pricing_model: 'HOURLY', hourly_rate: 120000, total_amount_ht: 600000, tva_rate: 0.18, total_ttc: 708000, deposit_required: false, deposit_amount: 0, deposit_received: false, status: 'CANCELLED', notes: 'Annulé par le client 48h avant', created_at: '2026-03-05', updated_at: '2026-03-13' },
];

// ─── Advertising Inventory ──────────────────────────────────

export const mockAdInventory: AdInventory[] = [
  { id: 'ad1', organization_id: 'org1', building_id: 'b1', inventory_code: 'PAN-RDC-001', location_description: 'Panneau entrée principale droite', floor_number: 0, zone: 'Zone A - Entrée principale', ad_type: 'STATIC_PANEL', width_m: 3, height_m: 2, surface_sqm: 6, daily_footfall: 8500, visibility_score: 9, prime_location: true, rate_card_daily: 45000, rate_card_monthly: 1100000, rate_card_annual: 11000000, status: 'BOOKED', is_active: true, created_at: '2022-03-01' },
  { id: 'ad2', organization_id: 'org1', building_id: 'b1', inventory_code: 'LED-RDC-001', location_description: 'Écran LED food court', floor_number: 0, zone: 'Zone B - Galerie', ad_type: 'LED_SCREEN', width_m: 4, height_m: 2.5, surface_sqm: 10, daily_footfall: 6200, visibility_score: 8, prime_location: true, rate_card_daily: 65000, rate_card_monthly: 1600000, rate_card_annual: 16000000, status: 'BOOKED', is_active: true, created_at: '2022-03-01' },
  { id: 'ad3', organization_id: 'org1', building_id: 'b1', inventory_code: 'TOT-RDC-001', location_description: 'Totem parking extérieur', floor_number: 0, zone: 'Parking', ad_type: 'TOTEM', width_m: 1.2, height_m: 3.5, surface_sqm: 4.2, daily_footfall: 12000, visibility_score: 10, prime_location: true, rate_card_daily: 55000, rate_card_monthly: 1350000, rate_card_annual: 13500000, status: 'AVAILABLE', is_active: true, created_at: '2022-03-01' },
  { id: 'ad4', organization_id: 'org1', building_id: 'b1', inventory_code: 'FLR-RDC-001', location_description: 'Sticker sol allée centrale RDC', floor_number: 0, zone: 'Zone A - Entrée principale', ad_type: 'FLOOR_STICKER', width_m: 2, height_m: 2, surface_sqm: 4, daily_footfall: 8500, visibility_score: 5, prime_location: false, rate_card_daily: 15000, rate_card_monthly: 350000, rate_card_annual: 3500000, status: 'AVAILABLE', is_active: true, created_at: '2022-06-01' },
  { id: 'ad5', organization_id: 'org1', building_id: 'b1', inventory_code: 'BAN-R1-001', location_description: 'Bannière suspendue atrium étage 1', floor_number: 1, zone: 'Zone C - Étage 1', ad_type: 'HANGING_BANNER', width_m: 5, height_m: 1.5, surface_sqm: 7.5, daily_footfall: 4800, visibility_score: 7, prime_location: false, rate_card_daily: 35000, rate_card_monthly: 850000, rate_card_annual: 8500000, status: 'BOOKED', is_active: true, created_at: '2022-03-01' },
  { id: 'ad6', organization_id: 'org1', building_id: 'b1', inventory_code: 'NAM-EXT-001', location_description: 'Naming droit façade principale', floor_number: 0, zone: 'Façade', ad_type: 'NAMING_RIGHT', width_m: 12, height_m: 3, surface_sqm: 36, daily_footfall: 25000, visibility_score: 10, prime_location: true, rate_card_monthly: 5000000, rate_card_annual: 50000000, status: 'BOOKED', is_active: true, created_at: '2022-01-01' },
  { id: 'ad7', organization_id: 'org1', building_id: 'b1', inventory_code: 'DIG-RDC-001', location_description: 'Borne interactive entrée sud', floor_number: 0, zone: 'Zone A - Entrée principale', ad_type: 'DIGITAL_INTERACTIVE', width_m: 0.8, height_m: 1.8, surface_sqm: 1.44, daily_footfall: 3200, visibility_score: 6, prime_location: false, rate_card_daily: 40000, rate_card_monthly: 950000, rate_card_annual: 9500000, status: 'AVAILABLE', is_active: true, created_at: '2024-01-15' },
  { id: 'ad8', organization_id: 'org1', building_id: 'b1', inventory_code: 'WIN-RDC-002', location_description: 'Vitrine lot vacant LOT-RDC-004', floor_number: 0, zone: 'Zone B - Galerie', ad_type: 'WINDOW_DISPLAY', width_m: 4, height_m: 2.5, surface_sqm: 10, daily_footfall: 5500, visibility_score: 7, prime_location: false, rate_card_daily: 25000, rate_card_monthly: 600000, rate_card_annual: 6000000, status: 'AVAILABLE', is_active: true, created_at: '2026-02-01' },
];

// ─── Advertising Contracts ──────────────────────────────────

export const mockAdContracts: AdContract[] = [
  { id: 'adc1', organization_id: 'org1', contract_number: 'ADC-2026-001', advertiser_name: 'Solibra SA', advertiser_type: 'Brasserie', inventory_id: 'ad1', start_date: '2026-01-01', end_date: '2026-12-31', contract_type: 'FIXED_FEE', total_amount_ht: 11000000, discount_pct: 10, net_amount_ht: 9900000, status: 'ACTIVE', created_at: '2025-11-15' },
  { id: 'adc2', organization_id: 'org1', contract_number: 'ADC-2026-002', advertiser_name: 'Moov Africa CI', advertiser_type: 'Télécommunications', inventory_id: 'ad2', start_date: '2026-03-01', end_date: '2026-08-31', contract_type: 'CPM', total_amount_ht: 9600000, discount_pct: 0, net_amount_ht: 9600000, status: 'ACTIVE', created_at: '2026-02-10' },
  { id: 'adc3', organization_id: 'org1', contract_number: 'ADC-2025-010', advertiser_name: 'Brassivoire', advertiser_type: 'Brasserie', inventory_id: 'ad5', start_date: '2025-06-01', end_date: '2025-12-31', contract_type: 'REVENUE_SHARE', total_amount_ht: 5100000, discount_pct: 0, net_amount_ht: 5100000, status: 'COMPLETED', created_at: '2025-05-10' },
  { id: 'adc4', organization_id: 'org1', contract_number: 'ADC-2026-003', advertiser_name: 'NSIA Assurances', advertiser_type: 'Assurance', inventory_id: 'ad6', start_date: '2026-01-01', end_date: '2028-12-31', contract_type: 'NAMING_RIGHT', total_amount_ht: 150000000, discount_pct: 5, net_amount_ht: 142500000, status: 'ACTIVE', created_at: '2025-10-01' },
  { id: 'adc5', organization_id: 'org1', contract_number: 'ADC-2026-004', advertiser_name: 'Unilever CI', advertiser_type: 'Grande consommation', inventory_id: 'ad4', start_date: '2026-05-01', end_date: '2026-07-31', contract_type: 'BARTER', total_amount_ht: 1050000, discount_pct: 0, net_amount_ht: 1050000, status: 'DRAFT', created_at: '2026-03-20' },
];

// ─── Turnover Declarations ──────────────────────────────────

export const mockTurnoverDeclarations: TurnoverDeclaration[] = [
  { id: 'td1', organization_id: 'org1', lease_id: 'l1', period_start: '2026-01-01', period_end: '2026-03-31', declaration_type: 'QUARTERLY', gross_turnover: 185000000, exclusions_detail: { returns: 3200000, staff_discounts: 800000 }, net_turnover: 181000000, declared_at: '2026-03-28', declared_by: 'CFAO Retail CI', mgr_applied: 4500000, rs_calculated: 14480000, rent_due: 14480000, mgr_used: false, already_invoiced: 13500000, adjustment_amount: 980000, status: 'DECLARED', created_at: '2026-03-28' },
  { id: 'td2', organization_id: 'org1', lease_id: 'l3', period_start: '2026-01-01', period_end: '2026-03-31', declaration_type: 'QUARTERLY', gross_turnover: 42000000, exclusions_detail: { tips: 1500000 }, net_turnover: 40500000, declared_at: '2026-03-25', declared_by: 'Chez Tantie Restaurant SARL', mgr_applied: 4800000, rs_calculated: 3240000, rent_due: 4800000, mgr_used: true, already_invoiced: 14400000, adjustment_amount: 0, status: 'VALIDATED', created_at: '2026-03-25' },
  { id: 'td3', organization_id: 'org1', lease_id: 'l1', period_start: '2025-10-01', period_end: '2025-12-31', declaration_type: 'QUARTERLY', gross_turnover: 210000000, exclusions_detail: { returns: 4100000, staff_discounts: 900000 }, net_turnover: 205000000, declared_at: '2026-01-10', declared_by: 'CFAO Retail CI', mgr_applied: 4500000, rs_calculated: 16400000, rent_due: 16400000, mgr_used: false, already_invoiced: 13500000, adjustment_amount: 2900000, status: 'VALIDATED', created_at: '2026-01-10' },
  { id: 'td4', organization_id: 'org1', lease_id: 'l3', period_start: '2025-10-01', period_end: '2025-12-31', declaration_type: 'QUARTERLY', gross_turnover: 55000000, exclusions_detail: { tips: 2000000 }, net_turnover: 53000000, declared_at: '2026-01-08', declared_by: 'Chez Tantie Restaurant SARL', mgr_applied: 4800000, rs_calculated: 4240000, rent_due: 4800000, mgr_used: true, already_invoiced: 14400000, adjustment_amount: 0, status: 'PENDING', created_at: '2026-01-08' },
];

// ─── Parking Spots ──────────────────────────────────────────

export const mockParkingSpots: { id: string; zone: string; type: string; tenant_name: string | null; monthly_rate: number; status: string; plate_number: string | null }[] = [
  { id: 'pk1', zone: 'A', type: 'SUBSCRIPTION', tenant_name: 'CFAO Retail CI', monthly_rate: 75000, status: 'OCCUPIED', plate_number: '1234 AB 01' },
  { id: 'pk2', zone: 'A', type: 'RESERVED', tenant_name: 'Orange Côte d\'Ivoire', monthly_rate: 100000, status: 'RESERVED', plate_number: '5678 CD 01' },
  { id: 'pk3', zone: 'B', type: 'SUBSCRIPTION', tenant_name: 'Jumia Technologies CI', monthly_rate: 50000, status: 'OCCUPIED', plate_number: '9012 EF 01' },
  { id: 'pk4', zone: 'B', type: 'HOURLY', tenant_name: null, monthly_rate: 0, status: 'AVAILABLE', plate_number: null },
  { id: 'pk5', zone: 'C', type: 'HOURLY', tenant_name: null, monthly_rate: 0, status: 'AVAILABLE', plate_number: null },
  { id: 'pk6', zone: 'C', type: 'EVENT', tenant_name: null, monthly_rate: 25000, status: 'RESERVED', plate_number: null },
];

// ─── Parking Subscriptions ──────────────────────────────────

export const mockParkingSubscriptions: { id: string; tenant_id: string; tenant_name: string; zone: string; spots_count: number; monthly_rate: number; start_date: string; end_date: string; status: string; plate_numbers: string[] }[] = [
  { id: 'psub1', tenant_id: 't1', tenant_name: 'CFAO Retail CI', zone: 'A', spots_count: 3, monthly_rate: 225000, start_date: '2026-01-01', end_date: '2026-12-31', status: 'ACTIVE', plate_numbers: ['1234 AB 01', '2345 BC 01', '3456 CD 01'] },
  { id: 'psub2', tenant_id: 't2', tenant_name: 'Orange Côte d\'Ivoire', zone: 'A', spots_count: 2, monthly_rate: 200000, start_date: '2026-01-01', end_date: '2026-12-31', status: 'ACTIVE', plate_numbers: ['5678 CD 01', '6789 DE 01'] },
  { id: 'psub3', tenant_id: 't4', tenant_name: 'Jumia Technologies CI', zone: 'B', spots_count: 1, monthly_rate: 50000, start_date: '2026-03-01', end_date: '2026-08-31', status: 'ACTIVE', plate_numbers: ['9012 EF 01'] },
  { id: 'psub4', tenant_id: 't6', tenant_name: 'Banque Atlantique CI', zone: 'A', spots_count: 2, monthly_rate: 200000, start_date: '2025-04-01', end_date: '2026-03-31', status: 'EXPIRING', plate_numbers: ['4567 FG 01', '7890 GH 01'] },
];

// ─── Tenant Dossiers (Lifecycle) ────────────────────────────

export const mockDossiers: TenantDossier[] = [
  // Tenants en exploitation (liés aux baux existants)
  { id: 'dos1', organization_id: 'org1', tenant_id: 't1', stage: 'EXPLOITATION', company_name: 'CFAO Retail CI', trade_name: 'Carrefour', contact_name: 'Amadou Diallo', contact_email: 'adiallo@cfao.com', contact_phone: '+225 27 20 30 40', activity_sector: 'Grande Distribution', target_property_id: 'p1', source: 'INBOUND', lease_id: 'l1', exploitation_start: '2022-04-01', created_at: '2021-10-15', updated_at: '2026-03-01' },
  { id: 'dos2', organization_id: 'org1', tenant_id: 't2', stage: 'EXPLOITATION', company_name: 'Orange Côte d\'Ivoire', trade_name: 'Orange Store', contact_name: 'Fatou Koné', contact_email: 'fkone@orange.ci', contact_phone: '+225 07 08 09 10', activity_sector: 'Télécommunications', target_property_id: 'p2', source: 'COLD_OUTREACH', lease_id: 'l2', exploitation_start: '2022-06-01', created_at: '2022-01-10', updated_at: '2026-03-01' },
  { id: 'dos3', organization_id: 'org1', tenant_id: 't3', stage: 'EXPLOITATION', company_name: 'Chez Tantie Restaurant SARL', trade_name: 'Chez Tantie', contact_name: 'Marie-Claire Bamba', contact_email: 'mc@cheztantie.ci', contact_phone: '+225 05 06 07 08', activity_sector: 'Restauration', target_property_id: 'p3', source: 'REFERRAL', lease_id: 'l3', exploitation_start: '2022-07-01', created_at: '2022-02-01', updated_at: '2026-03-01' },
  { id: 'dos4', organization_id: 'org1', tenant_id: 't4', stage: 'EXPLOITATION', company_name: 'Jumia Technologies CI', trade_name: 'Jumia', contact_name: 'Sékou Traoré', contact_email: 'straore@jumia.ci', activity_sector: 'E-commerce', target_property_id: 'p5', source: 'BROKER', lease_id: 'l4', exploitation_start: '2023-03-01', created_at: '2022-09-01', updated_at: '2026-03-01' },
  { id: 'dos5', organization_id: 'org1', tenant_id: 't5', stage: 'EXPLOITATION', company_name: 'Canal+ Côte d\'Ivoire', trade_name: 'Canal+ Store', contact_name: 'Paul Mensah', contact_email: 'pmensah@canalplus.ci', activity_sector: 'Médias', target_property_id: 'p6', source: 'INBOUND', lease_id: 'l5', exploitation_start: '2023-09-01', created_at: '2023-03-01', updated_at: '2026-03-01' },
  { id: 'dos6', organization_id: 'org1', tenant_id: 't6', stage: 'EXPLOITATION', company_name: 'Banque Atlantique CI', trade_name: 'Banque Atlantique', contact_name: 'Ibrahim Konaté', contact_email: 'ikonate@banqueatlantique.ci', activity_sector: 'Banque', target_property_id: 'p8', source: 'INBOUND', lease_id: 'l6', exploitation_start: '2022-04-01', created_at: '2021-11-01', updated_at: '2026-03-01' },
  { id: 'dos7', organization_id: 'org1', tenant_id: 't7', stage: 'EXPLOITATION', company_name: 'MTN MoMo Agent', trade_name: 'MTN Kiosk', contact_name: 'Awa Coulibaly', contact_email: 'acoulibaly@mtn.ci', activity_sector: 'Fintech', target_property_id: 'p9', source: 'REFERRAL', lease_id: 'l7', exploitation_start: '2024-02-01', created_at: '2023-10-01', updated_at: '2026-03-01' },
  // Dossiers en cours (pipeline)
  { id: 'dos8', organization_id: 'org1', prospect_id: 'pr1', stage: 'NEGOCIATION', company_name: 'Zara CI (Inditex)', trade_name: 'Zara', contact_name: 'Marie Kouassi', contact_email: 'mkouassi@inditex.com', contact_phone: '+225 01 02 03 04', activity_sector: 'Prêt-à-porter', surface_need_min: 200, surface_need_max: 400, budget_rent_max: 7200000, target_property_id: 'p4', source: 'INBOUND', match_score: 92, assigned_to: 'Amadou Koné', created_at: '2026-02-01', updated_at: '2026-03-15' },
  { id: 'dos9', organization_id: 'org1', prospect_id: 'pr10', stage: 'OFFRE', company_name: 'Burger King CI', trade_name: 'Burger King', contact_name: 'Yves Coulibaly', contact_email: 'ycoulibaly@bk-ci.com', contact_phone: '+225 07 88 99 00', activity_sector: 'Restauration rapide', surface_need_min: 180, surface_need_max: 300, budget_rent_max: 6000000, source: 'BROKER', match_score: 82, assigned_to: 'Amadou Koné', created_at: '2026-01-10', updated_at: '2026-03-25' },
  { id: 'dos10', organization_id: 'org1', prospect_id: 'pr9', stage: 'RESERVATION', company_name: 'Sephora CI', trade_name: 'Sephora', contact_name: 'Laetitia N\'Guessan', contact_email: 'lnguessan@sephora.ci', contact_phone: '+225 05 06 07 08', activity_sector: 'Cosmétique', surface_need_min: 120, surface_need_max: 200, budget_rent_max: 5000000, target_property_id: 'p10', source: 'INBOUND', match_score: 95, reservation_date: '2026-03-28', reservation_expiry: '2026-04-28', reservation_deposit: 5000000, reservation_deposit_paid: true, assigned_to: 'Amadou Koné', created_at: '2025-12-01', updated_at: '2026-03-28' },
  { id: 'dos11', organization_id: 'org1', prospect_id: 'pr5', stage: 'VISITE', company_name: 'Pharmacie du Centre', contact_name: 'Dr. Koné Ibrahim', contact_email: 'ikone@pharmacentre.ci', activity_sector: 'Santé', surface_need_min: 80, surface_need_max: 120, budget_rent_max: 2400000, source: 'INBOUND', match_score: 71, assigned_to: 'Amadou Koné', created_at: '2026-02-20', updated_at: '2026-03-18' },
  { id: 'dos12', organization_id: 'org1', prospect_id: 'pr4', stage: 'QUALIFICATION', company_name: 'Orange Money CI', contact_name: 'Awa Diallo', contact_email: 'adiallo@orange.ci', contact_phone: '+225 01 02 03 04', activity_sector: 'Télécommunications', surface_need_min: 30, surface_need_max: 60, budget_rent_max: 1800000, source: 'REFERRAL', match_score: 85, assigned_to: 'Amadou Koné', created_at: '2026-03-05', updated_at: '2026-03-22' },
  { id: 'dos13', organization_id: 'org1', prospect_id: 'pr3', stage: 'PROSPECT', company_name: 'Décathlon Afrique', contact_name: 'Jean Dupont', contact_email: 'jdupont@decathlon.ci', activity_sector: 'Sport', surface_need_min: 500, surface_need_max: 800, source: 'COLD_OUTREACH', match_score: 65, created_at: '2026-03-01', updated_at: '2026-03-20' },
  { id: 'dos14', organization_id: 'org1', stage: 'AMENAGEMENT', company_name: 'Nike Store CI', trade_name: 'Nike', contact_name: 'Adama Touré', contact_email: 'atoure@nike-ci.com', activity_sector: 'Sport', target_property_id: 'p10', source: 'INBOUND', match_score: 91, reservation_date: '2026-02-15', lease_id: 'l-nike', amenagement_start: '2026-03-15', amenagement_end: '2026-06-15', amenagement_budget: 45000000, assigned_to: 'Amadou Koné', created_at: '2025-11-15', updated_at: '2026-03-15' },
  { id: 'dos15', organization_id: 'org1', stage: 'BAIL', company_name: 'KFC West Africa', trade_name: 'KFC', contact_name: 'Paul Mensah', contact_email: 'pmensah@kfc-wa.com', contact_phone: '+225 27 22 33 44', activity_sector: 'Restauration rapide', surface_need_min: 150, surface_need_max: 250, budget_rent_max: 6000000, source: 'BROKER', match_score: 78, reservation_date: '2026-03-01', reservation_deposit: 6000000, reservation_deposit_paid: true, assigned_to: 'Amadou Koné', created_at: '2026-01-15', updated_at: '2026-03-30' },
];

// ─── Timeline Events ────────────────────────────────────────

export const mockTimelineEvents: TenantTimelineEvent[] = [
  // Dossier Sephora (dos10) — RESERVATION, parcours complet
  { id: 'evt1', dossier_id: 'dos10', event_type: 'STAGE_CHANGE', title: 'Nouveau prospect', description: 'Sephora CI a contacté le leasing office via le site web', stage: 'PROSPECT', created_by: 'Système', created_at: '2025-12-01' },
  { id: 'evt2', dossier_id: 'dos10', event_type: 'NOTE', title: 'Prise de contact initiale', description: 'Appel avec Laetitia N\'Guessan. Cherche 120-200m² pour flagship store cosmétique.', stage: 'PROSPECT', created_by: 'Amadou Koné', created_at: '2025-12-03' },
  { id: 'evt3', dossier_id: 'dos10', event_type: 'DOCUMENT', title: 'Fiche prospect reçue', description: 'Business plan + prévisionnel CA reçus', stage: 'PROSPECT', created_by: 'Amadou Koné', created_at: '2025-12-10' },
  { id: 'evt4', dossier_id: 'dos10', event_type: 'STAGE_CHANGE', title: 'Qualification validée', description: 'Profil validé : solvabilité A, enseigne internationale, CA prévisionnel solide', stage: 'QUALIFICATION', created_by: 'Amadou Koné', created_at: '2025-12-15' },
  { id: 'evt5', dossier_id: 'dos10', event_type: 'VISIT', title: 'Visite LOT-R2-001', description: 'Visite du local avec Laetitia + architecte. Bonne impression, demande plan d\'aménagement.', stage: 'VISITE', created_by: 'Amadou Koné', created_at: '2026-01-08' },
  { id: 'evt6', dossier_id: 'dos10', event_type: 'VISIT', title: '2e visite avec DG Sephora CI', description: 'Visite confirmée avec DG. Discussion sur les aménagements techniques.', stage: 'VISITE', created_by: 'Amadou Koné', created_at: '2026-01-20' },
  { id: 'evt7', dossier_id: 'dos10', event_type: 'OFFER_SENT', title: 'Offre commerciale envoyée', description: 'Offre 180m² à 4 500 000 XOF/mois + charges 900 000 XOF. Paliers progressifs M1-M6 à 75%.', stage: 'OFFRE', created_by: 'Amadou Koné', created_at: '2026-02-05' },
  { id: 'evt8', dossier_id: 'dos10', event_type: 'CALL', title: 'Contre-proposition Sephora', description: 'Sephora demande 3 mois de franchise + budget aménagement 15M XOF', stage: 'NEGOCIATION', created_by: 'Amadou Koné', created_at: '2026-02-15' },
  { id: 'evt9', dossier_id: 'dos10', event_type: 'MEETING', title: 'Réunion de négociation', description: 'Accord sur : 2 mois franchise, contribution aménagement 10M XOF, bail 60 mois ferme', stage: 'NEGOCIATION', created_by: 'Amadou Koné', created_at: '2026-03-05' },
  { id: 'evt10', dossier_id: 'dos10', event_type: 'OFFER_ACCEPTED', title: 'Offre acceptée', description: 'Validation DG Sephora CI + validation interne. Passage au contrat de réservation.', stage: 'NEGOCIATION', created_by: 'Amadou Koné', created_at: '2026-03-20' },
  { id: 'evt11', dossier_id: 'dos10', event_type: 'RESERVATION_SIGNED', title: 'Contrat de réservation signé', description: 'Réservation LOT-R2-001 signée. Dépôt de réservation 5 000 000 XOF encaissé.', stage: 'RESERVATION', created_by: 'Amadou Koné', created_at: '2026-03-28' },
  { id: 'evt12', dossier_id: 'dos10', event_type: 'PAYMENT', title: 'Dépôt de réservation reçu', description: '5 000 000 XOF reçu par virement bancaire — réf. VIR-2026-0328', stage: 'RESERVATION', created_by: 'Système', created_at: '2026-03-28' },
  // Dossier Zara (dos8) — NEGOCIATION
  { id: 'evt20', dossier_id: 'dos8', event_type: 'STAGE_CHANGE', title: 'Nouveau prospect', description: 'Zara CI (Inditex) intéressé par un espace flagship', stage: 'PROSPECT', created_by: 'Système', created_at: '2026-02-01' },
  { id: 'evt21', dossier_id: 'dos8', event_type: 'STAGE_CHANGE', title: 'Qualification', description: 'Profil Inditex validé. Score solvabilité A+.', stage: 'QUALIFICATION', created_by: 'Amadou Koné', created_at: '2026-02-05' },
  { id: 'evt22', dossier_id: 'dos8', event_type: 'VISIT', title: 'Visite LOT-RDC-004', description: 'Visite du local vacant Zone B avec architecte Inditex', stage: 'VISITE', created_by: 'Amadou Koné', created_at: '2026-02-12' },
  { id: 'evt23', dossier_id: 'dos8', event_type: 'OFFER_SENT', title: 'Offre envoyée', description: 'Offre 150m² à 18 000 XOF/m²/mois soit 2 700 000 XOF/mois', stage: 'OFFRE', created_by: 'Amadou Koné', created_at: '2026-02-20' },
  { id: 'evt24', dossier_id: 'dos8', event_type: 'MEETING', title: 'Négociation en cours', description: 'Discussion sur franchise de loyer et contribution aménagement', stage: 'NEGOCIATION', created_by: 'Amadou Koné', created_at: '2026-03-10' },
  // Dossier Carrefour (dos1) — EXPLOITATION, historique complet
  { id: 'evt30', dossier_id: 'dos1', event_type: 'STAGE_CHANGE', title: 'Premier contact', description: 'CFAO Retail CI intéressé par ancrage dans centre Cosmos Yopougon', stage: 'PROSPECT', created_by: 'Système', created_at: '2021-10-15' },
  { id: 'evt31', dossier_id: 'dos1', event_type: 'STAGE_CHANGE', title: 'Qualification', description: 'Dossier CFAO validé — groupe AAA', stage: 'QUALIFICATION', created_by: 'Amadou Koné', created_at: '2021-10-25' },
  { id: 'evt32', dossier_id: 'dos1', event_type: 'VISIT', title: 'Visite des plans', description: 'Visite sur plans avant ouverture du centre', stage: 'VISITE', created_by: 'Amadou Koné', created_at: '2021-11-10' },
  { id: 'evt33', dossier_id: 'dos1', event_type: 'OFFER_SENT', title: 'Offre commerciale', description: 'Offre 250m² Zone A — loyer 4 500 000 XOF/mois + RS 8%', stage: 'OFFRE', created_by: 'Amadou Koné', created_at: '2021-11-25' },
  { id: 'evt34', dossier_id: 'dos1', event_type: 'OFFER_ACCEPTED', title: 'Offre acceptée', description: 'Accord CFAO sur conditions commerciales', stage: 'NEGOCIATION', created_by: 'Amadou Koné', created_at: '2021-12-15' },
  { id: 'evt35', dossier_id: 'dos1', event_type: 'RESERVATION_SIGNED', title: 'Réservation signée', description: 'Contrat de réservation LOT-RDC-001 signé', stage: 'RESERVATION', created_by: 'Amadou Koné', created_at: '2022-01-10' },
  { id: 'evt36', dossier_id: 'dos1', event_type: 'LEASE_SIGNED', title: 'Bail signé', description: 'Bail commercial OHADA LEA-2022-0001 signé pour 72 mois', stage: 'BAIL', created_by: 'Amadou Koné', created_at: '2022-03-15' },
  { id: 'evt37', dossier_id: 'dos1', event_type: 'AMENAGEMENT_START', title: 'Début aménagement', description: 'Travaux d\'aménagement Carrefour Market démarrés', stage: 'AMENAGEMENT', created_by: 'Amadou Koné', created_at: '2022-03-20' },
  { id: 'evt38', dossier_id: 'dos1', event_type: 'AMENAGEMENT_END', title: 'Fin aménagement', description: 'Réception des travaux — conformité validée', stage: 'AMENAGEMENT', created_by: 'Amadou Koné', created_at: '2022-03-30' },
  { id: 'evt39', dossier_id: 'dos1', event_type: 'EXPLOITATION_START', title: 'Ouverture', description: 'Carrefour Market Cosmos Yopougon opérationnel', stage: 'EXPLOITATION', created_by: 'Système', created_at: '2022-04-01' },
  { id: 'evt40', dossier_id: 'dos1', event_type: 'NOTE', title: 'Révision loyer +5%', description: 'Amendment AMD-001 — révision annuelle appliquée', stage: 'EXPLOITATION', created_by: 'Système', created_at: '2024-04-01' },
  // Nike (dos14) — AMENAGEMENT
  { id: 'evt50', dossier_id: 'dos14', event_type: 'STAGE_CHANGE', title: 'Prospect qualifié', stage: 'PROSPECT', created_by: 'Système', created_at: '2025-11-15' },
  { id: 'evt51', dossier_id: 'dos14', event_type: 'VISIT', title: 'Visite LOT-R2-001', stage: 'VISITE', created_by: 'Amadou Koné', created_at: '2025-12-05' },
  { id: 'evt52', dossier_id: 'dos14', event_type: 'OFFER_ACCEPTED', title: 'Offre acceptée', stage: 'NEGOCIATION', created_by: 'Amadou Koné', created_at: '2026-01-20' },
  { id: 'evt53', dossier_id: 'dos14', event_type: 'RESERVATION_SIGNED', title: 'Réservation signée', stage: 'RESERVATION', created_by: 'Amadou Koné', created_at: '2026-02-15' },
  { id: 'evt54', dossier_id: 'dos14', event_type: 'LEASE_SIGNED', title: 'Bail signé', description: 'Bail 60 mois Nike Store CI', stage: 'BAIL', created_by: 'Amadou Koné', created_at: '2026-03-10' },
  { id: 'evt55', dossier_id: 'dos14', event_type: 'AMENAGEMENT_START', title: 'Début travaux', description: 'Aménagement Nike Store — budget 45M XOF — fin prévue 15/06', stage: 'AMENAGEMENT', created_by: 'Amadou Koné', created_at: '2026-03-15' },
  // KFC (dos15) — BAIL
  { id: 'evt60', dossier_id: 'dos15', event_type: 'STAGE_CHANGE', title: 'Prospect via courtier', stage: 'PROSPECT', created_by: 'Système', created_at: '2026-01-15' },
  { id: 'evt61', dossier_id: 'dos15', event_type: 'VISIT', title: 'Visite locaux', stage: 'VISITE', created_by: 'Amadou Koné', created_at: '2026-02-01' },
  { id: 'evt62', dossier_id: 'dos15', event_type: 'OFFER_ACCEPTED', title: 'Offre acceptée', stage: 'NEGOCIATION', created_by: 'Amadou Koné', created_at: '2026-02-20' },
  { id: 'evt63', dossier_id: 'dos15', event_type: 'RESERVATION_SIGNED', title: 'Réservation signée', description: 'Dépôt 6M XOF encaissé', stage: 'RESERVATION', created_by: 'Amadou Koné', created_at: '2026-03-01' },
  { id: 'evt64', dossier_id: 'dos15', event_type: 'STAGE_CHANGE', title: 'Rédaction bail en cours', description: 'Bail en cours de rédaction par le juridique', stage: 'BAIL', created_by: 'Amadou Koné', created_at: '2026-03-25' },
  // Burger King (dos9) — OFFRE
  { id: 'evt70', dossier_id: 'dos9', event_type: 'STAGE_CHANGE', title: 'Prospect via courtier', description: 'Burger King CI introduit par Cabinet Immobilier Cosmos', stage: 'PROSPECT', created_by: 'Système', created_at: '2026-01-10' },
  { id: 'evt71', dossier_id: 'dos9', event_type: 'NOTE', title: 'Qualification en cours', description: 'Demande de business plan + prévisionnel CA envoyée', stage: 'QUALIFICATION', created_by: 'Amadou Koné', created_at: '2026-01-20' },
  { id: 'evt72', dossier_id: 'dos9', event_type: 'VISIT', title: 'Visite avec architecte', description: 'Visite des locaux Zone B avec architecte BK pour évaluation technique', stage: 'VISITE', created_by: 'Amadou Koné', created_at: '2026-02-05' },
  { id: 'evt73', dossier_id: 'dos9', event_type: 'OFFER_SENT', title: 'Offre commerciale envoyée', description: 'Offre 220m² à 16 000 XOF/m²/mois + 3 mois franchise', stage: 'OFFRE', created_by: 'Amadou Koné', created_at: '2026-03-15' },
  // Pharmacie du Centre (dos11) — VISITE
  { id: 'evt80', dossier_id: 'dos11', event_type: 'STAGE_CHANGE', title: 'Nouveau prospect', description: 'Pharmacie du Centre intéressée par un espace santé', stage: 'PROSPECT', created_by: 'Système', created_at: '2026-02-20' },
  { id: 'evt81', dossier_id: 'dos11', event_type: 'NOTE', title: 'Appel de qualification', description: 'Échange avec Dr. Koné Ibrahim, besoin de 80-120m² pour pharmacie + parapharmacie', stage: 'QUALIFICATION', created_by: 'Amadou Koné', created_at: '2026-03-01' },
  { id: 'evt82', dossier_id: 'dos11', event_type: 'VISIT', title: 'Visite planifiée', description: 'Visite du LOT-RDC-004 prévue le 25/03', stage: 'VISITE', created_by: 'Amadou Koné', created_at: '2026-03-15' },
  // Orange Money (dos12) — QUALIFICATION
  { id: 'evt90', dossier_id: 'dos12', event_type: 'STAGE_CHANGE', title: 'Prospect référé', description: 'Orange Money CI référé par Orange Store (locataire existant)', stage: 'PROSPECT', created_by: 'Système', created_at: '2026-03-05' },
  { id: 'evt91', dossier_id: 'dos12', event_type: 'NOTE', title: 'Qualification en cours', description: 'Documents KYC en cours de collecte. Besoin d\'un kiosque 30-60m² en zone A.', stage: 'QUALIFICATION', created_by: 'Amadou Koné', created_at: '2026-03-15' },
  // Décathlon (dos13) — PROSPECT
  { id: 'evt100', dossier_id: 'dos13', event_type: 'STAGE_CHANGE', title: 'Prospection cold outreach', description: 'Contact initié par email — Décathlon Afrique en recherche d\'implantation CI', stage: 'PROSPECT', created_by: 'Amadou Koné', created_at: '2026-03-01' },
  { id: 'evt101', dossier_id: 'dos13', event_type: 'EMAIL', title: 'Présentation envoyée', description: 'Dossier de présentation Cosmos Yopougon envoyé à Jean Dupont', stage: 'PROSPECT', created_by: 'Amadou Koné', created_at: '2026-03-10' },
];

// ─── Dossier Documents ──────────────────────────────────────

export interface DossierDocument {
  id: string;
  dossier_id: string;
  name: string;
  doc_type: string;
  uploaded_at: string;
  verified: boolean;
}

export const mockDossierDocuments: DossierDocument[] = [
  // Sephora (dos10)
  { id: 'doc1', dossier_id: 'dos10', name: 'Business Plan Sephora CI 2026', doc_type: 'BUSINESS_PLAN', uploaded_at: '2025-12-10', verified: true },
  { id: 'doc2', dossier_id: 'dos10', name: 'Prévisionnel CA 36 mois', doc_type: 'PREVISIONNEL', uploaded_at: '2025-12-10', verified: true },
  { id: 'doc3', dossier_id: 'dos10', name: 'RCCM Sephora CI', doc_type: 'RCCM', uploaded_at: '2025-12-18', verified: true },
  { id: 'doc4', dossier_id: 'dos10', name: 'Attestation fiscale DGI', doc_type: 'ATTESTATION_FISCALE', uploaded_at: '2025-12-18', verified: true },
  { id: 'doc5', dossier_id: 'dos10', name: 'Garantie maison-mère LVMH', doc_type: 'GUARANTEE', uploaded_at: '2026-01-15', verified: true },
  { id: 'doc6', dossier_id: 'dos10', name: 'Plans d\'aménagement V2', doc_type: 'PLANS', uploaded_at: '2026-02-20', verified: true },
  { id: 'doc7', dossier_id: 'dos10', name: 'Contrat de réservation signé', doc_type: 'RESERVATION', uploaded_at: '2026-03-28', verified: true },
  // Zara (dos8)
  { id: 'doc10', dossier_id: 'dos8', name: 'Présentation Inditex Group', doc_type: 'BUSINESS_PLAN', uploaded_at: '2026-02-03', verified: true },
  { id: 'doc11', dossier_id: 'dos8', name: 'RCCM Zara CI', doc_type: 'RCCM', uploaded_at: '2026-02-10', verified: true },
  { id: 'doc12', dossier_id: 'dos8', name: 'Rapport visite architecte', doc_type: 'VISIT_REPORT', uploaded_at: '2026-02-15', verified: true },
  // Burger King (dos9)
  { id: 'doc20', dossier_id: 'dos9', name: 'Business Plan BK CI', doc_type: 'BUSINESS_PLAN', uploaded_at: '2026-01-25', verified: true },
  { id: 'doc21', dossier_id: 'dos9', name: 'RCCM BK West Africa', doc_type: 'RCCM', uploaded_at: '2026-02-01', verified: false },
  // Nike (dos14)
  { id: 'doc30', dossier_id: 'dos14', name: 'Business Plan Nike CI', doc_type: 'BUSINESS_PLAN', uploaded_at: '2025-11-20', verified: true },
  { id: 'doc31', dossier_id: 'dos14', name: 'RCCM Nike Store CI', doc_type: 'RCCM', uploaded_at: '2025-12-01', verified: true },
  { id: 'doc32', dossier_id: 'dos14', name: 'Plans aménagement Nike', doc_type: 'PLANS', uploaded_at: '2026-02-10', verified: true },
  { id: 'doc33', dossier_id: 'dos14', name: 'Bail signé Nike', doc_type: 'LEASE', uploaded_at: '2026-03-10', verified: true },
  // KFC (dos15)
  { id: 'doc40', dossier_id: 'dos15', name: 'Business Plan KFC WA', doc_type: 'BUSINESS_PLAN', uploaded_at: '2026-01-20', verified: true },
  { id: 'doc41', dossier_id: 'dos15', name: 'RCCM KFC West Africa', doc_type: 'RCCM', uploaded_at: '2026-02-01', verified: true },
  { id: 'doc42', dossier_id: 'dos15', name: 'Contrat de réservation KFC', doc_type: 'RESERVATION', uploaded_at: '2026-03-01', verified: true },
  // Carrefour (dos1) — exploitation
  { id: 'doc50', dossier_id: 'dos1', name: 'RCCM CFAO Retail CI', doc_type: 'RCCM', uploaded_at: '2021-10-20', verified: true },
  { id: 'doc51', dossier_id: 'dos1', name: 'Bail LEA-2022-0001', doc_type: 'LEASE', uploaded_at: '2022-03-15', verified: true },
  { id: 'doc52', dossier_id: 'dos1', name: 'PV réception aménagement', doc_type: 'PV_RECEPTION', uploaded_at: '2022-03-30', verified: true },
];

// ─── Dossier Checklists ─────────────────────────────────────

export interface DossierChecklist {
  dossier_id: string;
  items: { label: string; done: boolean }[];
}

export const mockDossierChecklists: DossierChecklist[] = [
  {
    dossier_id: 'dos10',
    items: [
      { label: 'Business plan reçu', done: true },
      { label: 'Prévisionnel CA validé', done: true },
      { label: 'RCCM vérifié', done: true },
      { label: 'Attestation fiscale DGI', done: true },
      { label: 'Garantie maison-mère', done: true },
      { label: 'Vérification solvabilité (score A)', done: true },
      { label: 'Visite du local réalisée', done: true },
      { label: 'Plans d\'aménagement reçus', done: true },
    ],
  },
  {
    dossier_id: 'dos8',
    items: [
      { label: 'Business plan reçu', done: true },
      { label: 'Prévisionnel CA validé', done: true },
      { label: 'RCCM vérifié', done: true },
      { label: 'Attestation fiscale DGI', done: false },
      { label: 'Vérification solvabilité', done: true },
      { label: 'Visite du local réalisée', done: true },
      { label: 'Plans d\'aménagement reçus', done: false },
    ],
  },
  {
    dossier_id: 'dos9',
    items: [
      { label: 'Business plan reçu', done: true },
      { label: 'Prévisionnel CA validé', done: false },
      { label: 'RCCM vérifié', done: false },
      { label: 'Attestation fiscale DGI', done: false },
      { label: 'Vérification solvabilité', done: false },
      { label: 'Visite du local réalisée', done: true },
      { label: 'Plans d\'aménagement reçus', done: false },
    ],
  },
  {
    dossier_id: 'dos14',
    items: [
      { label: 'Business plan reçu', done: true },
      { label: 'Prévisionnel CA validé', done: true },
      { label: 'RCCM vérifié', done: true },
      { label: 'Attestation fiscale DGI', done: true },
      { label: 'Garantie maison-mère', done: true },
      { label: 'Vérification solvabilité', done: true },
      { label: 'Visite du local réalisée', done: true },
      { label: 'Plans d\'aménagement reçus', done: true },
    ],
  },
  {
    dossier_id: 'dos15',
    items: [
      { label: 'Business plan reçu', done: true },
      { label: 'Prévisionnel CA validé', done: true },
      { label: 'RCCM vérifié', done: true },
      { label: 'Attestation fiscale DGI', done: true },
      { label: 'Vérification solvabilité', done: true },
      { label: 'Visite du local réalisée', done: true },
      { label: 'Plans d\'aménagement reçus', done: false },
    ],
  },
  {
    dossier_id: 'dos1',
    items: [
      { label: 'Business plan reçu', done: true },
      { label: 'Prévisionnel CA validé', done: true },
      { label: 'RCCM vérifié', done: true },
      { label: 'Attestation fiscale DGI', done: true },
      { label: 'Vérification solvabilité', done: true },
      { label: 'Visite du local réalisée', done: true },
      { label: 'Plans d\'aménagement reçus', done: true },
    ],
  },
  {
    dossier_id: 'dos11',
    items: [
      { label: 'Business plan reçu', done: false },
      { label: 'Prévisionnel CA validé', done: false },
      { label: 'RCCM vérifié', done: false },
      { label: 'Attestation fiscale DGI', done: false },
      { label: 'Vérification solvabilité', done: false },
      { label: 'Visite du local réalisée', done: false },
    ],
  },
  {
    dossier_id: 'dos12',
    items: [
      { label: 'Business plan reçu', done: false },
      { label: 'RCCM vérifié', done: false },
      { label: 'Attestation fiscale DGI', done: false },
      { label: 'Vérification solvabilité', done: false },
    ],
  },
  {
    dossier_id: 'dos13',
    items: [
      { label: 'Prise de contact effectuée', done: true },
      { label: 'Business plan reçu', done: false },
      { label: 'RCCM vérifié', done: false },
    ],
  },
];

// ─── Offer Details ──────────────────────────────────────────

export interface OfferDetail {
  id: string;
  dossier_id: string;
  property_code: string;
  surface_sqm: number;
  rent_per_sqm: number;
  total_rent_monthly: number;
  charges_monthly: number;
  duration_months: number;
  franchise_months: number;
  contribution_amenagement: number;
  deposit_months: number;
  stepped_rent?: { from: number; to: number; pct: number }[];
  revenue_share_pct?: number;
  mgr_amount?: number;
  status: 'DRAFT' | 'SENT' | 'COUNTER_PROPOSAL' | 'ACCEPTED' | 'REJECTED';
  sent_date: string;
}

export const mockOfferDetails: OfferDetail[] = [
  {
    id: 'off1',
    dossier_id: 'dos10',
    property_code: 'LOT-R2-001',
    surface_sqm: 180,
    rent_per_sqm: 25000,
    total_rent_monthly: 4500000,
    charges_monthly: 900000,
    duration_months: 60,
    franchise_months: 2,
    contribution_amenagement: 10000000,
    deposit_months: 2,
    stepped_rent: [
      { from: 1, to: 6, pct: 75 },
      { from: 7, to: 60, pct: 100 },
    ],
    status: 'ACCEPTED',
    sent_date: '2026-02-05',
  },
  {
    id: 'off2',
    dossier_id: 'dos8',
    property_code: 'LOT-RDC-004',
    surface_sqm: 150,
    rent_per_sqm: 18000,
    total_rent_monthly: 2700000,
    charges_monthly: 450000,
    duration_months: 72,
    franchise_months: 3,
    contribution_amenagement: 15000000,
    deposit_months: 2,
    stepped_rent: [
      { from: 1, to: 3, pct: 0 },
      { from: 4, to: 12, pct: 75 },
      { from: 13, to: 72, pct: 100 },
    ],
    revenue_share_pct: 0.06,
    mgr_amount: 2700000,
    status: 'COUNTER_PROPOSAL',
    sent_date: '2026-02-20',
  },
  {
    id: 'off3',
    dossier_id: 'dos9',
    property_code: 'LOT-RDC-004',
    surface_sqm: 220,
    rent_per_sqm: 16000,
    total_rent_monthly: 3520000,
    charges_monthly: 660000,
    duration_months: 60,
    franchise_months: 3,
    contribution_amenagement: 12000000,
    deposit_months: 2,
    status: 'SENT',
    sent_date: '2026-03-15',
  },
  {
    id: 'off4',
    dossier_id: 'dos14',
    property_code: 'LOT-R2-001',
    surface_sqm: 300,
    rent_per_sqm: 15000,
    total_rent_monthly: 4500000,
    charges_monthly: 900000,
    duration_months: 60,
    franchise_months: 2,
    contribution_amenagement: 20000000,
    deposit_months: 2,
    status: 'ACCEPTED',
    sent_date: '2026-01-10',
  },
  {
    id: 'off5',
    dossier_id: 'dos15',
    property_code: 'LOT-RDC-004',
    surface_sqm: 200,
    rent_per_sqm: 16000,
    total_rent_monthly: 3200000,
    charges_monthly: 600000,
    duration_months: 72,
    franchise_months: 3,
    contribution_amenagement: 18000000,
    deposit_months: 2,
    revenue_share_pct: 0.07,
    mgr_amount: 3200000,
    status: 'ACCEPTED',
    sent_date: '2026-02-10',
  },
  {
    id: 'off6',
    dossier_id: 'dos1',
    property_code: 'LOT-RDC-001',
    surface_sqm: 250,
    rent_per_sqm: 18000,
    total_rent_monthly: 4500000,
    charges_monthly: 750000,
    duration_months: 72,
    franchise_months: 0,
    contribution_amenagement: 0,
    deposit_months: 2,
    revenue_share_pct: 0.08,
    mgr_amount: 4500000,
    status: 'ACCEPTED',
    sent_date: '2021-11-25',
  },
];

// ─── Visit Reports ──────────────────────────────────────────

export interface VisitReport {
  id: string;
  dossier_id: string;
  date: string;
  property_code: string;
  participants: string[];
  impression: 'POSITIVE' | 'MITIGEE' | 'NEGATIVE';
  notes: string;
  next_steps?: string;
}

export const mockVisitReports: VisitReport[] = [
  {
    id: 'vis1',
    dossier_id: 'dos10',
    date: '2026-01-08',
    property_code: 'LOT-R2-001',
    participants: ['Laetitia N\'Guessan', 'Architecte Sephora', 'Amadou Koné'],
    impression: 'POSITIVE',
    notes: 'Excellent accueil du local. Surface adaptée au concept flagship. Double hauteur appréciée. Demande plans techniques pour évaluation aménagement.',
    next_steps: 'Transmettre plans techniques + devis estimation travaux',
  },
  {
    id: 'vis2',
    dossier_id: 'dos10',
    date: '2026-01-20',
    property_code: 'LOT-R2-001',
    participants: ['DG Sephora CI', 'Laetitia N\'Guessan', 'Amadou Koné'],
    impression: 'POSITIVE',
    notes: 'Visite de validation avec le DG. Discussions sur les aménagements techniques (ventilation, éclairage). Validation de principe du DG. Demande d\'une offre commerciale formelle.',
    next_steps: 'Préparer offre commerciale avec paliers progressifs',
  },
  {
    id: 'vis3',
    dossier_id: 'dos8',
    date: '2026-02-12',
    property_code: 'LOT-RDC-004',
    participants: ['Marie Kouassi', 'Architecte Inditex', 'Amadou Koné'],
    impression: 'POSITIVE',
    notes: 'Local Zone B visitée. Surface correspond aux besoins (150m²+). Bonne visibilité depuis la galerie principale. L\'architecte valide la faisabilité technique.',
    next_steps: 'Architecte Inditex produira un schéma d\'implantation sous 15j',
  },
  {
    id: 'vis4',
    dossier_id: 'dos9',
    date: '2026-02-05',
    property_code: 'LOT-RDC-004',
    participants: ['Yves Coulibaly', 'Architecte BK', 'Amadou Koné'],
    impression: 'MITIGEE',
    notes: 'Local techniquement compatible mais surface un peu juste pour le format BK standard (220m² min). Discussion sur possibilité d\'extension vers zone adjacente.',
    next_steps: 'Étudier configuration élargie avec zone adjacente',
  },
  {
    id: 'vis5',
    dossier_id: 'dos14',
    date: '2025-12-05',
    property_code: 'LOT-R2-001',
    participants: ['Adama Touré', 'Amadou Koné'],
    impression: 'POSITIVE',
    notes: 'Nike très intéressé par la localisation Étage 2. Bonne synergie avec les autres enseignes sport envisagées. Validation rapide côté Nike.',
    next_steps: 'Préparer offre commerciale',
  },
];
