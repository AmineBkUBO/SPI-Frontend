import { useEffect } from "react";
import {
    Box,
    Typography,
    useTheme,
    IconButton,
    CircularProgress,
    Button, // ✅ added
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import usePromotionStore from "../../Store/promotionStore";

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
    const handleEdit = (anneePro, siglePro) => console.log("Edit promotion:", anneePro, siglePro);
    const handleAdd = () => navigate("/promotions/add"); // ✅

    const columns = [
        { field: "anneePro", headerName: "Année", width: 120 },
        { field: "siglePro", headerName: "Sigle", width: 120, cellClassName: "name-column--cell" },
        { field: "nbEtuSouhaite", headerName: "Étudiants souhaités", type: "number", width: 180 },
        { field: "etatPreselection", headerName: "État", width: 120 },
        { field: "dateRentree", headerName: "Date de rentrée", width: 160 },
        { field: "lieuRentree", headerName: "Lieu", width: 120 },
        {
            field: "responsable",
            headerName: "Responsable",
            flex: 1,
            valueGetter: (params) =>
                params.row.noEnseignant
                    ? `${params.row.noEnseignant.nom} ${params.row.noEnseignant.prenom}`
                    : "—",
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Box display="flex" gap="8px">
                    <IconButton
                        onClick={() => handleView(row.anneePro)}
                        sx={{ color: colors.greenAccent[600] }}
                    >
                        <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleEdit(row.anneePro, row.siglePro)}
                        sx={{ color: colors.blueAccent[600] }}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            {/* Header + Add Button */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={title} subtitle={subtitle} />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: colors.greenAccent[600],
                        "&:hover": { backgroundColor: colors.greenAccent[500] },
                        fontWeight: "bold",
                    }}
                    onClick={handleAdd}
                >
                    Add Promotion
                </Button>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" textAlign="center" mt={4}>
                    Error: {error}
                </Typography>
            ) : (
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": { border: "none" },
                        "& .MuiDataGrid-cell": { borderBottom: "none" },
                        "& .name-column--cell": { color: colors.greenAccent[300], fontWeight: "bold" },
                        "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                        "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                    }}
                >
                    <DataGrid
                        rows={promotions}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        getRowId={(row) => `${row.anneePro}`}
                    />
                </Box>
            )}
        </Box>
    );
}
