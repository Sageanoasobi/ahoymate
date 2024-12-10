import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Boat } from '../types/boat';

interface BoatState {
  boat: Boat | null;
  setBoat: (boat: Boat) => void;
  clearBoat: () => void;
}

export const useBoatStore = create<BoatState>()(
  persist(
    (set) => ({
      boat: null,
      setBoat: (boat) => set({ boat }),
      clearBoat: () => set({ boat: null }),
    }),
    {
      name: 'ahoy-mate-boat',
    }
  )
);