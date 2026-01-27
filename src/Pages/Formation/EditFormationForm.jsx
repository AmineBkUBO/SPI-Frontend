import {
    Box,
    Button,
    TextField,
    Switch,
    FormControlLabel,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import useFormationStore from "../../Store/formationStore";
import { useParams } from "react-router-dom";

/* ===================== VALIDATION ===================== */
const checkoutSchema = yup.object().shape({
    codeFormation: yup
        .string()
        .max(8, "Max 8 characters")
        .required("Required"),
    diplome: yup
        .string()
        .max(3, "Max 3 characters")
        .required("Required"),
    nomFormation: yup
        .string()
        .max(64, "Max 64 characters")
        .required("Required"),
    n0Annee: yup.boolean().required(),
    doubleDiplome: yup.boolean().required(),
    debutHabilitation: yup.date().nullable(),
    finHabilitation: yup.date().nullable(),
});

/* ===================== COMPONENT ===================== */
const EditFormationForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { slug } = useParams(); // id of the formation

    const fetchFormationById = useFormationStore(
        (state) => state.fetchFormationById
    );
    const createFormation = useFormationStore((state) => state.createFormation);
    const selectedFormation = useFormationStore(
        (state) => state.selectedFormation
    );

    const [initialValues, setInitialValues] = useState(null);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /* ---------------- FETCH FORMATION DATA ---------------- */
    useEffect(() => {
        const loadFormation = async () => {
            await fetchFormationById(slug);
        };
        loadFormation();
    }, [slug, fetchFormationById]);

    /* ---------------- SET INITIAL VALUES AFTER FETCH ---------------- */
    useEffect(() => {
        if (selectedFormation) {
            setInitialValues({
                codeFormation: selectedFormation.codeFormation || "",
                diplome: selectedFormation.diplome || "",
                nomFormation: selectedFormation.nomFormation || "",
                n0Annee: selectedFormation.n0Annee ?? true,
                doubleDiplome: selectedFormation.doubleDiplome ?? false,
                debutHabilitation: selectedFormation.debutHabilitation || "",
                finHabilitation: selectedFormation.finHabilitation || "",
            });
        }
    }, [selectedFormation]);

    /* ---------------- SUBMIT ---------------- */
    const handleFormSubmit = async (values) => {
        const payload = {
            ...values,
            debutHabilitation: values.debutHabilitation || null,
            finHabilitation: values.finHabilitation || null,
        };

        try {
            await createFormation(payload); // replace with updateFormation if exists
            setSuccessOpen(true);
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message ||
                "Une erreur est survenue lors de la modification."
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
                title="Modifier FORMATION"
                subtitle="Modifier une formation existante"
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
                      setFieldValue,
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
                                label="Code Formation"
                                name="codeFormation"
                                value={values.codeFormation}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    touched.codeFormation &&
                                    !!errors.codeFormation
                                }
                                helperText={
                                    touched.codeFormation &&
                                    errors.codeFormation
                                }
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Diplôme"
                                name="diplome"
                                value={values.diplome}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.diplome && !!errors.diplome}
                                helperText={
                                    touched.diplome && errors.diplome
                                }
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Nom Formation"
                                name="nomFormation"
                                value={values.nomFormation}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    touched.nomFormation &&
                                    !!errors.nomFormation
                                }
                                helperText={
                                    touched.nomFormation &&
                                    errors.nomFormation
                                }
                                sx={{ gridColumn: "span 4" }}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.n0Annee}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "n0Annee",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Année 0"
                                sx={{ gridColumn: "span 2" }}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.doubleDiplome}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "doubleDiplome",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Double Diplôme"
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Début Habilitation"
                                InputLabelProps={{ shrink: true }}
                                name="debutHabilitation"
                                value={values.debutHabilitation}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Fin Habilitation"
                                InputLabelProps={{ shrink: true }}
                                name="finHabilitation"
                                value={values.finHabilitation}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>

                        <Box display="flex" justifyContent="end" mt="25px">
                            <Button
                                type="submit"
                                color="success"
                                variant="contained"
                                size="large"
                            >
                                Modifier Formation
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
                    ✅ Formation modifiée avec succès !
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

export default EditFormationForm;
