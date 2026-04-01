// ---------------------------------------------------------------------------
// Audit Trail Service
// ---------------------------------------------------------------------------
// TODO: Replace in-memory store with Supabase table `audit_log` once the
//       schema migration is in place.
// ---------------------------------------------------------------------------

// TODO: import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';

export interface AuditChanges {
  old: Record<string, unknown> | null;
  new: Record<string, unknown> | null;
}

export interface AuditEntry {
  id: string;
  entity_type: string;
  entity_id: string;
  action: AuditAction;
  changes: AuditChanges;
  user_id: string;
  timestamp: string; // ISO-8601
}

// ---------------------------------------------------------------------------
// In-memory mock store
// ---------------------------------------------------------------------------

let auditStore: AuditEntry[] = [];

function generateId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Record an audit entry for a data change.
 *
 * When Supabase is wired up this will insert into the `audit_log` table.
 */
export async function logChange(
  params: Omit<AuditEntry, 'id' | 'timestamp'>,
): Promise<AuditEntry> {
  const entry: AuditEntry = {
    id: generateId(),
    ...params,
    timestamp: new Date().toISOString(),
  };

  // TODO: Replace with Supabase insert
  // const { error } = await supabase.from('audit_log').insert(entry);
  // if (error) throw error;

  auditStore.push(entry);
  return entry;
}

/**
 * Retrieve the audit log for a given entity (type + id).
 * Returns entries in reverse-chronological order.
 *
 * When Supabase is wired up this will query the `audit_log` table.
 */
export async function getAuditLog(
  entityType: string,
  entityId: string,
): Promise<AuditEntry[]> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('audit_log')
  //   .select('*')
  //   .eq('entity_type', entityType)
  //   .eq('entity_id', entityId)
  //   .order('timestamp', { ascending: false });

  return auditStore
    .filter(
      (e) => e.entity_type === entityType && e.entity_id === entityId,
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
}

/**
 * Retrieve all audit entries for a specific user.
 */
export async function getAuditLogByUser(
  userId: string,
): Promise<AuditEntry[]> {
  // TODO: Replace with Supabase query
  return auditStore
    .filter((e) => e.user_id === userId)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
}

// ---------------------------------------------------------------------------
// Test helpers (not for production use)
// ---------------------------------------------------------------------------

/** @internal Reset the in-memory store. Useful for tests. */
export function _resetStore(): void {
  auditStore = [];
}
