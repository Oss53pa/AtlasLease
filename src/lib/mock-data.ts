import type {
  Building, Property, Tenant, Lease, RentCondition, Invoice, Payment,
  LeaseAmendment, LeaseOption, SecurityDepositAccount, ActiveLeaseView,
  ShortTermLicense, AdInventory, Prospect,
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
  { id: 'pr3', organization_id: 'org1', company_name: 'Décathlon Afrique', contact_name: 'Jean Dupont', activity_sector: 'Sport', surface_min_sqm: 500, surface_max_sqm: 800, source: 'COLD_OUTREACH', status: 'QUALIFIED', match_score: 65, created_at: '2026-03-01', updated_at: '2026-03-20' },
];
