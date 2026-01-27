import {
    Box,
    Button,
    TextField,
    MenuItem,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import api from "../../Config/api";
import useEtudiantStore from "../../Store/etudiantStore";

/* ---------------- INITIAL VALUES ---------------- */
const initialValues = {
    noEtudiantNat: "",
    anneePro: "",
    codeCom: "",
    noEtudiantUbo: "",
    sexe: "H",
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    situation: "CEL",
    nationalite: "Française",
    telPort: "",
    telFixe: "",
    email: "",
    actuAdresse: "",
    actuCp: "",
    actuVille: "",
    actuPays: "",
    permAdresse: "",
    permCp: "",
    permVille: "",
    permPays: "",
    dernierDiplome: "",
    universite: "",
    sigleEtu: "",
    compteCri: "",
    uboEmail: "",
    grpeAnglais: "",
    abandonMotif: "",
    abandonDate: "",
    estDiplome: "N",
};

/* ---------------- VALIDATION ---------------- */
const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    noEtudiantNat: yup.string().required("Required"),
    anneePro: yup.string().required("Promotion is required"),
    sexe: yup.string().oneOf(["H", "F", "G", "L"]).required("Required"),
    nom: yup.string().required("Required"),
    prenom: yup.string().required("Required"),
    dateNaissance: yup.date().required("Required"),
    lieuNaissance: yup.string().required("Required"),
    situation: yup.string().oneOf(["CEL", "ENC"]).required("Required"),
    permAdresse: yup.string().required("Required"),
    permCp: yup.string().required("Required"),
    permVille: yup.string().required("Required"),
    permPays: yup.string().required("Required"),
    dernierDiplome: yup.string().required("Required"),
    universite: yup.string().required("Required"),
    sigleEtu: yup.string().required("Required"),
    compteCri: yup.string().required("Required"),
    email: yup.string().email("Invalid email"),
    telPort: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

/* ---------------- COMPONENT ---------------- */
const CreateEtudiantForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [promotions, setPromotions] = useState([]);
    const createEtudiant = useEtudiantStore((state) => state.createEtudiant);

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /* ---------------- FETCH PROMOTIONS ---------------- */
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const res = await api.get("/promotions");
                setPromotions(res.data);
            } catch (err) {
                console.error("Fetch promotions error:", err);
            }
        };
        fetchPromotions();
    }, []);

    /* ---------------- SUBMIT ---------------- */
    const handleFormSubmit = async (values) => {
        const payload = {
            ...values,
            anneePro: { anneePro: values.anneePro },
        };
        try {
            console.log("[CreateEtudiant] payload =", payload);
            await createEtudiant(payload);
            setSuccessOpen(true);
        } catch (err) {
            setErrorMessage(
                err?.response?.data?.message || "Une erreur est survenue."
            );
            setErrorOpen(true);
        }
    };

    return (
        <Box m="20px">
            <Header
                title="CREATE ETUDIANT"
                subtitle="Créer un nouveau étudiant"
            />

            <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                onSubmit={handleFormSubmit}
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
                        {/* ---------------- REQUIRED FIELDS ---------------- */}
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
                            {/* Numéro Étudiant National */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Numéro Étudiant National"
                                name="noEtudiantNat"
                                value={values.noEtudiantNat}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.noEtudiantNat && !!errors.noEtudiantNat}
                                helperText={touched.noEtudiantNat && errors.noEtudiantNat}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Promotion */}
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Promotion"
                                name="anneePro"
                                value={values.anneePro}
                                onChange={handleChange}
                                error={touched.anneePro && !!errors.anneePro}
                                helperText={touched.anneePro && errors.anneePro}
                                sx={{ gridColumn: "span 2" }}
                            >
                                {promotions.map((p) => (
                                    <MenuItem key={p.anneePro} value={p.anneePro}>
                                        {p.anneePro} - {p.codeFormation?.nomFormation}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {/* Sexe */}
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Sexe"
                                name="sexe"
                                value={values.sexe}
                                onChange={handleChange}
                                error={touched.sexe && !!errors.sexe}
                                helperText={touched.sexe && errors.sexe}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="H">Homme</MenuItem>
                                <MenuItem value="F">Femme</MenuItem>
                                <MenuItem value="G">Gay</MenuItem>
                                <MenuItem value="L">Lesbian</MenuItem>
                            </TextField>

                            {/* Situation */}
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Situation"
                                name="situation"
                                value={values.situation}
                                onChange={handleChange}
                                error={touched.situation && !!errors.situation}
                                helperText={touched.situation && errors.situation}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="CEL">Célibataire</MenuItem>
                                <MenuItem value="ENC">En couple</MenuItem>
                            </TextField>

                            {/* Nom */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Nom"
                                name="nom"
                                value={values.nom}
                                onChange={handleChange}
                                error={touched.nom && !!errors.nom}
                                helperText={touched.nom && errors.nom}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Prénom */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Prénom"
                                name="prenom"
                                value={values.prenom}
                                onChange={handleChange}
                                error={touched.prenom && !!errors.prenom}
                                helperText={touched.prenom && errors.prenom}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Date Naissance */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Date de Naissance"
                                name="dateNaissance"
                                InputLabelProps={{ shrink: true }}
                                value={values.dateNaissance}
                                onChange={handleChange}
                                error={touched.dateNaissance && !!errors.dateNaissance}
                                helperText={touched.dateNaissance && errors.dateNaissance}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Lieu Naissance */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Lieu de Naissance"
                                name="lieuNaissance"
                                value={values.lieuNaissance}
                                onChange={handleChange}
                                error={touched.lieuNaissance && !!errors.lieuNaissance}
                                helperText={touched.lieuNaissance && errors.lieuNaissance}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>

                        {/* ---------------- SUBMIT BUTTON ---------------- */}
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="success" variant="contained">
                                Create Étudiant
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>

            {/* ================= SUCCESS MESSAGE ================= */}
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
                    ✅ Étudiant créé avec succès !
                </Alert>
            </Snackbar>

            {/* ================= ERROR MESSAGE ================= */}
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

export default CreateEtudiantForm;
