import { create } from 'zustand';
import api from "../Config/api";

const useFormationStore = create((set, get) => ({
    formations: [],
    selectedFormation: null,
    loading: false,
    error: null,

    fetchFormations: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/formations');
            console.log(response.data);
            set({ formations: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchFormationById: async (id) => {
        set({ loading: true, error: null });
        try {
            console.log(id);
            console.info(get().selectedFormation);
            const response = await api.get(`/formations/${id}`);
            console.log(response.data);
            set({ selectedFormation: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    selectFormation: (formation) => set({ selectedFormation: formation }),

    clearSelectedFormation: () => set({ selectedFormation: null }),
}));

export default useFormationStore;