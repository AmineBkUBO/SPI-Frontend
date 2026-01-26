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

import SchoolIcon from "@mui/icons-material/School";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import useFormationStore from "../../Store/formationStore";

const diplomeLabel = {
    M: "Master",
    L: "Licence",
    D: "Doctorat",
};

const FormationDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { slug } = useParams();

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
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error || !selectedFormation) {
        return (
            <Typography color="error" textAlign="center">
                Impossible de charger la formation
            </Typography>
        );
    }

    const f = selectedFormation;

    return (
        <Box m="20px">
            {/* HEADER */}
            <Header
                title={f.nomFormation}
                subtitle={`Code formation • ${f.codeFormation}`}
            />

            {/* GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                mt="20px"
            >
                {/* DIPLÔME */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={diplomeLabel[f.diplome]}
                        subtitle="Diplôme"
                        icon={<SchoolIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* NOUVELLE ANNÉE */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={f.n0Annee ? "Oui" : "Non"}
                        subtitle="Nouvelle année"
                        icon={<NewReleasesIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* DOUBLE DIPLÔME */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={f.doubleDiplome ? "Oui" : "Non"}
                        subtitle="Double diplôme"
                        icon={<CheckCircleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* HABILITATION */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={`${f.debutHabilitation} → ${f.finHabilitation}`}
                        subtitle="Habilitation"
                        icon={<CalendarTodayIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>

                {/* STATUS */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        variant="h2"
                        color={colors.greenAccent[500]}
                    >
                        Formation active
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FormationDetails;
