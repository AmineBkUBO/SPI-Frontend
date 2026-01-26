import { useEffect } from "react";
import {
    Box,
    Typography,
    useTheme,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import useEtudiantStore from "../../Store/etudiantStore";

export default function EtudiantList({
                                         title = "Étudiants",
                                         subtitle = "Managing Students",
                                     }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { etudiants, loading, error, fetchEtudiants } =
        useEtudiantStore();

    useEffect(() => {
        fetchEtudiants();
    }, [fetchEtudiants]);

    const handleView = (noEtudiantNat) => {
        navigate(`/etudiant/${noEtudiantNat}`);
    };

    const handleEdit = (noEtudiantNat) => {
        console.log("Edit student:", noEtudiantNat);
    };

    // ✅ Colonnes ALIGNÉES BACKEND
    const columns = [
        {
            field: "noEtudiantNat",
            headerName: "N° National",
            width: 150,
        },
        {
            field: "nomComplet",
            headerName: "Nom & Prénom",
            flex: 1,
            cellClassName: "name-column--cell",
            valueGetter: (params) =>
                `${params.row.nom} ${params.row.prenom}`,
        },
        {
            field: "formation",
            headerName: "Formation",
            width: 130,
            valueGetter: (params) =>
                params.row.anneePro
                    ? params.row.anneePro.siglePro
                    : "—",
        },
        {
            field: "annee",
            headerName: "Année",
            width: 120,
            valueGetter: (params) =>
                params.row.anneePro
                    ? params.row.anneePro.anneePro
                    : "—",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "telPort",
            headerName: "Téléphone",
            width: 150,
        },
        {
            field: "estDiplome",
            headerName: "Diplômé",
            width: 70,
            valueFormatter: (params) =>
                params.value === "O" ? "Oui" : "Non",
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            renderCell: ({ row }) => (
                <Box display="flex" gap="8px">
                    <IconButton
                        onClick={() => handleView(row.noEtudiantNat)}
                        sx={{ color: colors.greenAccent[600] }}
                    >
                        <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleEdit(row.noEtudiantNat)}
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
            <Header title={title} subtitle={subtitle} />

            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="75vh"
                >
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
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                            fontWeight: "bold",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                    }}
                >
                    <DataGrid
                        rows={etudiants}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        // ✅ ID MÉTIER UNIQUE
                        getRowId={(row) => row.noEtudiantNat}
                    />
                </Box>
            )}
        </Box>
    );
}
