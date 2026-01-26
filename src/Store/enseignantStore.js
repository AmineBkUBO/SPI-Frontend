import { create } from 'zustand';
import api from "../Config/api";

const useEnseignantStore = create((set) => ({
    enseignants: [],
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
}));

export default useEnseignantStore;
