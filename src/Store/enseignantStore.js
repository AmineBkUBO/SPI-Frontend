import { create } from "zustand";
import api from "../Config/api";

const useEnseignantStore = create((set) => ({
    enseignants: [],
    selectedEnseignant: null,
    loading: false,
    error: null,

    fetchEnseignants: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get("/enseignants");
            set({ enseignants: res.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchEnseignantById: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await api.get(`/enseignants/${id}`);
            set({ selectedEnseignant: res.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    createEnseignant: async (enseignant) => {
        set({ loading: true, error: null });
        try {
            await api.post("/enseignants", enseignant);
            set({ loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
            throw err;
        }
    },

    clearSelectedEnseignant: () =>
        set({ selectedEnseignant: null }),
}));

export default useEnseignantStore;
