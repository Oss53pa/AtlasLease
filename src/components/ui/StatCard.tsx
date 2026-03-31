import { clsx } from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatCard({ label, value, subtitle, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={clsx('bg-white border border-neutral-200 rounded-lg p-4', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
          <p className="mt-1 text-xl font-bold font-mono text-neutral-900">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-neutral-500">{subtitle}</p>}
          {trend && (
            <p className={clsx('mt-1 text-xs font-semibold', trend.positive ? 'text-success-600' : 'text-error-600')}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2 bg-neutral-100 rounded-lg">
            <Icon size={18} className="text-neutral-600" />
          </div>
        )}
      </div>
    </div>
  );
}
