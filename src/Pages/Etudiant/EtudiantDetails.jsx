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
    Avatar,
} from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import PublicIcon from "@mui/icons-material/Public";
import WcIcon from "@mui/icons-material/Wc";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import useEtudiantStore from "../../Store/etudiantStore";

const sexeConfig = {
    H: { label: "Homme", color: "#3da58a" },
    F: { label: "Femme", color: "#db4f4a" },
    A: { label: "Autre", color: "#4cceac" },
};

const EtudiantDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { slug } = useParams();
    const navigate = useNavigate();

    const {
        selectedEtudiant,
        loading,
        error,
        fetchEtudiantById,
    } = useEtudiantStore();

    useEffect(() => {
        if (slug) {
            fetchEtudiantById(slug);
        }
    }, [slug, fetchEtudiantById]);

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

    if (error || !selectedEtudiant) {
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
                    Impossible de charger les informations de l'étudiant
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/etudiants")}
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

    const e = selectedEtudiant;
    const sexeInfo = sexeConfig[e.sexe] || { label: e.sexe, color: colors.grey[500] };

    return (
        <Box m="20px">
            {/* ACTION BUTTONS */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/etudiants")}
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

            {/* HEADER WITH AVATAR */}
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: colors.primary[400],
                    p: "30px",
                    mb: "20px",
                    borderRadius: "12px",
                }}
            >
                <Box display="flex" alignItems="center" gap="30px">
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            backgroundColor: colors.greenAccent[600],
                            fontSize: "40px",
                            fontWeight: "bold",
                        }}
                    >
                        {e.prenom?.[0]}{e.nom?.[0]}
                    </Avatar>
                    <Box flex="1">
                        <Typography variant="h2" fontWeight="bold" color={colors.greenAccent[400]}>
                            {e.prenom} {e.nom}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[300]} mt="5px">
                            N° National: {e.noEtudiantNat}
                        </Typography>
                        <Box display="flex" gap="10px" mt="15px" flexWrap="wrap">
                            <Chip
                                label={e.anneePro?.siglePro || "Pas de promotion"}
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    fontWeight: "bold",
                                }}
                            />
                            <Chip
                                label={e.estDiplome === "O" ? "Diplômé" : "En cours"}
                                sx={{
                                    backgroundColor:
                                        e.estDiplome === "O"
                                            ? colors.greenAccent[600]
                                            : colors.grey[700],
                                    color: colors.grey[100],
                                    fontWeight: "bold",
                                }}
                            />
                            <Chip
                                label={sexeInfo.label}
                                sx={{
                                    backgroundColor: sexeInfo.color,
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Paper>

            {/* MAIN STATS GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                mb="20px"
            >
                {/* EMAIL */}
                <Box
                    gridColumn="span 4"
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
                        title={e.email || e.uboEmail || "—"}
                        subtitle="Email"
                        icon={
                            <EmailIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* PROMOTION */}
                <Box
                    gridColumn="span 4"
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
                        title={e.anneePro?.siglePro || "—"}
                        subtitle="Promotion"
                        icon={
                            <SchoolIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* VILLE */}
                <Box
                    gridColumn="span 4"
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
                        title={e.actuVille || "—"}
                        subtitle="Ville"
                        icon={
                            <HomeIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
            </Box>

            {/* DETAILED INFORMATION */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap="20px"
            >
                {/* PERSONAL INFO */}
                <Box
                    gridColumn="span 8"
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
                        Informations Personnelles
                    </Typography>
                    <Divider sx={{ mb: "20px", backgroundColor: colors.grey[700] }} />

                    <Box display="flex" flexDirection="column" gap="15px">
                        <Box display="flex" alignItems="center" gap="12px">
                            <SchoolIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Université
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.universite || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <SchoolIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Dernier Diplôme
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.dernierDiplome || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <PublicIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Nationalité
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.nationalite || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <CakeIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Date de Naissance
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.dateNaissance || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <PhoneIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Téléphone
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.telPort || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <HomeIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Adresse
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.actuAdresse || "—"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* STATUS CARD */}
                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p="30px"
                    borderRadius="12px"
                    sx={{
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                >
                    <ProgressCircle size="150" />
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={
                            e.estDiplome === "O"
                                ? colors.greenAccent[400]
                                : colors.blueAccent[400]
                        }
                        mt="20px"
                        textAlign="center"
                    >
                        {e.estDiplome === "O" ? "Diplômé" : "En cours"}
                    </Typography>
                    <Typography
                        variant="body1"
                        color={colors.grey[300]}
                        mt="10px"
                        textAlign="center"
                    >
                        Statut académique
                    </Typography>

                    {e.anneePro && (
                        <Box mt="30px" textAlign="center">
                            <Typography variant="body2" color={colors.grey[400]}>
                                Promotion
                            </Typography>
                            <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[400]}>
                                {e.anneePro.siglePro}
                            </Typography>
                            <Typography variant="body2" color={colors.grey[300]} mt="5px">
                                Année: {e.anneePro.anneePro}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default EtudiantDetails;