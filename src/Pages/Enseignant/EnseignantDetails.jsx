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

import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import WorkIcon from "@mui/icons-material/Work";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import useEnseignantStore from "../../Store/enseignantStore";

const sexeConfig = {
    H: { label: "Homme", color: "#3da58a" },
    F: { label: "Femme", color: "#db4f4a" },
    L: { label: "Autre", color: "#4cceac" },
};

const EnseignantDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { slug } = useParams();
    const navigate = useNavigate();

    const {
        selectedEnseignant,
        loading,
        error,
        fetchEnseignantById,
    } = useEnseignantStore();

    useEffect(() => {
        if (!slug) return;
        fetchEnseignantById(slug);
    }, [slug, fetchEnseignantById]);

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

    if (error || !selectedEnseignant) {
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
                    Impossible de charger les informations de l'enseignant
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/enseignants")}
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

    const e = selectedEnseignant;
    const sexeInfo = sexeConfig[e.sexe] || { label: e.sexe, color: colors.grey[500] };

    return (
        <Box m="20px">
            {/* ACTION BUTTONS */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/enseignants")}
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
                            backgroundColor: colors.blueAccent[600],
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
                            Enseignant • ID: {e.id}
                        </Typography>
                        <Box display="flex" gap="10px" mt="15px" flexWrap="wrap">
                            <Chip
                                label={e.type || "Type non défini"}
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
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
                {/* TÉLÉPHONE PORTABLE */}
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
                        title={e.telPort || "—"}
                        subtitle="Téléphone portable"
                        icon={<PhoneIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
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
                        title={e.ville || "—"}
                        subtitle="Ville"
                        icon={<HomeIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* PAYS */}
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
                        title={e.pays || "—"}
                        subtitle="Pays"
                        icon={<PublicIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
            </Box>

            {/* DETAILED INFORMATION */}
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="20px">
                {/* CONTACT PROFESSIONNEL */}
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
                        Contact Professionnel (UBO)
                    </Typography>
                    <Divider sx={{ mb: "20px", backgroundColor: colors.grey[700] }} />

                    <Box display="flex" flexDirection="column" gap="15px">
                        <Box display="flex" alignItems="center" gap="12px">
                            <EmailIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Email UBO
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.encUboEmail || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <PhoneIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Téléphone UBO
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.encUboTel || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <WorkIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Type
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.type || "—"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* CONTACT PERSONNEL */}
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
                        Contact Personnel
                    </Typography>
                    <Divider sx={{ mb: "20px", backgroundColor: colors.grey[700] }} />

                    <Box display="flex" flexDirection="column" gap="15px">
                        <Box display="flex" alignItems="center" gap="12px">
                            <EmailIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Email Personnel
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.encPersoEmail || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <PhoneIcon sx={{ color: colors.blueAccent[500] }} />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Téléphone Personnel
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {e.encPersoTel || "—"}
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
                                    {e.adresse || "—"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default EnseignantDetails;