import { clsx } from 'clsx';

export function PaymentScoreBadge({ score }: { score: number }) {
  const color = score >= 90
    ? 'text-success-700 bg-success-50'
    : score >= 70
      ? 'text-warning-700 bg-warning-50'
      : 'text-error-700 bg-error-50';

  return (
    <span className={clsx('inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-2xs font-mono font-bold', color)}>
      {score}
    </span>
  );
}
