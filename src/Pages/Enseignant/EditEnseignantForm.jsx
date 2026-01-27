import {
    Box,
    Button,
    TextField,
    MenuItem,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import useEnseignantStore from "../../Store/enseignantStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

/* ---------------- VALIDATION ---------------- */
const checkoutSchema = yup.object().shape({
    id: yup.number().required("Required"),
    type: yup.string().oneOf(["INT", "ENC"]).required("Required"),
    sexe: yup.string().oneOf(["H", "F", "G", "L"]).required("Required"),
    nom: yup.string().required("Required"),
    prenom: yup.string().required("Required"),
    adresse: yup.string().required("Required"),
    cp: yup.string().required("Required"),
    ville: yup.string().required("Required"),
    pays: yup.string().required("Required"),
    telPort: yup.string(),
    encPersoEmail: yup.string().email("Invalid email"),
    encUboEmail: yup.string().email("Invalid email"),
    intProfEmail: yup.string().email("Invalid email"),
});

/* ---------------- COMPONENT ---------------- */
const EditEnseignantForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { slug } = useParams(); // ID of the enseignant

    const fetchEnseignantById = useEnseignantStore(
        (state) => state.fetchEnseignantById
    );
    const createEnseignant = useEnseignantStore(
        (state) => state.createEnseignant
    );
    const selectedEnseignant = useEnseignantStore(
        (state) => state.selectedEnseignant
    );

    const [initialValues, setInitialValues] = useState(null);

    /* ---------------- FETCH DATA ---------------- */
    useEffect(() => {
        const loadEnseignant = async () => {
            await fetchEnseignantById(slug);
        };
        loadEnseignant();
    }, [slug, fetchEnseignantById]);

    /* ---------------- UPDATE INITIAL VALUES WHEN FETCHED ---------------- */
    useEffect(() => {
        if (selectedEnseignant) {
            setInitialValues({
                id: selectedEnseignant.id || "",
                type: selectedEnseignant.type || "",
                sexe: selectedEnseignant.sexe || "",
                nom: selectedEnseignant.nom || "",
                prenom: selectedEnseignant.prenom || "",
                adresse: selectedEnseignant.adresse || "",
                cp: selectedEnseignant.cp || "",
                ville: selectedEnseignant.ville || "",
                pays: selectedEnseignant.pays || "",
                telPort: selectedEnseignant.telPort || "",
                encPersoTel: selectedEnseignant.encPersoTel || "",
                encUboTel: selectedEnseignant.encUboTel || "",
                encPersoEmail: selectedEnseignant.encPersoEmail || "",
                encUboEmail: selectedEnseignant.encUboEmail || "",
                intNoInsee: selectedEnseignant.intNoInsee || "",
                intSocNom: selectedEnseignant.intSocNom || "",
                intSocAdresse: selectedEnseignant.intSocAdresse || "",
                intSocCp: selectedEnseignant.intSocCp || "",
                intSocVille: selectedEnseignant.intSocVille || "",
                intSocPays: selectedEnseignant.intSocPays || "",
                intFonction: selectedEnseignant.intFonction || "",
                intProfEmail: selectedEnseignant.intProfEmail || "",
                intProfTel: selectedEnseignant.intProfTel || "",
            });
        }
    }, [selectedEnseignant]);

    /* ---------------- SUBMIT ---------------- */
    const handleFormSubmit = async (values) => {
        console.log("[EditEnseignant] payload =", values);
        await createEnseignant(values);
    };

    if (!initialValues) {
        // Show loading while fetching
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
                title="Modifier ENSEIGNANT"
                subtitle="Modifier un enseignant existant"
            />

            <Formik
                initialValues={initialValues}
                enableReinitialize
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
                        {/* ---------------- FORM FIELDS ---------------- */}
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
                            {/* ID */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="ID Enseignant"
                                name="id"
                                value={values.id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.id && !!errors.id}
                                helperText={touched.id && errors.id}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Type */}
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Type"
                                name="type"
                                value={values.type}
                                onChange={handleChange}
                                error={touched.type && !!errors.type}
                                helperText={touched.type && errors.type}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="ENC">
                                    Enseignant titulaire
                                </MenuItem>
                                <MenuItem value="INT">
                                    Intervenant extérieur
                                </MenuItem>
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

                            {/* Adresse */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Adresse"
                                name="adresse"
                                value={values.adresse}
                                onChange={handleChange}
                                error={touched.adresse && !!errors.adresse}
                                helperText={touched.adresse && errors.adresse}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* CP */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Code Postal"
                                name="cp"
                                value={values.cp}
                                onChange={handleChange}
                                error={touched.cp && !!errors.cp}
                                helperText={touched.cp && errors.cp}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Ville */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Ville"
                                name="ville"
                                value={values.ville}
                                onChange={handleChange}
                                error={touched.ville && !!errors.ville}
                                helperText={touched.ville && errors.ville}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Pays */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Pays"
                                name="pays"
                                value={values.pays}
                                onChange={handleChange}
                                error={touched.pays && !!errors.pays}
                                helperText={touched.pays && errors.pays}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Tel */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Téléphone"
                                name="telPort"
                                value={values.telPort}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Email Personnel */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Email personnel"
                                name="encPersoEmail"
                                value={values.encPersoEmail}
                                onChange={handleChange}
                                error={
                                    touched.encPersoEmail &&
                                    !!errors.encPersoEmail
                                }
                                helperText={
                                    touched.encPersoEmail &&
                                    errors.encPersoEmail
                                }
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* ---------------- OPTIONAL FIELDS ---------------- */}
                            <Box
                                gridColumn="span 4"
                                mt={4}
                                mb={1}
                                borderBottom="1px solid #ccc"
                            >
                                <Typography variant="h6">
                                    Optional Fields
                                </Typography>
                            </Box>

                            {/* UBO fields for ENC only */}
                            {values.type === "ENC" && (
                                <>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Téléphone UBO"
                                        name="encUboTel"
                                        value={values.encUboTel}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Email UBO"
                                        name="encUboEmail"
                                        value={values.encUboEmail}
                                        onChange={handleChange}
                                        error={
                                            touched.encUboEmail &&
                                            !!errors.encUboEmail
                                        }
                                        helperText={
                                            touched.encUboEmail &&
                                            errors.encUboEmail
                                        }
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                </>
                            )}

                            {/* Company fields for INT only */}
                            {values.type === "INT" && (
                                <>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="No INSEE"
                                        name="intNoInsee"
                                        value={values.intNoInsee}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Nom Société"
                                        name="intSocNom"
                                        value={values.intSocNom}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Adresse Société"
                                        name="intSocAdresse"
                                        value={values.intSocAdresse}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Code Postal Société"
                                        name="intSocCp"
                                        value={values.intSocCp}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 1" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Ville Société"
                                        name="intSocVille"
                                        value={values.intSocVille}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 1" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Pays Société"
                                        name="intSocPays"
                                        value={values.intSocPays}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Fonction"
                                        name="intFonction"
                                        value={values.intFonction}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Email Professionnel"
                                        name="intProfEmail"
                                        value={values.intProfEmail}
                                        onChange={handleChange}
                                        error={
                                            touched.intProfEmail &&
                                            !!errors.intProfEmail
                                        }
                                        helperText={
                                            touched.intProfEmail &&
                                            errors.intProfEmail
                                        }
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Téléphone Professionnel"
                                        name="intProfTel"
                                        value={values.intProfTel}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                </>
                            )}
                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button
                                type="submit"
                                color="success"
                                variant="contained"
                            >
                                Modifier Enseignant
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default EditEnseignantForm;
