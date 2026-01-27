import {
    Box,
    Button,
    TextField,
    MenuItem,
    Typography,
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
    sexe: "H", // default to Homme
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    situation: "CEL", // default to Célibataire
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
    telPort: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid"),
});

/* ---------------- COMPONENT ---------------- */
const CreateEtudiantForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [promotions, setPromotions] = useState([]);
    const createEtudiant = useEtudiantStore((state) => state.createEtudiant);

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
        // Transform promotion to object as backend expects
        const payload = {
            ...values,
            anneePro: { anneePro: values.anneePro },
        };
        console.log("[CreateEtudiant] payload =", payload);
        await createEtudiant(payload);
    };

    return (
        <Box m="20px">
            <Header
                title="Modifier ETUDIANT"
                subtitle="Modifier un étudiant existant"
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
                                    gridColumn: isNonMobile
                                        ? undefined
                                        : "span 4",
                                },
                            }}
                        >
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

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Téléphone Portable"
                                name="telPort"
                                value={values.telPort}
                                onChange={handleChange}
                                error={touched.telPort && !!errors.telPort}
                                helperText={touched.telPort && errors.telPort}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Adresse Permanente"
                                name="permAdresse"
                                value={values.permAdresse}
                                onChange={handleChange}
                                error={touched.permAdresse && !!errors.permAdresse}
                                helperText={touched.permAdresse && errors.permAdresse}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Code Postal Permanent"
                                name="permCp"
                                value={values.permCp}
                                onChange={handleChange}
                                error={touched.permCp && !!errors.permCp}
                                helperText={touched.permCp && errors.permCp}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Ville Permanente"
                                name="permVille"
                                value={values.permVille}
                                onChange={handleChange}
                                error={touched.permVille && !!errors.permVille}
                                helperText={touched.permVille && errors.permVille}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Pays Permanent"
                                name="permPays"
                                value={values.permPays}
                                onChange={handleChange}
                                error={touched.permPays && !!errors.permPays}
                                helperText={touched.permPays && errors.permPays}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Dernier Diplôme"
                                name="dernierDiplome"
                                value={values.dernierDiplome}
                                onChange={handleChange}
                                error={touched.dernierDiplome && !!errors.dernierDiplome}
                                helperText={touched.dernierDiplome && errors.dernierDiplome}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Université"
                                name="universite"
                                value={values.universite}
                                onChange={handleChange}
                                error={touched.universite && !!errors.universite}
                                helperText={touched.universite && errors.universite}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Sigle Étudiant"
                                name="sigleEtu"
                                value={values.sigleEtu}
                                onChange={handleChange}
                                error={touched.sigleEtu && !!errors.sigleEtu}
                                helperText={touched.sigleEtu && errors.sigleEtu}
                                sx={{ gridColumn: "span 1" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Compte CRI"
                                name="compteCri"
                                value={values.compteCri}
                                onChange={handleChange}
                                error={touched.compteCri && !!errors.compteCri}
                                helperText={touched.compteCri && errors.compteCri}
                                sx={{ gridColumn: "span 1" }}
                            />
                        </Box>

                        {/* ---------------- OPTIONAL FIELDS ---------------- */}
                        <Box
                            gridColumn="span 4"
                            mt={4}
                            mb={1}
                            borderBottom="1px solid #ccc"
                        >
                            <Typography variant="h6">Optional Fields</Typography>
                        </Box>

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
                                label="Adresse Actuelle"
                                name="actuAdresse"
                                value={values.actuAdresse}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Code Postal Actuel"
                                name="actuCp"
                                value={values.actuCp}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Ville Actuelle"
                                name="actuVille"
                                value={values.actuVille}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Pays Actuel"
                                name="actuPays"
                                value={values.actuPays}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="UBO Email"
                                name="uboEmail"
                                value={values.uboEmail}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Groupe Anglais"
                                name="grpeAnglais"
                                value={values.grpeAnglais}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Abandon Motif"
                                name="abandonMotif"
                                value={values.abandonMotif}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Date Abandon"
                                name="abandonDate"
                                InputLabelProps={{ shrink: true }}
                                value={values.abandonDate}
                                onChange={handleChange}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="success" variant="contained">
                                Create Étudiant
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default CreateEtudiantForm;
