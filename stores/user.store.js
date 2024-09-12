import { create } from "zustand";


export const useUserStore = create((set, get) => ({
  userData: { jwtToken: '' },
  setUserData: (userData) => {
    set(() => ({ userData }));
  },
  clearUserData: () => set(() => ({ userData: null })),
}));