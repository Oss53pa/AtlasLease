// ---------------------------------------------------------------------------
// Notification Dispatch Service
// ---------------------------------------------------------------------------
// TODO: Replace in-memory store with Supabase table `notifications` and
//       integrate real delivery channels (SendGrid, Twilio, WhatsApp API).
// ---------------------------------------------------------------------------

// TODO: import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NotificationChannel = 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PORTAL';

export type NotificationStatus = 'QUEUED' | 'SENT' | 'DELIVERED' | 'FAILED' | 'READ';

export type AlertRuleType =
  | 'LEASE_EXPIRY_90'
  | 'LEASE_EXPIRY_60'
  | 'LEASE_EXPIRY_30'
  | 'LEASE_EXPIRY_7'
  | 'INVOICE_OVERDUE'
  | 'GUARANTEE_EXPIRY';

export interface Notification {
  id: string;
  type: AlertRuleType | string;
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  body: string;
  status: NotificationStatus;
  sent_at: string | null;   // ISO-8601
  read_at: string | null;   // ISO-8601
  created_at: string;       // ISO-8601
}

export interface AlertRule {
  id: string;
  type: AlertRuleType;
  days_before: number;
  channels: NotificationChannel[];
  template_subject: string;
  template_body: string;
  enabled: boolean;
}

export interface SendNotificationParams {
  type: AlertRuleType | string;
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  body: string;
}

// ---------------------------------------------------------------------------
// Default alert rule definitions
// ---------------------------------------------------------------------------

export const DEFAULT_ALERT_RULES: AlertRule[] = [
  {
    id: 'rule_lease_expiry_90',
    type: 'LEASE_EXPIRY_90',
    days_before: 90,
    channels: ['EMAIL', 'PORTAL'],
    template_subject: 'Lease expiring in 90 days: {{lease_ref}}',
    template_body: 'Lease {{lease_ref}} for property {{property_name}} expires on {{expiry_date}}. Please review renewal options.',
    enabled: true,
  },
  {
    id: 'rule_lease_expiry_60',
    type: 'LEASE_EXPIRY_60',
    days_before: 60,
    channels: ['EMAIL', 'PORTAL'],
    template_subject: 'Lease expiring in 60 days: {{lease_ref}}',
    template_body: 'Lease {{lease_ref}} for property {{property_name}} expires on {{expiry_date}}. Action required.',
    enabled: true,
  },
  {
    id: 'rule_lease_expiry_30',
    type: 'LEASE_EXPIRY_30',
    days_before: 30,
    channels: ['EMAIL', 'SMS', 'PORTAL'],
    template_subject: 'URGENT: Lease expiring in 30 days: {{lease_ref}}',
    template_body: 'Lease {{lease_ref}} for property {{property_name}} expires on {{expiry_date}}. Immediate action required.',
    enabled: true,
  },
  {
    id: 'rule_lease_expiry_7',
    type: 'LEASE_EXPIRY_7',
    days_before: 7,
    channels: ['EMAIL', 'SMS', 'WHATSAPP', 'PORTAL'],
    template_subject: 'CRITICAL: Lease expiring in 7 days: {{lease_ref}}',
    template_body: 'Lease {{lease_ref}} for property {{property_name}} expires on {{expiry_date}}. This is your final reminder.',
    enabled: true,
  },
  {
    id: 'rule_invoice_overdue',
    type: 'INVOICE_OVERDUE',
    days_before: 0,
    channels: ['EMAIL', 'SMS', 'PORTAL'],
    template_subject: 'Invoice overdue: {{invoice_ref}}',
    template_body: 'Invoice {{invoice_ref}} of amount {{amount}} is overdue since {{due_date}}. Please arrange payment.',
    enabled: true,
  },
  {
    id: 'rule_guarantee_expiry',
    type: 'GUARANTEE_EXPIRY',
    days_before: 30,
    channels: ['EMAIL', 'PORTAL'],
    template_subject: 'Guarantee expiring: {{guarantee_ref}}',
    template_body: 'Guarantee {{guarantee_ref}} for lease {{lease_ref}} expires on {{expiry_date}}. Please arrange renewal.',
    enabled: true,
  },
];

// ---------------------------------------------------------------------------
// In-memory mock store
// ---------------------------------------------------------------------------

let notificationStore: Notification[] = [];

function generateId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Queue / send a notification.
 *
 * In mock mode the notification is stored in-memory with status SENT.
 * When real channels are integrated, this will dispatch to the appropriate
 * provider and set status accordingly.
 */
export async function sendNotification(
  params: SendNotificationParams,
): Promise<Notification> {
  const now = new Date().toISOString();

  const notification: Notification = {
    id: generateId(),
    type: params.type,
    channel: params.channel,
    recipient: params.recipient,
    subject: params.subject,
    body: params.body,
    status: 'SENT', // TODO: set to QUEUED and process asynchronously
    sent_at: now,
    read_at: null,
    created_at: now,
  };

  // TODO: Replace with Supabase insert + channel dispatch
  // const { error } = await supabase.from('notifications').insert(notification);

  notificationStore.push(notification);
  return notification;
}

/**
 * Retrieve notifications for a recipient, optionally filtered by status.
 * Returns in reverse-chronological order.
 */
export async function getNotifications(
  recipient: string,
  options?: { status?: NotificationStatus; channel?: NotificationChannel },
): Promise<Notification[]> {
  // TODO: Replace with Supabase query
  return notificationStore
    .filter((n) => {
      if (n.recipient !== recipient) return false;
      if (options?.status && n.status !== options.status) return false;
      if (options?.channel && n.channel !== options.channel) return false;
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
}

/**
 * Mark a portal notification as read.
 */
export async function markAsRead(notificationId: string): Promise<Notification> {
  // TODO: Replace with Supabase update
  const notification = notificationStore.find((n) => n.id === notificationId);
  if (!notification) {
    throw new Error(`Notification ${notificationId} not found`);
  }

  notification.status = 'READ';
  notification.read_at = new Date().toISOString();
  return notification;
}

/**
 * Render a template string by replacing `{{key}}` placeholders.
 */
export function renderTemplate(
  template: string,
  variables: Record<string, string>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    return variables[key] ?? `{{${key}}}`;
  });
}

/**
 * Send notifications for an alert rule, filling in template variables.
 */
export async function triggerAlert(
  ruleType: AlertRuleType,
  recipient: string,
  variables: Record<string, string>,
): Promise<Notification[]> {
  const rule = DEFAULT_ALERT_RULES.find((r) => r.type === ruleType);
  if (!rule) throw new Error(`Unknown alert rule: ${ruleType}`);
  if (!rule.enabled) return [];

  const subject = renderTemplate(rule.template_subject, variables);
  const body = renderTemplate(rule.template_body, variables);

  const notifications: Notification[] = [];
  for (const channel of rule.channels) {
    const n = await sendNotification({
      type: rule.type,
      channel,
      recipient,
      subject,
      body,
    });
    notifications.push(n);
  }

  return notifications;
}

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

/** @internal Reset the in-memory store. Useful for tests. */
export function _resetStore(): void {
  notificationStore = [];
}
