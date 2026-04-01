import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard, Building2, FileText, TableProperties, Receipt,
  GitBranch, AlertTriangle, Tent, Megaphone, PieChart,
  Car, Users, Brain, ChevronDown, ChevronRight, FolderOpen,
  RefreshCw, Scissors, Layers, Calculator, Landmark, Wrench,
  BarChart3, TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  children?: { label: string; path: string }[];
}

const navigation: NavSection[] = [
  {
    title: 'Vue d\'ensemble',
    items: [
      { label: 'Dashboard NOI', path: '/', icon: LayoutDashboard },
      { label: 'Stacking Plan', path: '/stacking-plan', icon: Layers },
    ],
  },
  {
    title: 'CRM & Prospection',
    items: [
      { label: 'Prospects', path: '/prospects', icon: Users },
      { label: 'Dossiers Locataires', path: '/tenants', icon: FolderOpen },
    ],
  },
  {
    title: 'Cycle locatif',
    items: [
      { label: 'Patrimoine', path: '/properties', icon: Building2 },
      { label: 'Contrats', path: '/leases', icon: FileText, badge: '7' },
      { label: 'Rent Roll', path: '/rent-roll', icon: TableProperties },
      { label: 'Renouvellements', path: '/renewals', icon: RefreshCw },
      { label: 'Amendments', path: '/amendments', icon: GitBranch },
      { label: 'Résiliations', path: '/terminations', icon: Scissors },
    ],
  },
  {
    title: 'Facturation & Recouvrement',
    items: [
      { label: 'Facturation', path: '/billing', icon: Receipt },
      { label: 'Charges & Régul.', path: '/charges', icon: Calculator },
      { label: 'Taxes locales', path: '/taxes', icon: Landmark },
      { label: 'Recouvrement', path: '/recovery', icon: AlertTriangle },
    ],
  },
  {
    title: 'Revenus commerciaux',
    items: [
      { label: 'Éphémères', path: '/short-term', icon: Tent },
      { label: 'Régie Pub', path: '/advertising', icon: Megaphone },
      { label: 'Revenue Share', path: '/revenue-share', icon: PieChart },
      { label: 'Parking', path: '/parking', icon: Car },
    ],
  },
  {
    title: 'Technique',
    items: [
      { label: 'Maintenance', path: '/maintenance', icon: Wrench },
    ],
  },
  {
    title: 'Finance & Stratégie',
    items: [
      { label: 'IFRS 16', path: '/ifrs16', icon: BarChart3 },
      { label: 'Simulation What-if', path: '/simulation', icon: TrendingUp },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'PROPH3T IA', path: '/prophet', icon: Brain },
    ],
  },
];

function SidebarLink({ item }: { item: NavItem }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const isActive = location.pathname === item.path;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <NavLink
        to={item.path}
        onClick={hasChildren ? (e) => { e.preventDefault(); setExpanded(!expanded); } : undefined}
        className={clsx(
          'flex items-center gap-2.5 px-3 py-1.5 mx-2 rounded-md text-xs transition-all duration-100',
          isActive
            ? 'bg-neutral-900 text-white font-medium'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
        )}
      >
        <item.icon size={15} className={isActive ? 'text-white' : 'text-neutral-400'} />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="px-1.5 py-0.5 rounded text-2xs font-mono font-bold bg-neutral-200 text-neutral-600">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />
        )}
      </NavLink>
      {hasChildren && expanded && (
        <div className="ml-7 mt-0.5 space-y-0.5">
          {item.children!.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive: active }) => clsx(
                'block px-2 py-1 rounded text-2xs',
                active ? 'text-neutral-900 font-semibold' : 'text-neutral-500 hover:text-neutral-700',
              )}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-[240px] h-screen bg-white border-r border-neutral-200 flex flex-col z-50">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-neutral-200">
        <div className="font-display text-2xl text-neutral-900">Atlas Lease</div>
        <div className="text-2xs text-neutral-400 uppercase tracking-widest mt-0.5">
          Gestion Locative Commerciale
        </div>
      </div>

      {/* Building selector */}
      <div className="px-3 py-2 border-b border-neutral-100">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md bg-neutral-50 hover:bg-neutral-100 transition-colors text-left">
          <Building2 size={14} className="text-neutral-400" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-neutral-900 truncate">Cosmos Yopougon</div>
            <div className="text-2xs text-neutral-400">15 000 m² GLA</div>
          </div>
          <ChevronDown size={12} className="text-neutral-400" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-4">
        {navigation.map((section) => (
          <div key={section.title}>
            <div className="px-4 mb-1">
              <span className="text-2xs font-bold uppercase tracking-widest text-neutral-400">
                {section.title}
              </span>
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarLink key={item.path} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center">
            <span className="text-2xs font-bold text-white">AK</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-neutral-900 truncate">Amadou Koné</div>
            <div className="text-2xs text-neutral-400">Property Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
