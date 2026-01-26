import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Button,
    IconButton,
    Typography,
    useTheme,
    CircularProgress,
} from "@mui/material";


import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import useFormationStore from "../../Store/formationStore";

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
        console.log("Slug : " + slug )
        fetchFormationById(slug);
    }, [ fetchFormationById]);

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
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header
                    title={f.nomFormation}
                    subtitle={`Formation • ${f.codeFormation}`}
                />

                <Button
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Télécharger
                </Button>
            </Box>

            {/* GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                mt="20px"
            >
                {/* FORMATION */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={f.diplome}
                        subtitle="Diplôme"
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
                >
                    <StatBox
                        title={f.n0Annee ? "Oui" : "Non"}
                        subtitle="Nouvelle année"
                        icon={
                            <CalendarTodayIcon
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
                >
                    <StatBox
                        title={f.doubleDiplome ? "Oui" : "Non"}
                        subtitle="Double diplôme"
                        icon={
                            <CheckCircleIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* VALIDITÉ */}
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
                    />
                </Box>

                {/* CHART */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h5" fontWeight="600">
                            Évolution des inscriptions
                        </Typography>
                        <IconButton>
                            <DownloadOutlinedIcon
                                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                            />
                        </IconButton>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard />
                    </Box>
                </Box>

                {/* STATUS */}
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
                        Formation active
                    </Typography>
                </Box>

                {/* BAR CHART */}
                <Box
                    gridColumn="span 12"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                >
                    <Typography variant="h5" fontWeight="600" mb="10px">
                        Répartition des promotions
                    </Typography>
                    <Box height="250px">
                        <BarChart isDashboard />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FormationDetails;
