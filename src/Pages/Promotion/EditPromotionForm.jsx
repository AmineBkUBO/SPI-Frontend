import {
    Box,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import api from "../../Config/api";
import usePromotionStore from "../../Store/promotionStore";

/* ================= INITIAL VALUES ================= */

const initialValues = {
    anneePro: "",
    codeFormation: "",
    noEnseignant: "", // stores Enseignant.id (Integer)
    siglePro: "",
    nbEtuSouhaite: "",
    etatPreselection: "",
    dateRentree: "",
    lieuRentree: "",
    commentaire: "",
};

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

const CreatePromotionForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const createPromotion = usePromotionStore((state) => state.createPromotion);

    const [formations, setFormations] = useState([]);
    const [enseignants, setEnseignants] = useState([]);

    /* ---------------- FETCH DROPDOWNS ---------------- */
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                console.log("[CreatePromotion] Fetching formations...");
                const fRes = await api.get("/formations");
                console.log("[CreatePromotion] formations =", fRes.data);
                setFormations(fRes.data);

                console.log("[CreatePromotion] Fetching enseignants...");
                const eRes = await api.get("/enseignants");
                console.log("[CreatePromotion] enseignants =", eRes.data);
                setEnseignants(eRes.data);
            } catch (err) {
                console.error("[CreatePromotion] Dropdown fetch error", err);
            }
        };

        fetchDropdownData();
    }, []);

    /* ---------------- SUBMIT ---------------- */
    const handleFormSubmit = async (values) => {
        const payload = {
            ...values,
            codeFormation: {
                codeFormation: values.codeFormation,
            },
            noEnseignant: {
                id: values.noEnseignant,
            },
        };

        console.log("[CreatePromotion] submit payload =", payload);
        await createPromotion(payload);
    };

    return (
        <Box m="20px">
            <Header
                title="Modifier PROMOTION"
                subtitle="Modifier une promotion existante"
            />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
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
                                    gridColumn: isNonMobile
                                        ? undefined
                                        : "span 4",
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
                                    <MenuItem
                                        key={f.codeFormation}
                                        value={f.codeFormation}
                                    >
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
                                error={
                                    touched.noEnseignant &&
                                    !!errors.noEnseignant
                                }
                                sx={{ gridColumn: "span 2" }}
                            >
                                {enseignants.map((e) => (
                                    <MenuItem
                                        key={e.id}
                                        value={e.id}
                                    >
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
                                error={
                                    touched.nbEtuSouhaite &&
                                    !!errors.nbEtuSouhaite
                                }
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* ✅ ETAT PRESELECTION DROPDOWN */}
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="État Présélection"
                                name="etatPreselection"
                                value={values.etatPreselection}
                                onChange={handleChange}
                                error={
                                    touched.etatPreselection &&
                                    !!errors.etatPreselection
                                }
                                helperText={
                                    touched.etatPreselection &&
                                    errors.etatPreselection
                                }
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="ENC">
                                    ENC — En cours
                                </MenuItem>
                                <MenuItem value="TER">
                                    TER — Terminé
                                </MenuItem>
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
                                Create Promotion
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default CreatePromotionForm;
