// src/Pages/Promotion/PromotionDetail.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    useTheme,
    CircularProgress,
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
import HomeIcon from "@mui/icons-material/Home";

import usePromotionStore from "../../Store/promotionStore";
import useEnseignantStore from "../../Store/enseignantStore";

const PromotionDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { slug } = useParams();

    const { selectedPromotion, loading, error, fetchPromotionById } = usePromotionStore();
    const {
        selectedEnseignant,
        loading: loadingEnseignant,
        error: errorEnseignant,
        fetchEnseignantById,
    } = useEnseignantStore();

    // Fetch promotion
    useEffect(() => {
        if (!slug) return;
        fetchPromotionById(slug);
    }, [slug, fetchPromotionById]);

    // Fetch enseignant when promotion is loaded
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
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error || !selectedPromotion) {
        return (
            <Typography color="error" textAlign="center">
                Impossible de charger la promotion
            </Typography>
        );
    }

    const promo = selectedPromotion;

    return (
        <Box m="20px">
            {/* HEADER */}
            <Header
                title={`Promotion: ${promo.siglePro || slug}`}
                subtitle={`Détails et informations pour ${promo.siglePro || slug}`}
            />

            {/* GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                mt="20px"
            >
                {/* SIGLE */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={promo.siglePro || "—"}
                        subtitle="Sigle"
                        icon={<SchoolIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* ANNÉE */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={promo.anneePro || "—"}
                        subtitle="Année"
                        icon={<EventIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* NOMBRE D'ÉTUDIANTS */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={promo.nbEtuSouhaite || 0}
                        subtitle="Nb Étudiants"
                        icon={<GroupsIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* ÉTAT PRÉSELECTION */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={promo.etatPreselection || "—"}
                        subtitle="État Préselection"
                        icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* ENSEIGNANT RESPONSABLE */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="25px"
                >
                    <Typography variant="h5" fontWeight="600" mb="15px">
                        Enseignant Responsable
                    </Typography>
                    {errorEnseignant && <Typography color="error">{errorEnseignant}</Typography>}
                    {!selectedEnseignant && !errorEnseignant && (
                        <Typography>Chargement...</Typography>
                    )}
                    {selectedEnseignant && (
                        <Box>
                            <Typography>
                                👤 {selectedEnseignant.prenom} {selectedEnseignant.nom}
                            </Typography>
                            <Typography>
                                📞 {selectedEnseignant.encUboTel || "Pas de Mail Perso"}
                            </Typography>
                            <Typography>
                                📞 {selectedEnseignant.encPersoTel || "Pas de Mail Perso"}
                            </Typography>
                            <Typography>
                                📧 {selectedEnseignant.email || "Pas de Mail Perso"}
                            </Typography>
                            <Typography>
                                📧 {selectedEnseignant.encUboEmail || "—"}
                            </Typography>
                            <Typography>
                                🏷 Type : {selectedEnseignant.type || "—"}
                            </Typography>
                            <Typography>
                                🏠 Type : {selectedEnseignant.adresse + ", " + selectedEnseignant.ville  + ", " + selectedEnseignant.cp || "—"}
                            </Typography>

                        </Box>
                    )}
                </Box>

                {/* DATES */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="25px"
                >
                    <Typography variant="h5" fontWeight="600" mb="15px">
                        Dates Importantes
                    </Typography>
                    <Typography>Rentrée : {promo.dateRentree || "—"}</Typography>
                    <Typography>Date réponse LP : {promo.dateReponseLp || "—"}</Typography>
                </Box>

                {/* LIEU RENTRÉE */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <ProgressCircle size="125" />
                    <Typography
                        variant="h5"
                        color={colors.greenAccent[500]}
                        mt="15px"
                    >
                        {promo.lieuRentree || "Non défini"}
                    </Typography>
                </Box>

                {/* COMMENTAIRE */}
                {promo.commentaire && (
                    <Box
                        gridColumn="span 12"
                        backgroundColor={colors.primary[400]}
                        p="20px"
                        borderRadius="8px"
                    >
                        <Typography variant="h5" fontWeight="600" mb="10px">
                            Commentaire
                        </Typography>
                        <Typography>{promo.commentaire}</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PromotionDetail;
