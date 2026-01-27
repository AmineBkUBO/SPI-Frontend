import { create } from "zustand";
import api from "../Config/api";

const usePromotionStore = create((set, get) => ({
    promotions: [],
    selectedPromotion: null,
    loading: false,
    error: null,

    fetchPromotions: async () => {
        console.log("[PromotionStore] fetchPromotions");
        set({ loading: true, error: null });
        try {
            const response = await api.get("/promotions");
            console.log("[PromotionStore] promotions =", response.data);
            set({ promotions: response.data, loading: false });
        } catch (err) {
            console.error("[PromotionStore] fetchPromotions error", err);
            set({ error: err.message, loading: false });
        }
    },

    fetchPromotionById: async (id) => {
        console.log("[PromotionStore] fetchPromotionById:", id);
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/promotions/${id}`);
            console.log("[PromotionStore] selectedPromotion =", response.data);
            set({ selectedPromotion: response.data, loading: false });
        } catch (err) {
            console.error("[PromotionStore] fetchPromotionById error", err);
            set({ error: err.message, loading: false });
        }
    },

    createPromotion: async (promotion) => {
        console.log("[PromotionStore] createPromotion payload =", promotion);
        set({ loading: true, error: null });
        try {
            const response = await api.post("/promotions", promotion);
            console.log("[PromotionStore] created promotion =", response.data);

            set({
                promotions: [...get().promotions, response.data],
                loading: false,
            });
        } catch (err) {
            console.error("[PromotionStore] createPromotion error", err);
            set({ error: err.message, loading: false });
            throw err;
        }
    },

    selectPromotion: (promotion) => {
        console.log("[PromotionStore] selectPromotion", promotion);
        set({ selectedPromotion: promotion });
    },

    clearSelectedPromotion: () => {
        console.log("[PromotionStore] clearSelectedPromotion");
        set({ selectedPromotion: null });
    },
}));

export default usePromotionStore;
