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

export type LifecycleStage =
  | 'PROSPECT'
  | 'QUALIFICATION'
  | 'VISITE'
  | 'OFFRE'
  | 'NEGOCIATION'
  | 'RESERVATION'
  | 'BAIL'
  | 'AMENAGEMENT'
  | 'EXPLOITATION';

export type TimelineEventType =
  | 'STAGE_CHANGE'
  | 'NOTE'
  | 'EMAIL'
  | 'CALL'
  | 'MEETING'
  | 'DOCUMENT'
  | 'VISIT'
  | 'OFFER_SENT'
  | 'OFFER_ACCEPTED'
  | 'OFFER_REJECTED'
  | 'RESERVATION_SIGNED'
  | 'LEASE_SIGNED'
  | 'AMENAGEMENT_START'
  | 'AMENAGEMENT_END'
  | 'EXPLOITATION_START'
  | 'PAYMENT'
  | 'ALERT';

export type Currency = 'XOF' | 'XAF' | 'EUR' | 'USD';
