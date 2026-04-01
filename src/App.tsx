import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { StackingPlanPage } from '@/pages/StackingPlanPage';
import { ProspectsPage } from '@/pages/ProspectsPage';
import { TenantsPage } from '@/pages/TenantsPage';
import { TenantDossierPage } from '@/pages/TenantDossierPage';
import { PropertiesPage } from '@/pages/PropertiesPage';
import { LeasesPage } from '@/pages/LeasesPage';
import { RentRollPage } from '@/pages/RentRollPage';
import { RenewalsPage } from '@/pages/RenewalsPage';
import { AmendmentsPage } from '@/pages/AmendmentsPage';
import { TerminationsPage } from '@/pages/TerminationsPage';
import { BillingPage } from '@/pages/BillingPage';
import { ChargesPage } from '@/pages/ChargesPage';
import { TaxesPage } from '@/pages/TaxesPage';
import { RecoveryPage } from '@/pages/RecoveryPage';
import { ShortTermPage } from '@/pages/ShortTermPage';
import { AdvertisingPage } from '@/pages/AdvertisingPage';
import { RevenueSharePage } from '@/pages/RevenueSharePage';
import { ParkingPage } from '@/pages/ParkingPage';
import { MaintenancePage } from '@/pages/MaintenancePage';
import { IFRS16Page } from '@/pages/IFRS16Page';
import { SimulationPage } from '@/pages/SimulationPage';
import { ProphetPage } from '@/pages/ProphetPage';

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
            {/* Vue d'ensemble */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/stacking-plan" element={<StackingPlanPage />} />

            {/* CRM & Prospection */}
            <Route path="/prospects" element={<ProspectsPage />} />
            <Route path="/tenants" element={<TenantsPage />} />
            <Route path="/tenants/:id" element={<TenantDossierPage />} />

            {/* Cycle locatif */}
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/leases" element={<LeasesPage />} />
            <Route path="/rent-roll" element={<RentRollPage />} />
            <Route path="/renewals" element={<RenewalsPage />} />
            <Route path="/amendments" element={<AmendmentsPage />} />
            <Route path="/terminations" element={<TerminationsPage />} />

            {/* Facturation & Recouvrement */}
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/charges" element={<ChargesPage />} />
            <Route path="/taxes" element={<TaxesPage />} />
            <Route path="/recovery" element={<RecoveryPage />} />

            {/* Revenus commerciaux */}
            <Route path="/short-term" element={<ShortTermPage />} />
            <Route path="/advertising" element={<AdvertisingPage />} />
            <Route path="/revenue-share" element={<RevenueSharePage />} />
            <Route path="/parking" element={<ParkingPage />} />

            {/* Technique */}
            <Route path="/maintenance" element={<MaintenancePage />} />

            {/* Finance & Stratégie */}
            <Route path="/ifrs16" element={<IFRS16Page />} />
            <Route path="/simulation" element={<SimulationPage />} />

            {/* Intelligence */}
            <Route path="/prophet" element={<ProphetPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
