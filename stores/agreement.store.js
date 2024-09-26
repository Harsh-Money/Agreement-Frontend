import { create } from "zustand";

export const useAgreementStore = create((set) => ({
    AgreementDetails: null,
    setAgreementDetails : (AgreementDetails) => set(() => ({ AgreementDetails })),
    clearAgreementDetails: () => set(() => ({ AgreementDetails: null })),
}));