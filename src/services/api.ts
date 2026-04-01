import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

// ---------------------------------------------------------------------------
// Error handling wrapper
// ---------------------------------------------------------------------------

async function withErrorHandling<T>(
  operation: () => Promise<T>,
): Promise<ApiResponse<T>> {
  try {
    const data = await operation();
    return { data, error: null };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unknown error occurred';
    return { data: null, error: { message } };
  }
}

// ---------------------------------------------------------------------------
// Generic CRUD helpers
// ---------------------------------------------------------------------------

/**
 * Fetch all rows from a Supabase table with optional filters.
 */
export async function getAll<T extends Record<string, unknown>>(
  table: string,
  options?: {
    filters?: Record<string, unknown>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    offset?: number;
  },
): Promise<ApiResponse<T[]>> {
  return withErrorHandling(async () => {
    let query = supabase.from(table).select('*');

    if (options?.filters) {
      for (const [key, value] of Object.entries(options.filters)) {
        query = query.eq(key, value);
      }
    }

    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(
        options.offset,
        options.offset + (options?.limit ?? 50) - 1,
      );
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as T[];
  });
}

/**
 * Fetch a single row by its primary key.
 */
export async function getById<T extends Record<string, unknown>>(
  table: string,
  id: string,
  idColumn = 'id',
): Promise<ApiResponse<T>> {
  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq(idColumn, id)
      .single();
    if (error) throw error;
    return data as T;
  });
}

/**
 * Insert a new row and return it.
 */
export async function create<T extends Record<string, unknown>>(
  table: string,
  payload: Partial<T>,
): Promise<ApiResponse<T>> {
  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data as T;
  });
}

/**
 * Update an existing row by its primary key and return the updated row.
 */
export async function update<T extends Record<string, unknown>>(
  table: string,
  id: string,
  payload: Partial<T>,
  idColumn = 'id',
): Promise<ApiResponse<T>> {
  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq(idColumn, id)
      .select()
      .single();
    if (error) throw error;
    return data as T;
  });
}

/**
 * Delete a row by its primary key.
 */
export async function remove(
  table: string,
  id: string,
  idColumn = 'id',
): Promise<ApiResponse<{ id: string }>> {
  return withErrorHandling(async () => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq(idColumn, id);
    if (error) throw error;
    return { id };
  });
}
