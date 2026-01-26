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

import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";

import useEtudiantStore from "../../Store/etudiantStore";

const EtudiantDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { slug } = useParams();


    const {
        selectedEtudiant,
        loading,
        error,
        fetchEtudiantById,
    } = useEtudiantStore();

    useEffect(() => {
        fetchEtudiantById(slug);
    }, [ fetchEtudiantById]);

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

    if (error || !selectedEtudiant) {
        return (
            <Typography color="error" textAlign="center">
                Impossible de charger l’étudiant
            </Typography>
        );
    }

    const e = selectedEtudiant;

    return (
        <Box m="20px">
            {/* HEADER */}
            <Header
                title={`${e.prenom} ${e.nom}`}
                subtitle={`Étudiant • ${e.noEtudiantNat}`}
            />

            {/* GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* IDENTITÉ */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={`${e.prenom} ${e.nom}`}
                        subtitle="Identité"
                        icon={
                            <PersonIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* EMAIL */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
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
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
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
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
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

                {/* DETAILS */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="25px"
                >
                    <Typography variant="h5" fontWeight="600" mb="15px">
                        Informations générales
                    </Typography>

                    <Typography>🎓 Université : {e.universite}</Typography>
                    <Typography>📚 Diplôme : {e.dernierDiplome}</Typography>
                    <Typography>👤 Sexe : {e.sexe}</Typography>
                    <Typography>🌍 Nationalité : {e.nationalite}</Typography>
                    <Typography>📞 Téléphone : {e.telPort || "—"}</Typography>
                    <Typography>🏠 Adresse : {e.actuAdresse}</Typography>
                    <Typography>📅 Naissance : {e.dateNaissance}</Typography>
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
                        {e.estDiplome === "O" ? "Diplômé" : "En cours"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default EtudiantDetails;
