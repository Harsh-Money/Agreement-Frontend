import { create } from "zustand";

export const useClientBasket = create((set) => ({
    clientBasket: null,
    setOwnerBasket : (clientBasket) => set(() => ({ clientBasket })),
    clearOwnerBasket: () => set(() => ({ clientBasket: null })),
}));