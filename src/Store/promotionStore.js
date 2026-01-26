import { create } from 'zustand';
import api from "../Config/api";

const usePromotionStore = create((set, get) => ({
    promotions: [],
    selectedPromotion: null,
    loading: false,
    error: null,

    fetchPromotions: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/promotions');
            console.log(response.data);
            set({ promotions: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchPromotionById: async (id) => {
        set({ loading: true, error: null });
        try {
            console.log(id);
            console.info(get().selectedPromotion);
            const response = await api.get(`/promotions/${id}`);
            console.log(response);
            set({ selectedPromotion: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    selectPromotion: (promotion) => set({ selectedPromotion: promotion }),

    clearSelectedPromotion: () => set({ selectedPromotion: null }),
}));

export default usePromotionStore;