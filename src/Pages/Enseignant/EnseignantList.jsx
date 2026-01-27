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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import useEnseignantStore from "../../Store/enseignantStore";
import { useEffect } from "react";

const sexeConfig = {
    H: { label: "Homme", color: "#3da58a" },
    F: { label: "Femme", color: "#db4f4a" },
    L: { label: "Autre", color: "#4cceac" },
};

export default function EnseignantList({
                                           title = "Enseignants",
                                           subtitle = "Managing the Teachers",
                                       }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { enseignants, loading, error, fetchEnseignants } =
        useEnseignantStore();

    useEffect(() => {
        fetchEnseignants();
    }, [fetchEnseignants]);

    const handleView = (id) => navigate(`/enseignant/${id}`);
    const handleEdit = (id) => {
        navigate(`/enseignant/edit/${id}`);
        console.log("Edit enseignant:", id);
    }
    const handleAdd = () => navigate("/enseignant/add");

    const columns = [

        {
            field: "nomComplet",
            headerName: "Nom Complet",
            flex: 1,
            minWidth: 200,
            renderCell: ({ row }) => (
                <Box display="flex" alignItems="center" gap="8px">
                    <PersonIcon sx={{ fontSize: 20, color: colors.greenAccent[500] }} />
                    <Box>
                        <Typography
                            variant="body2"
                            fontWeight="600"
                            sx={{ color: colors.greenAccent[400] }}
                        >
                            {row.nom} {row.prenom}
                        </Typography>
                    </Box>
                </Box>
            ),
        },
        {
            field: "type",
            headerName: "Type",
            width: 120,
            renderCell: ({ value }) => (
                <Chip
                    label={value || "—"}
                    size="small"
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                    }}
                />
            ),
        },
        {
            field: "sexe",
            headerName: "Sexe",
            width: 100,
            renderCell: ({ value }) => {
                const config = sexeConfig[value] || { label: "—", color: colors.grey[500] };
                return (
                    <Chip
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
            field: "telPort",
            headerName: "Téléphone",
            flex: 1,
            minWidth: 150,
            renderCell: ({ value }) => (
                <Box display="flex" alignItems="center" gap="6px">
                    <PhoneIcon sx={{ fontSize: 16, color: colors.grey[400] }} />
                    <Typography variant="body2">{value || "—"}</Typography>
                </Box>
            ),
        },
        {
            field: "encUboEmail",
            headerName: "Email",
            flex: 1,
            minWidth: 200,
            renderCell: ({ value }) => (
                <Box display="flex" alignItems="center" gap="6px">
                    <EmailIcon sx={{ fontSize: 16, color: colors.grey[400] }} />
                    <Typography variant="body2" sx={{ color: colors.grey[100] }}>
                        {value || "—"}
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
                            onClick={() => handleView(row.id)}
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
                    <Tooltip title="Edit Teacher" arrow>
                        <IconButton
                            onClick={() => handleEdit(row.id)}
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
                    Add Enseignant
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
                        Total Teachers
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}
                    >
                        {enseignants.length}
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
                        Loading teachers...
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
                        rows={enseignants}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        disableSelectionOnClick
                    />
                </Box>
            )}
        </Box>
    );
}