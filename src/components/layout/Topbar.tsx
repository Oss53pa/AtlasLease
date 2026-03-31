import { Search, Bell, Clock } from 'lucide-react';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
      <div className="flex items-center justify-between h-12 px-6">
        <div>
          <h1 className="text-sm font-semibold text-neutral-900">{title}</h1>
          {subtitle && <p className="text-2xs text-neutral-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-48 pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:bg-white placeholder:text-neutral-400"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-2xs text-neutral-400 font-mono">⌘K</kbd>
          </div>
          {/* Notifications */}
          <button className="relative p-1.5 rounded-md hover:bg-neutral-100 transition-colors">
            <Bell size={16} className="text-neutral-500" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-error-500 rounded-full" />
          </button>
          {/* Timezone */}
          <div className="flex items-center gap-1 text-2xs text-neutral-400 font-mono">
            <Clock size={11} />
            <span>Abidjan UTC+0</span>
          </div>
        </div>
      </div>
    </header>
  );
}
