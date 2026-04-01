// ---------------------------------------------------------------------------
// Export Service -- PDF / Excel / CSV generation
// ---------------------------------------------------------------------------
// CSV export is fully implemented. PDF export is stubbed with a TODO for
// integration with a library like jsPDF or pdfmake.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ColumnDef {
  /** Key in the data object */
  key: string;
  /** Display header for the column */
  header: string;
  /** Optional formatter for the cell value */
  format?: (value: unknown) => string;
}

export interface ExportOptions {
  filename: string;
  /** Optional sheet name (for Excel-like exports) */
  sheetName?: string;
}

export interface PdfTemplate {
  title: string;
  subtitle?: string;
  orientation?: 'portrait' | 'landscape';
  pageSize?: 'A4' | 'LETTER';
  headerLogo?: string;
  footerText?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Escape a CSV cell value according to RFC 4180.
 * Wraps in double-quotes if the value contains a comma, newline, or quote.
 */
function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Trigger a file download in the browser by creating a temporary anchor tag.
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 100);
}

// ---------------------------------------------------------------------------
// CSV Export (fully implemented)
// ---------------------------------------------------------------------------

/**
 * Generate a CSV string from an array of objects.
 */
export function generateCsv(
  data: Record<string, unknown>[],
  columns: ColumnDef[],
): string {
  const header = columns.map((c) => escapeCsvCell(c.header)).join(',');

  const rows = data.map((row) =>
    columns
      .map((col) => {
        const raw = row[col.key];
        const formatted = col.format ? col.format(raw) : formatCellValue(raw);
        return escapeCsvCell(formatted);
      })
      .join(','),
  );

  return [header, ...rows].join('\n');
}

/**
 * Export data as a CSV file and trigger download in the browser.
 */
export function exportToCsv(
  data: Record<string, unknown>[],
  columns: ColumnDef[],
  filename: string,
): void {
  const csv = generateCsv(data, columns);
  const blob = new Blob(['\uFEFF' + csv], {
    type: 'text/csv;charset=utf-8;',
  });
  const safeName = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  downloadBlob(blob, safeName);
}

// ---------------------------------------------------------------------------
// Excel Export (simple CSV-based, upgradeable to xlsx)
// ---------------------------------------------------------------------------

/**
 * Export data to an "Excel-compatible" file.
 *
 * Currently generates a CSV file with an `.csv` extension. When a proper
 * Excel library (e.g. SheetJS/xlsx) is added, this function can be updated
 * to produce real `.xlsx` files without changing the call sites.
 *
 * TODO: Replace with SheetJS/xlsx for native .xlsx output with styling,
 *       multiple sheets, and formula support.
 */
export function exportToExcel(
  data: Record<string, unknown>[],
  columns: ColumnDef[],
  filename: string,
): void {
  // For now, delegate to CSV export
  const safeName = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  exportToCsv(data, columns, safeName);
}

// ---------------------------------------------------------------------------
// PDF Export (stub)
// ---------------------------------------------------------------------------

/**
 * Export data as a PDF document.
 *
 * TODO: Integrate with jsPDF or pdfmake to produce real PDF output.
 *       The template parameter will control layout, headers, and branding.
 *
 * Currently falls back to CSV export and logs a warning.
 */
export function exportToPdf(
  data: Record<string, unknown>[],
  columns: ColumnDef[],
  template: PdfTemplate,
): void {
  console.warn(
    '[export.service] PDF export is not yet implemented. Falling back to CSV.',
  );

  // Fallback: export as CSV so the user still gets *some* output
  const filename = `${template.title.replace(/\s+/g, '_')}.csv`;
  exportToCsv(data, columns, filename);
}

/**
 * Generate a Blob for a CSV export (useful when you need the Blob directly
 * rather than triggering a download, e.g. for email attachments).
 */
export function generateCsvBlob(
  data: Record<string, unknown>[],
  columns: ColumnDef[],
): Blob {
  const csv = generateCsv(data, columns);
  return new Blob(['\uFEFF' + csv], {
    type: 'text/csv;charset=utf-8;',
  });
}
