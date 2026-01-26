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

import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";

import useEnseignantStore from "../../Store/enseignantStore";

const sexeLabel = {
    H: "Homme",
    F: "Femme",
    L: "Autre",
};

const EnseignantDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { slug } = useParams();

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
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error || !selectedEnseignant) {
        return (
            <Typography color="error" textAlign="center">
                Impossible de charger l’enseignant
            </Typography>
        );
    }

    const e = selectedEnseignant;

    return (
        <Box m="20px">
            {/* HEADER */}
            <Header
                title={`${e.prenom} ${e.nom}`}
                subtitle={`Enseignant • ID ${e.id}`}
            />

            {/* GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                mt="20px"
            >
                {/* NOM & PRÉNOM */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={`${e.prenom} ${e.nom}`}
                        subtitle="Nom complet"
                        icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* SEXE */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={sexeLabel[e.sexe] || "—"}
                        subtitle="Sexe"
                        icon={<BadgeIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* VILLE */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={e.ville || "—"}
                        subtitle="Ville"
                        icon={<HomeIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* TÉLÉPHONE */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={e.telPort || "—"}
                        subtitle="Téléphone"
                        icon={<PhoneIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* DETAILS */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="25px"
                >
                    <Typography variant="h5" fontWeight="600" mb="15px">
                        Informations générales
                    </Typography>

                    <Typography>🏢 Adresse : {e.adresse || "—"}</Typography>
                    <Typography>✉️ Email personnel : {e.encPersoEmail || "—"}</Typography>
                    <Typography>✉️ Email UBO : {e.encUboEmail || "—"}</Typography>
                    <Typography>📞 Téléphone perso : {e.encPersoTel || "—"}</Typography>
                    <Typography>📞 Téléphone UBO : {e.encUboTel || "—"}</Typography>
                    <Typography>🌍 Pays : {e.pays || "—"}</Typography>
                    <Typography>Type : {e.type || "—"}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default EnseignantDetails;
