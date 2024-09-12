import { create } from "zustand";

export const useOwnerBasket = create((set) => ({
    ownerBasket: null,
    setOwnerBasket : (ownerBasket) => set(() => ({ ownerBasket })),
    clearOwnerBasket: () => set(() => ({ ownerBasket: null })),
}));
