import { create } from 'zustand';
import api from "../Config/api";

const useFormationStore = create((set) => ({
    formations: [],
    loading: false,
    error: null,

    fetchFormations: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/formations');
            console.log(response);
            set({ formations: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
}));

export default useFormationStore;
