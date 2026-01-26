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

import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";

import usePromotionStore from "../../Store/promotionStore";
import useEnseignantStore from "../../Store/enseignantStore";

const stateColors = {
    "En cours": "#4cceac",
    "Terminée": "#db4f4a",
    "Planifiée": "#6870fa",
};

const PromotionDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { slug } = useParams();
    const navigate = useNavigate();

    const { selectedPromotion, loading, error, fetchPromotionById } =
        usePromotionStore();
    const {
        selectedEnseignant,
        loading: loadingEnseignant,
        error: errorEnseignant,
        fetchEnseignantById,
    } = useEnseignantStore();

    useEffect(() => {
        if (!slug) return;
        fetchPromotionById(slug);
    }, [slug, fetchPromotionById]);

    useEffect(() => {
        if (selectedPromotion?.noEnseignant?.id) {
            fetchEnseignantById(selectedPromotion.noEnseignant.id);
        }
    }, [selectedPromotion, fetchEnseignantById]);

    if (loading || loadingEnseignant) {
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

    if (error || !selectedPromotion) {
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
                    Impossible de charger les informations de la promotion
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/promotions")}
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

    const promo = selectedPromotion;
    const stateColor =
        stateColors[promo.etatPreselection] || colors.grey[600];

    return (
        <Box m="20px">
            {/* ACTION BUTTONS */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/promotions")}
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
                            backgroundColor: colors.greenAccent[600],
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <SchoolIcon sx={{ fontSize: "40px", color: "#fff" }} />
                    </Box>
                    <Box flex="1">
                        <Typography variant="h2" fontWeight="bold" color={colors.greenAccent[400]}>
                            Promotion {promo.siglePro}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[300]} mt="5px">
                            Année: {promo.anneePro}
                        </Typography>
                        <Box display="flex" gap="10px" mt="15px" flexWrap="wrap">
                            <Chip
                                label={promo.etatPreselection || "État inconnu"}
                                sx={{
                                    backgroundColor: stateColor,
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            />
                            <Chip
                                label={`${promo.nbEtuSouhaite || 0} étudiants`}
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    fontWeight: "bold",
                                }}
                            />
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
                {/* SIGLE */}
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
                        title={promo.siglePro || "—"}
                        subtitle="Sigle"
                        icon={
                            <SchoolIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ANNÉE */}
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
                        title={promo.anneePro || "—"}
                        subtitle="Année"
                        icon={
                            <EventIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* NOMBRE D'ÉTUDIANTS */}
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
                        title={promo.nbEtuSouhaite || 0}
                        subtitle="Nb Étudiants"
                        icon={
                            <GroupsIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* LIEU DE RENTRÉE */}
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
                        title={promo.lieuRentree || "Non défini"}
                        subtitle="Lieu de rentrée"
                        icon={
                            <LocationOnIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
            </Box>

            {/* DETAILED INFO GRID */}
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
                {/* ENSEIGNANT RESPONSABLE */}
                <Box
                    gridColumn="span 6"
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
                        Enseignant Responsable
                    </Typography>
                    <Divider sx={{ mb: "20px", backgroundColor: colors.grey[700] }} />

                    {errorEnseignant && (
                        <Typography color="error">{errorEnseignant}</Typography>
                    )}
                    {!selectedEnseignant && !errorEnseignant && (
                        <Box display="flex" justifyContent="center" p="20px">
                            <CircularProgress size={40} />
                        </Box>
                    )}
                    {selectedEnseignant && (
                        <Box>
                            <Box display="flex" alignItems="center" gap="15px" mb="20px">
                                <Avatar
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: colors.blueAccent[600],
                                        fontSize: "24px",
                                    }}
                                >
                                    {selectedEnseignant.prenom?.[0]}
                                    {selectedEnseignant.nom?.[0]}
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {selectedEnseignant.prenom} {selectedEnseignant.nom}
                                    </Typography>
                                    <Typography variant="body2" color={colors.grey[400]}>
                                        {selectedEnseignant.type || "Enseignant"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" flexDirection="column" gap="12px">
                                <Box display="flex" alignItems="center" gap="10px">
                                    <EmailIcon sx={{ color: colors.blueAccent[500] }} />
                                    <Typography>
                                        {selectedEnseignant.encUboEmail || "—"}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap="10px">
                                    <PhoneIcon sx={{ color: colors.blueAccent[500] }} />
                                    <Typography>
                                        {selectedEnseignant.encUboTel ||
                                            selectedEnseignant.telPort ||
                                            "—"}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap="10px">
                                    <HomeIcon sx={{ color: colors.blueAccent[500] }} />
                                    <Typography>
                                        {selectedEnseignant.adresse
                                            ? `${selectedEnseignant.adresse}, ${selectedEnseignant.ville} ${selectedEnseignant.cp}`
                                            : "—"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* DATES IMPORTANTES */}
                <Box
                    gridColumn="span 6"
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
                        Dates Importantes
                    </Typography>
                    <Divider sx={{ mb: "20px", backgroundColor: colors.grey[700] }} />

                    <Box display="flex" flexDirection="column" gap="20px">
                        <Box display="flex" alignItems="center" gap="12px">
                            <CalendarTodayIcon
                                sx={{ color: colors.blueAccent[500], fontSize: "24px" }}
                            />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Date de rentrée
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {promo.dateRentree || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap="12px">
                            <CalendarTodayIcon
                                sx={{ color: colors.blueAccent[500], fontSize: "24px" }}
                            />
                            <Box>
                                <Typography variant="body2" color={colors.grey[400]}>
                                    Date réponse LP
                                </Typography>
                                <Typography variant="h6" fontWeight="600">
                                    {promo.dateReponseLp || "—"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            mt="20px"
                            p="15px"
                            backgroundColor={colors.greenAccent[800]}
                            borderRadius="8px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <ProgressCircle size="80" />
                        </Box>
                    </Box>
                </Box>

                {/* COMMENTAIRE */}
                {promo.commentaire && (
                    <Box
                        gridColumn="span 12"
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
                            Commentaire
                        </Typography>
                        <Divider sx={{ mb: "20px", backgroundColor: colors.grey[700] }} />
                        <Typography variant="body1" lineHeight="1.8">
                            {promo.commentaire}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PromotionDetail;