import { create } from 'zustand';

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  createAccount: (data: { fullName: string; email: string; password: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,

  createAccount: async (data) => {
    // Implement actual authentication logic here
    set({ 
      user: { 
        id: '1', 
        fullName: data.fullName, 
        email: data.email 
      }, 
      isAuthenticated: true,
      error: null 
    });
  },

  login: async (email, password) => {
    // Implement actual authentication logic here
    set({ 
      user: { 
        id: '1', 
        fullName: 'Test User', 
        email 
      }, 
      isAuthenticated: true,
      error: null 
    });
  },

  logout: async () => {
    set({ 
      user: null, 
      isAuthenticated: false,
      error: null 
    });
  },

  clearError: () => set({ error: null })
}));