import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface Step {
  key: string;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: string;
  onStepClick?: (key: string) => void;
  className?: string;
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className={clsx('flex items-center', className)}>
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isClickable = !!onStepClick;

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            {/* Step circle + label */}
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => onStepClick?.(step.key)}
              className={clsx(
                'flex flex-col items-center gap-1.5 group',
                isClickable && 'cursor-pointer',
                !isClickable && 'cursor-default',
              )}
            >
              <div
                className={clsx(
                  'flex items-center justify-center w-7 h-7 rounded-full text-2xs font-bold transition-colors',
                  isCompleted && 'bg-neutral-900 text-white',
                  isCurrent && 'border-2 border-neutral-900 text-neutral-900 bg-white',
                  !isCompleted && !isCurrent && 'border-2 border-neutral-300 text-neutral-400 bg-white',
                  isClickable && 'group-hover:border-neutral-500',
                )}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={clsx(
                  'text-2xs font-semibold whitespace-nowrap',
                  isCurrent ? 'text-neutral-900' : isCompleted ? 'text-neutral-600' : 'text-neutral-400',
                )}
              >
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={clsx(
                  'flex-1 h-px mx-3 mt-[-1.25rem]',
                  i < currentIndex ? 'bg-neutral-900' : 'bg-neutral-300',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
