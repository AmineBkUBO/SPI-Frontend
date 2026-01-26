import { create } from 'zustand';
import api from "../Config/api";

const useEtudiantStore = create((set) => ({
    etudiants: [],
    loading: false,
    error: null,

    fetchEtudiants: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/etudiants');
            console.log(response);
            set({ etudiants: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
}));

export default useEtudiantStore;
