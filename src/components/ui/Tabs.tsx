import { clsx } from 'clsx';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={clsx('flex border-b border-neutral-200', className)}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={clsx(
              'px-3.5 py-2 text-xs font-semibold transition-colors -mb-px border-b-2',
              isActive
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
