import { create } from "zustand";
import api from "../Config/api";

const useFormationStore = create((set, get) => ({
    formations: [],
    selectedFormation: null,
    loading: false,
    error: null,

    fetchFormations: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/formations");
            set({ formations: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchFormationById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/formations/${id}`);
            set({ selectedFormation: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    createFormation: async (formation) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post("/formations", formation);
            set({
                formations: [...get().formations, response.data],
                loading: false,
            });
            console.log(response)
            console.log("Sending ..." + formation)
        } catch (err) {
            set({ error: err.message, loading: false });
            throw err;
        }
    },

    selectFormation: (formation) => set({ selectedFormation: formation }),
    clearSelectedFormation: () => set({ selectedFormation: null }),
}));

export default useFormationStore;
