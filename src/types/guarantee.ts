import type {
  InstrumentType,
  InstrumentStatus,
  DepositStatus,
  DepositMovementType,
  KeyMoneyTreatment,
  KeyMoneyStatus,
} from './enums';

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
