import { clsx } from 'clsx';

interface Column<T> {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  className,
  emptyMessage = 'No data',
}: DataTableProps<T>) {
  const alignClass = (align?: string) =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={clsx('overflow-x-auto bg-white border border-neutral-200 rounded-lg', className)}>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  'px-4 py-2.5 text-2xs font-semibold uppercase tracking-wide text-neutral-500',
                  alignClass(col.align),
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-neutral-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={clsx(
                  'border-b border-neutral-100 last:border-b-0 transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-neutral-50',
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={clsx('px-4 py-2.5 text-neutral-700', alignClass(col.align))}>
                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
