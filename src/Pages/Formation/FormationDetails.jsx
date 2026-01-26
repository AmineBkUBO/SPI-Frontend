import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    useTheme,
    CircularProgress,
    Paper,
    Chip,
    Button,
    Divider,
} from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

import SchoolIcon from "@mui/icons-material/School";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import useFormationStore from "../../Store/formationStore";

const diplomeConfig = {
    M: { label: "Master", color: "#6870fa", icon: "🎓" },
    L: { label: "Licence", color: "#4cceac", icon: "📚" },
    D: { label: "Doctorat", color: "#db4f4a", icon: "👨‍🎓" },
};

const FormationDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { slug } = useParams();
    const navigate = useNavigate();

    const {
        selectedFormation,
        loading,
        error,
        fetchFormationById,
    } = useFormationStore();

    useEffect(() => {
        if (!slug) return;
        fetchFormationById(slug);
    }, [slug, fetchFormationById]);

    if (loading) {
        return (
            <Box
                height="80vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="20px"
            >
                <CircularProgress size={60} thickness={4} />
                <Typography variant="h6" color={colors.grey[300]}>
                    Chargement des informations...
                </Typography>
            </Box>
        );
    }

    if (error || !selectedFormation) {
        return (
            <Box
                height="80vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="20px"
            >
                <Typography color="error" variant="h4" fontWeight="bold">
                    ⚠️ Erreur
                </Typography>
                <Typography color={colors.grey[300]}>
                    Impossible de charger les informations de la formation
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/formations")}
                    sx={{
                        backgroundColor: colors.blueAccent[600],
                        "&:hover": { backgroundColor: colors.blueAccent[700] },
                    }}
                >
                    Retour à la liste
                </Button>
            </Box>
        );
    }

    const f = selectedFormation;
    const diplomeInfo = diplomeConfig[f.diplome] || {
        label: f.diplome,
        color: colors.grey[500],
        icon: "🎓",
    };

    return (
        <Box m="20px">
            {/* ACTION BUTTONS */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/formations")}
                    sx={{
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: colors.primary[400],
                        },
                    }}
                >
                    Retour
                </Button>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{
                        backgroundColor: colors.blueAccent[600],
                        color: colors.grey[100],
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: colors.blueAccent[700],
                        },
                    }}
                >
                    Modifier
                </Button>
            </Box>

            {/* HEADER */}
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: colors.primary[400],
                    p: "30px",
                    mb: "20px",
                    borderRadius: "12px",
                }}
            >
                <Box display="flex" alignItems="center" gap="20px">
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            backgroundColor: diplomeInfo.color,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "40px",
                        }}
                    >
                        {diplomeInfo.icon}
                    </Box>
                    <Box flex="1">
                        <Typography variant="h2" fontWeight="bold" color={colors.greenAccent[400]}>
                            {f.nomFormation}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[300]} mt="5px">
                            Code: {f.codeFormation}
                        </Typography>
                        <Box display="flex" gap="10px" mt="15px" flexWrap="wrap">
                            <Chip
                                label={diplomeInfo.label}
                                sx={{
                                    backgroundColor: diplomeInfo.color,
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            />
                            {f.doubleDiplome && (
                                <Chip
                                    label="Double Diplôme"
                                    sx={{
                                        backgroundColor: colors.blueAccent[600],
                                        color: colors.grey[100],
                                        fontWeight: "bold",
                                    }}
                                />
                            )}
                            {f.n0Annee && (
                                <Chip
                                    label="Année 0"
                                    sx={{
                                        backgroundColor: colors.greenAccent[600],
                                        color: colors.grey[100],
                                        fontWeight: "bold",
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Paper>

            {/* STATS GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                mb="20px"
            >
                {/* DIPLÔME */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="12px"
                    sx={{
                        transition: "transform 0.2s",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    <StatBox
                        title={diplomeInfo.label}
                        subtitle="Diplôme"
                        icon={
                            <WorkspacePremiumIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* CODE FORMATION */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="12px"
                    sx={{
                        transition: "transform 0.2s",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    <StatBox
                        title={f.codeFormation}
                        subtitle="Code Formation"
                        icon={
                            <SchoolIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ANNÉE 0 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="12px"
                    sx={{
                        transition: "transform 0.2s",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    <StatBox
                        title={f.n0Annee ? "Oui" : "Non"}
                        subtitle="Année 0"
                        icon={
                            <NewReleasesIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* DOUBLE DIPLÔME */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="12px"
                    sx={{
                        transition: "transform 0.2s",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    <StatBox
                        title={f.doubleDiplome ? "Oui" : "Non"}
                        subtitle="Double Diplôme"
                        icon={
                            <CheckCircleIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
            </Box>

            {/* HABILITATION INFO */}
            <Box
                backgroundColor={colors.primary[400]}
                p="30px"
                borderRadius="12px"
                sx={{
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="700"
                    mb="20px"
                    color={colors.greenAccent[400]}
                >
                    Période d'Habilitation
                </Typography>
                <Divider sx={{ mb: "20px", backgroundColor: colors.grey[700] }} />

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="30px">
                    <Box display="flex" alignItems="center" gap="12px">
                        <CalendarTodayIcon
                            sx={{ color: colors.blueAccent[500], fontSize: "30px" }}
                        />
                        <Box>
                            <Typography variant="body2" color={colors.grey[400]}>
                                Début d'habilitation
                            </Typography>
                            <Typography variant="h5" fontWeight="600">
                                {f.debutHabilitation || "—"}
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap="12px">
                        <CalendarTodayIcon
                            sx={{ color: colors.blueAccent[500], fontSize: "30px" }}
                        />
                        <Box>
                            <Typography variant="body2" color={colors.grey[400]}>
                                Fin d'habilitation
                            </Typography>
                            <Typography variant="h5" fontWeight="600">
                                {f.finHabilitation || "—"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    mt="30px"
                    p="20px"
                    backgroundColor={colors.greenAccent[800]}
                    borderRadius="8px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CheckCircleIcon
                        sx={{ color: colors.greenAccent[400], fontSize: "30px", mr: "10px" }}
                    />
                    <Typography variant="h4" fontWeight="bold" color={colors.greenAccent[400]}>
                        Formation Active
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FormationDetails;