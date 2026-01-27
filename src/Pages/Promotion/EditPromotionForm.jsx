import {
    Box,
    Button,
    TextField,
    MenuItem,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import api from "../../Config/api";
import usePromotionStore from "../../Store/promotionStore";
import { useParams } from "react-router-dom";

/* ================= VALIDATION ================= */
const checkoutSchema = yup.object().shape({
    anneePro: yup.string().max(10).required("Required"),
    codeFormation: yup.string().required("Formation is required"),
    noEnseignant: yup
        .number()
        .typeError("Enseignant is required")
        .required("Enseignant is required"),
    siglePro: yup.string().max(5).required("Required"),
    nbEtuSouhaite: yup
        .number()
        .typeError("Must be a number")
        .required("Required"),
    etatPreselection: yup
        .string()
        .oneOf(["ENC", "TER"])
        .required("Required"),
});

/* ================= COMPONENT ================= */
const EditPromotionForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { slug } = useParams();

    const fetchPromotionById = usePromotionStore(
        (state) => state.fetchPromotionById
    );
    const createPromotion = usePromotionStore(
        (state) => state.createPromotion
    );
    const selectedPromotion = usePromotionStore(
        (state) => state.selectedPromotion
    );

    const [initialValues, setInitialValues] = useState(null);
    const [formations, setFormations] = useState([]);
    const [enseignants, setEnseignants] = useState([]);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /* ---------------- FETCH FORMATION & ENSEIGNANT ---------------- */
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const fRes = await api.get("/formations");
                setFormations(fRes.data);

                const eRes = await api.get("/enseignants");
                setEnseignants(eRes.data);
            } catch (err) {
                console.error("[EditPromotion] Dropdown fetch error", err);
            }
        };
        fetchDropdownData();
    }, []);

    /* ---------------- FETCH SELECTED PROMOTION ---------------- */
    useEffect(() => {
        const loadPromotion = async () => {
            await fetchPromotionById(slug);
        };
        loadPromotion();
    }, [slug, fetchPromotionById]);

    /* ---------------- SET INITIAL VALUES ---------------- */
    useEffect(() => {
        if (selectedPromotion) {
            setInitialValues({
                anneePro: selectedPromotion.anneePro || "",
                codeFormation: selectedPromotion.codeFormation?.codeFormation || "",
                noEnseignant: selectedPromotion.noEnseignant?.id || "",
                siglePro: selectedPromotion.siglePro || "",
                nbEtuSouhaite: selectedPromotion.nbEtuSouhaite || "",
                etatPreselection: selectedPromotion.etatPreselection || "",
                dateRentree: selectedPromotion.dateRentree || "",
                lieuRentree: selectedPromotion.lieuRentree || "",
                commentaire: selectedPromotion.commentaire || "",
            });
        }
    }, [selectedPromotion]);

    /* ---------------- SUBMIT ---------------- */
    const handleFormSubmit = async (values) => {
        const payload = {
            ...values,
            codeFormation: { codeFormation: values.codeFormation },
            noEnseignant: { id: values.noEnseignant },
        };

        try {
            await createPromotion(payload); // replace with updatePromotion if available
            setSuccessOpen(true);
        } catch (err) {
            setErrorMessage(
                err?.response?.data?.message || "Erreur lors de la modification."
            );
            setErrorOpen(true);
        }
    };

    if (!initialValues) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box m="20px">
            <Header
                title="Modifier PROMOTION"
                subtitle="Modifier une promotion existante"
            />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile ? undefined : "span 4",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Année Promotion"
                                name="anneePro"
                                value={values.anneePro}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.anneePro && !!errors.anneePro}
                                helperText={touched.anneePro && errors.anneePro}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Formation"
                                name="codeFormation"
                                value={values.codeFormation}
                                onChange={handleChange}
                                error={
                                    touched.codeFormation &&
                                    !!errors.codeFormation
                                }
                                sx={{ gridColumn: "span 2" }}
                            >
                                {formations.map((f) => (
                                    <MenuItem key={f.codeFormation} value={f.codeFormation}>
                                        {f.codeFormation} - {f.nomFormation}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Responsable (Enseignant)"
                                name="noEnseignant"
                                value={values.noEnseignant}
                                onChange={handleChange}
                                error={touched.noEnseignant && !!errors.noEnseignant}
                                sx={{ gridColumn: "span 2" }}
                            >
                                {enseignants.map((e) => (
                                    <MenuItem key={e.id} value={e.id}>
                                        {e.nom} {e.prenom}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Sigle Promotion"
                                name="siglePro"
                                value={values.siglePro}
                                onChange={handleChange}
                                error={touched.siglePro && !!errors.siglePro}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Nb Étudiants Souhaité"
                                name="nbEtuSouhaite"
                                value={values.nbEtuSouhaite}
                                onChange={handleChange}
                                error={touched.nbEtuSouhaite && !!errors.nbEtuSouhaite}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="État Présélection"
                                name="etatPreselection"
                                value={values.etatPreselection}
                                onChange={handleChange}
                                error={touched.etatPreselection && !!errors.etatPreselection}
                                helperText={touched.etatPreselection && errors.etatPreselection}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="ENC">ENC — En cours</MenuItem>
                                <MenuItem value="TER">TER — Terminé</MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Date Rentrée"
                                InputLabelProps={{ shrink: true }}
                                name="dateRentree"
                                value={values.dateRentree}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Lieu Rentrée"
                                name="lieuRentree"
                                value={values.lieuRentree}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Commentaire"
                                name="commentaire"
                                value={values.commentaire}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button
                                type="submit"
                                color="success"
                                variant="contained"
                            >
                                Modifier Promotion
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>

            {/* ================= SUCCESS ================= */}
            <Snackbar
                open={successOpen}
                autoHideDuration={3500}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSuccessOpen(false)}
                    severity="success"
                    variant="filled"
                    sx={{ fontSize: "0.95rem" }}
                >
                    ✅ Promotion modifiée avec succès !
                </Alert>
            </Snackbar>

            {/* ================= ERROR ================= */}
            <Snackbar
                open={errorOpen}
                autoHideDuration={4500}
                onClose={() => setErrorOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setErrorOpen(false)}
                    severity="error"
                    variant="filled"
                    sx={{ fontSize: "0.95rem" }}
                >
                    ❌ {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EditPromotionForm;
