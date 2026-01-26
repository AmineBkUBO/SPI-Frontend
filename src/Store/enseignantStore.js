import { create } from 'zustand';
import api from "../Config/api";

const useEnseignantStore = create((set, get) => ({
    enseignants: [],
    selectedEnseignant: null,
    loading: false,
    error: null,

    fetchEnseignants: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/enseignants');
            console.log(response.data);
            set({ enseignants: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchEnseignantById: async (id) => {
        set({ loading: true, error: null });
        try {
            console.log(id);
            console.info(get().selectedEnseignant);
            const response = await api.get(`/enseignants/${id}`);
            console.log(response);
            set({ selectedEnseignant: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    selectEnseignant: (enseignant) => set({ selectedEnseignant: enseignant }),

    clearSelectedEnseignant: () => set({ selectedEnseignant: null }),
}));

export default useEnseignantStore;