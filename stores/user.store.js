import { create } from "zustand";


export const useUserStore = create((set, get) => ({
  userData: { jwtToken: '' },
  clientData: null,
  
  setUserData: (userData) => {
    set(() => ({ userData }));
  },
  setClientData: (clientData) => {
    set(() => ({ clientData }));
  },
  
  clearUserData: () => set(() => ({ userData: null })),
  clearClientData: () => set(() => ({ clientData: null })),
  
}));