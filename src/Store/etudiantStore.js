import { create } from "zustand";
import api from "../Config/api";
import {get} from "axios";

const useEtudiantStore = create((set, get) => ({
    etudiants: [],
    selectedEtudiant: null,
    loading: false,
    error: null,

    fetchEtudiants: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/etudiants");
            set({ etudiants: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchEtudiantById: async (noEtudNat) => {
        set({ loading: true, error: null });
        try {
            console.log(noEtudNat)
            console.info( get().selectedEtudiant )
            const response = await api.get(`/etudiants/${noEtudNat}`);
            console.log(response);
            set({ selectedEtudiant: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    selectStudent: (etudiant) => set({ selectedEtudiant: etudiant }),

    clearSelectedEtudiant: () => set({ selectedEtudiant: null }),
}));

export default useEtudiantStore;