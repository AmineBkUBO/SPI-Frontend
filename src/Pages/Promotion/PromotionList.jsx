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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import usePromotionStore from "../../Store/promotionStore";

const stateColors = {
    "En cours": "#4cceac",
    Terminée: "#db4f4a",
    Planifiée: "#6870fa",
};

export default function PromotionList({
                                          title = "Promotions",
                                          subtitle = "Managing Promotions",
                                      }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { promotions, loading, error, fetchPromotions } = usePromotionStore();

    useEffect(() => {
        fetchPromotions();
    }, [fetchPromotions]);

    const handleView = (anneePro) => navigate(`/promotion/${anneePro}`);
    const handleEdit = (anneePro, siglePro) =>
        console.log("Edit promotion:", anneePro, siglePro);
    const handleAdd = () => navigate("/promotion/add");

    const columns = [
        {
            field: "anneePro",
            headerName: "Année",
            width: 120,
            renderCell: ({ value }) => (
                <Box display="flex" alignItems="center" gap="6px">
                    <CalendarTodayIcon sx={{ fontSize: 16, color: colors.grey[400] }} />
                    <Typography variant="body2" fontWeight="600">
                        {value}
                    </Typography>
                </Box>
            ),
        },
        {
            field: "siglePro",
            headerName: "Sigle",
            width: 140,
            renderCell: ({ value }) => (
                <Chip
                    label={value}
                    size="medium"
                    sx={{
                        backgroundColor: colors.greenAccent[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                    }}
                />
            ),
        },
        {
            field: "nbEtuSouhaite",
            headerName: "Étudiants souhaités",
            type: "number",
            width: 180,
            renderCell: ({ value }) => (
                <Box display="flex" alignItems="center" gap="6px">
                    <GroupsIcon sx={{ fontSize: 18, color: colors.blueAccent[400] }} />
                    <Typography variant="body2" fontWeight="500">
                        {value || 0}
                    </Typography>
                </Box>
            ),
        },
        {
            field: "etatPreselection",
            headerName: "État",
            width: 140,
            renderCell: ({ value }) => (
                <Chip
                    label={value || "—"}
                    size="small"
                    sx={{
                        backgroundColor: stateColors[value] || colors.grey[600],
                        color: "#fff",
                        fontWeight: "bold",
                    }}
                />
            ),
        },
        {
            field: "dateRentree",
            headerName: "Date de rentrée",
            width: 160,
            renderCell: ({ value }) => (
                <Typography variant="body2" sx={{ color: colors.grey[100] }}>
                    {value || "—"}
                </Typography>
            ),
        },
        {
            field: "lieuRentree",
            headerName: "Lieu",
            width: 140,
            renderCell: ({ value }) => (
                <Box display="flex" alignItems="center" gap="6px">
                    <LocationOnIcon sx={{ fontSize: 16, color: colors.grey[400] }} />
                    <Typography variant="body2">{value || "—"}</Typography>
                </Box>
            ),
        },
        {
            field: "responsable",
            headerName: "Responsable",
            flex: 1,
            minWidth: 180,
            renderCell: ({ row }) => (
                <Box display="flex" alignItems="center" gap="6px">
                    <PersonIcon sx={{ fontSize: 18, color: colors.greenAccent[500] }} />
                    <Typography
                        variant="body2"
                        sx={{ color: colors.greenAccent[400], fontWeight: "500" }}
                    >
                        {row.noEnseignant
                            ? `${row.noEnseignant.nom} ${row.noEnseignant.prenom}`
                            : "—"}
                    </Typography>
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
                            onClick={() => handleView(row.anneePro)}
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
                    <Tooltip title="Edit Promotion" arrow>
                        <IconButton
                            onClick={() => handleEdit(row.anneePro, row.siglePro)}
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
                    onClick={handleAdd}
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
                    Add Promotion
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
                        Total Promotions
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}
                    >
                        {promotions.length}
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
                        Total Students Expected
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.blueAccent[500]}
                    >
                        {promotions.reduce((sum, p) => sum + (p.nbEtuSouhaite || 0), 0)}
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
                        Loading promotions...
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
                        rows={promotions}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        getRowId={(row) => `${row.anneePro}`}
                        disableSelectionOnClick
                    />
                </Box>
            )}
        </Box>
    );
}