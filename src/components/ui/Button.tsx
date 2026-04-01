import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const variants = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950',
  secondary: 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100',
  danger: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800',
  ghost: 'text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200',
} as const;

const sizes = {
  sm: 'px-2.5 py-1 text-2xs gap-1',
  md: 'px-3.5 py-1.5 text-xs gap-1.5',
  lg: 'px-5 py-2.5 text-sm gap-2',
} as const;

const iconSizes = {
  sm: 13,
  md: 15,
  lg: 17,
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: LucideIcon;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-md transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-1',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 size={iconSizes[size]} className="animate-spin" />
      ) : Icon ? (
        <Icon size={iconSizes[size]} />
      ) : null}
      {children}
    </button>
  );
}
