import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { PropertiesPage } from '@/pages/PropertiesPage';
import { LeasesPage } from '@/pages/LeasesPage';
import { RentRollPage } from '@/pages/RentRollPage';
import { BillingPage } from '@/pages/BillingPage';
import { AmendmentsPage } from '@/pages/AmendmentsPage';
import { RecoveryPage } from '@/pages/RecoveryPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/leases" element={<LeasesPage />} />
            <Route path="/rent-roll" element={<RentRollPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/amendments" element={<AmendmentsPage />} />
            <Route path="/recovery" element={<RecoveryPage />} />
            <Route path="/short-term" element={<PlaceholderPage title="Locations Éphémères" subtitle="Pop-up, événementiel, kiosques" />} />
            <Route path="/advertising" element={<PlaceholderPage title="Régie Publicitaire" subtitle="Inventaire, contrats pub, planning" />} />
            <Route path="/revenue-share" element={<PlaceholderPage title="Revenue Share" subtitle="Déclarations CA, régularisation" />} />
            <Route path="/parking" element={<PlaceholderPage title="Parking & Événementiel" subtitle="Abonnements, réservations" />} />
            <Route path="/prospects" element={<PlaceholderPage title="Prospects" subtitle="Pipeline prospection" />} />
            <Route path="/prophet" element={<PlaceholderPage title="PROPH3T IA" subtitle="Scoring, alertes, prévisions" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
