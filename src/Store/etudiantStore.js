import { create } from "zustand";
import api from "../Config/api";

const useEtudiantStore = create((set, get) => ({
    etudiants: [],
    selectedEtudiant: null,
    loading: false,
    error: null,

    /* ---------------- FETCH ALL STUDENTS ---------------- */
    fetchEtudiants: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/etudiants");
            set({ etudiants: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    /* ---------------- FETCH STUDENT BY ID ---------------- */
    fetchEtudiantById: async (noEtudNat) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/etudiants/${noEtudNat}`);
            set({ selectedEtudiant: response.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    /* ---------------- SELECT / CLEAR STUDENT ---------------- */
    selectStudent: (etudiant) => set({ selectedEtudiant: etudiant }),
    clearSelectedEtudiant: () => set({ selectedEtudiant: null }),

    /* ---------------- CREATE STUDENT ---------------- */
    createEtudiant: async (studentData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post("/etudiants", studentData);
            // Optionally, update the local list after creation
            const updatedList = [...get().etudiants, response.data];
            set({ etudiants: updatedList, loading: false });
            console.log("[EtudiantStore] Student created:", response.data);
            return response.data;
        } catch (err) {
            console.error("[EtudiantStore] Error creating student:", err);
            set({ error: err.message, loading: false });
            throw err;
        }
    },
}));

export default useEtudiantStore;
