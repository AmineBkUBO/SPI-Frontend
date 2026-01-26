import { create } from 'zustand';
import api from "../Config/api";

const usePromotionStore = create((set) => ({
    promotions: [],
    loading: false,
    error: null,

    fetchPromotions: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/promotions');
            console.log(response);
            set({ promotions: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
}));

export default usePromotionStore;
