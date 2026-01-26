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
import useEnseignantStore from "../../Store/enseignantStore";

export default function EnseignantList({
                                           title = "Enseignants",
                                           subtitle = "Managing the Teachers",
                                       }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    // Zustand store
    const { enseignants, loading, error, fetchEnseignants } =
        useEnseignantStore();

    useEffect(() => {
        fetchEnseignants();
    }, [fetchEnseignants]);

    const handleView = (id) => {
        navigate(`/enseignant/${id}`);
    };

    const handleEdit = (id) => {
        console.log("Edit enseignant:", id);
    };

    // ✅ Columns adapted to BACKEND DATA
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
        },
        {
            field: "nom",
            headerName: "Nom",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "prenom",
            headerName: "Prénom",
            flex: 1,
        },
        {
            field: "type",
            headerName: "Type",
            width: 90,
        },
        {
            field: "sexe",
            headerName: "Sexe",
            width: 90,
        },
        {
            field: "telPort",
            headerName: "Téléphone",
            flex: 1,
        },
        {
            field: "encUboEmail",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Box display="flex" gap="8px">
                    <IconButton
                        onClick={() => handleView(row.id)}
                        sx={{ color: colors.greenAccent[600] }}
                    >
                        <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleEdit(row.id)}
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
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
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
                        rows={enseignants}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                    />
                </Box>
            )}
        </Box>
    );
}
