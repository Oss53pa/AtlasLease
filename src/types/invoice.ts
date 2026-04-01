import type {
  InvoiceStatus,
  InvoiceType,
  PaymentMethod,
  PaymentStatus,
} from './enums';
import type { Lease } from './lease';

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
