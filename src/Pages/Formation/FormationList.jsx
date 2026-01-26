import { useEffect } from "react";
import {
    Box,
    Typography,
    useTheme,
    IconButton,
    CircularProgress,
    Button, // ✅ import Button
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import useFormationStore from "../../Store/formationStore";

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
        navigate("/formations/add"); // ✅ redirect
    };

    // Columns (unchanged)
    const columns = [
        {
            field: "codeFormation",
            headerName: "Code",
            width: 100,
        },
        {
            field: "nomFormation",
            headerName: "Nom de la formation",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "diplome",
            headerName: "Diplôme",
            width: 100,
            valueFormatter: (params) => {
                switch (params.value) {
                    case "L":
                        return "Licence";
                    case "M":
                        return "Master";
                    default:
                        return params.value;
                }
            },
        },
        {
            field: "n0Annee",
            headerName: "Année",
            width: 90,
            valueFormatter: (params) => (params.value ? "Oui" : "Non"),
        },
        {
            field: "doubleDiplome",
            headerName: "Double diplôme",
            width: 150,
            valueFormatter: (params) => (params.value ? "Oui" : "Non"),
        },
        {
            field: "debutHabilitation",
            headerName: "Début habilitation",
            width: 160,
        },
        {
            field: "finHabilitation",
            headerName: "Fin habilitation",
            width: 120,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            renderCell: ({ row }) => (
                <Box display="flex" gap="8px">
                    <IconButton
                        onClick={() => {
                            handleView(row.codeFormation);
                            selectFormation(row.codeFormation);
                        }}
                        sx={{ color: colors.greenAccent[600] }}
                    >
                        <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleEdit(row.codeFormation)}
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
                    onClick={handleAddFormation}
                    sx={{
                        backgroundColor: colors.greenAccent[600],
                        color: colors.grey[100],
                        fontWeight: "bold",
                        borderRadius: "8px",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: colors.greenAccent[500],
                        },
                        boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                    }}
                >
                    Add Formation
                </Button>

            </Box>

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
                        rows={formations}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        getRowId={(row) => row.codeFormation}
                    />
                </Box>
            )}
        </Box>
    );
}
