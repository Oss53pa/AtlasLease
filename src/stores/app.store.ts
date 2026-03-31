import { create } from 'zustand';
import type { Building, Profile } from '@/types';

interface AppState {
  currentUser: Profile | null;
  currentBuilding: Building | null;
  sidebarCollapsed: boolean;
  setCurrentUser: (user: Profile | null) => void;
  setCurrentBuilding: (building: Building | null) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  currentBuilding: null,
  sidebarCollapsed: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentBuilding: (building) => set({ currentBuilding: building }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
