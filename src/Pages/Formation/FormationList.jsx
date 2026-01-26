import { useEffect } from "react";
import {
    Box,
    Typography,
    useTheme,
    IconButton,
    CircularProgress,
    Button,
    Chip,
    Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import useFormationStore from "../../Store/formationStore";

const diplomeConfig = {
    L: { label: "Licence", color: "#4cceac" },
    M: { label: "Master", color: "#6870fa" },
    D: { label: "Doctorat", color: "#db4f4a" },
};

export default function FormationList({
                                          title = "Formations",
                                          subtitle = "Managing Formations",
                                      }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { formations, loading, error, fetchFormations, selectFormation } =
        useFormationStore();

    useEffect(() => {
        fetchFormations();
    }, [fetchFormations]);

    const handleView = (codeFormation) => {
        navigate(`/formation/${codeFormation}`);
    };

    const handleEdit = (codeFormation) => {
        console.log("Edit formation:", codeFormation);
    };

    const handleAddFormation = () => {
        navigate("/formations/add");
    };

    const columns = [
        {
            field: "codeFormation",
            headerName: "Code",
            width: 100,
            renderCell: ({ value }) => (
                <Chip
                    label={value}
                    size="small"
                    sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        fontWeight: "bold",
                        fontFamily: "monospace",
                    }}
                />
            ),
        },
        {
            field: "nomFormation",
            headerName: "Nom de la formation",
            flex: 1,
            minWidth: 250,
            renderCell: ({ value }) => (
                <Box display="flex" alignItems="center" gap="8px">
                    <SchoolIcon sx={{ fontSize: 20, color: colors.greenAccent[500] }} />
                    <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{ color: colors.greenAccent[400] }}
                    >
                        {value}
                    </Typography>
                </Box>
            ),
        },
        {
            field: "diplome",
            headerName: "Diplôme",
            width: 140,
            renderCell: ({ value }) => {
                const config = diplomeConfig[value] || {
                    label: value,
                    color: colors.grey[600],
                };
                return (
                    <Chip
                        icon={<WorkspacePremiumIcon sx={{ fontSize: 16, color: "#fff !important" }} />}
                        label={config.label}
                        size="small"
                        sx={{
                            backgroundColor: config.color,
                            color: "#fff",
                            fontWeight: "bold",
                        }}
                    />
                );
            },
        },
        {
            field: "n0Annee",
            headerName: "Année 0",
            width: 100,
            renderCell: ({ value }) => (
                <Chip
                    label={value ? "Oui" : "Non"}
                    size="small"
                    sx={{
                        backgroundColor: value
                            ? colors.greenAccent[600]
                            : colors.grey[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                    }}
                />
            ),
        },
        {
            field: "doubleDiplome",
            headerName: "Double diplôme",
            width: 150,
            renderCell: ({ value }) => (
                <Chip
                    label={value ? "Oui" : "Non"}
                    size="small"
                    sx={{
                        backgroundColor: value
                            ? colors.blueAccent[600]
                            : colors.grey[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                    }}
                />
            ),
        },
        {
            field: "debutHabilitation",
            headerName: "Début habilitation",
            width: 160,
            renderCell: ({ value }) => (
                <Box display="flex" alignItems="center" gap="6px">
                    <CalendarTodayIcon sx={{ fontSize: 14, color: colors.grey[400] }} />
                    <Typography variant="body2">{value || "—"}</Typography>
                </Box>
            ),
        },
        {
            field: "finHabilitation",
            headerName: "Fin habilitation",
            width: 160,
            renderCell: ({ value }) => (
                <Box display="flex" alignItems="center" gap="6px">
                    <CalendarTodayIcon sx={{ fontSize: 14, color: colors.grey[400] }} />
                    <Typography variant="body2">{value || "—"}</Typography>
                </Box>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Box display="flex" gap="4px">
                    <Tooltip title="View Details" arrow>
                        <IconButton
                            onClick={() => {
                                handleView(row.codeFormation);
                                selectFormation(row.codeFormation);
                            }}
                            sx={{
                                color: colors.greenAccent[500],
                                transition: "all 0.3s",
                                "&:hover": {
                                    color: colors.greenAccent[300],
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <VisibilityOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Formation" arrow>
                        <IconButton
                            onClick={() => handleEdit(row.codeFormation)}
                            sx={{
                                color: colors.blueAccent[500],
                                transition: "all 0.3s",
                                "&:hover": {
                                    color: colors.blueAccent[300],
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb="20px"
            >
                <Header title={title} subtitle={subtitle} />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddFormation}
                    sx={{
                        backgroundColor: colors.greenAccent[600],
                        color: colors.grey[100],
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        textTransform: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            backgroundColor: colors.greenAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    Add Formation
                </Button>
            </Box>

            {/* Stats Summary */}
            <Box
                display="flex"
                gap="20px"
                mb="20px"
                sx={{
                    flexWrap: "wrap",
                }}
            >
                <Box
                    flex="1"
                    minWidth="200px"
                    backgroundColor={colors.primary[400]}
                    p="15px 20px"
                    borderRadius="8px"
                    boxShadow="0 2px 8px rgba(0,0,0,0.1)"
                >
                    <Typography variant="h6" color={colors.grey[300]}>
                        Total Formations
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}
                    >
                        {formations.length}
                    </Typography>
                </Box>
                <Box
                    flex="1"
                    minWidth="200px"
                    backgroundColor={colors.primary[400]}
                    p="15px 20px"
                    borderRadius="8px"
                    boxShadow="0 2px 8px rgba(0,0,0,0.1)"
                >
                    <Typography variant="h6" color={colors.grey[300]}>
                        Double Diplômes
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.blueAccent[500]}
                    >
                        {formations.filter((f) => f.doubleDiplome).length}
                    </Typography>
                </Box>
            </Box>

            {loading ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="60vh"
                    gap="20px"
                >
                    <CircularProgress size={60} thickness={4} />
                    <Typography variant="h6" color={colors.grey[300]}>
                        Loading formations...
                    </Typography>
                </Box>
            ) : error ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="60vh"
                    gap="10px"
                >
                    <Typography color="error" variant="h5" fontWeight="bold">
                        ⚠️ Error Loading Data
                    </Typography>
                    <Typography color={colors.grey[300]}>{error}</Typography>
                </Box>
            ) : (
                <Box
                    height="calc(100vh - 350px)"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${colors.primary[300]}`,
                            fontSize: "14px",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                            fontSize: "15px",
                            fontWeight: "bold",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiDataGrid-row": {
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: colors.primary[300],
                                cursor: "pointer",
                            },
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        rows={formations}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        getRowId={(row) => row.codeFormation}
                        disableSelectionOnClick
                    />
                </Box>
            )}
        </Box>
    );
}