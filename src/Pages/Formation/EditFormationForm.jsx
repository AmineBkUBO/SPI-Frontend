import {
    Box,
    Button,
    TextField,
    Switch,
    FormControlLabel,
    Snackbar,
    Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

import Header from "../../components/Header";
import useFormationStore from "../../Store/formationStore";

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

/* ===================== INITIAL VALUES ===================== */

const initialValues = {
    codeFormation: "",
    diplome: "",
    nomFormation: "",
    n0Annee: true,
    doubleDiplome: false,
    debutHabilitation: "",
    finHabilitation: "",
};

/* ===================== COMPONENT ===================== */

const CreateFormationForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const createFormation = useFormationStore(
        (state) => state.createFormation
    );

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormSubmit = async (values, { resetForm }) => {
        const payload = {
            ...values,
            debutHabilitation: values.debutHabilitation || null,
            finHabilitation: values.finHabilitation || null,
        };

        try {
            await createFormation(payload);
            setSuccessOpen(true);
            resetForm();
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message ||
                "Une erreur est survenue lors de la création."
            );
            setErrorOpen(true);
        }
    };

    return (
        <Box m="20px">
            <Header
                title="CREATE FORMATION"
                subtitle="Créer une nouvelle formation"
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
                                Create Formation
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
                    ✅ Formation créée avec succès !
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

export default CreateFormationForm;
