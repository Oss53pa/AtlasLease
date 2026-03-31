import { Topbar } from '@/components/layout/Topbar';
import { Construction } from 'lucide-react';

export function PlaceholderPage({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <Topbar title={title} subtitle={subtitle} />
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="p-4 bg-neutral-100 rounded-full mb-4">
          <Construction size={32} className="text-neutral-400" />
        </div>
        <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
        <p className="mt-2 text-sm text-neutral-500 max-w-sm">
          Ce module est en cours de développement. Il sera disponible dans la prochaine phase de build.
        </p>
      </div>
    </div>
  );
}
