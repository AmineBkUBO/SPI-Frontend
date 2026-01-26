import { useEffect } from "react";
import { Box, Typography, useTheme, IconButton, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import usePromotionStore from "../../Store/promotionStore";

export default function PromotionList({ title = "Promotions", subtitle = "Managing Promotions" }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { promotions, loading, error, fetchPromotions } = usePromotionStore();

    useEffect(() => {
        fetchPromotions();
    }, [fetchPromotions]);

    const handleView = (id) => navigate(`/promotion/${id}`);
    const handleEdit = (id) => console.log("Edit promotion:", id);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row }) => (
                <Box display="flex" justifyContent="center" gap="10px">
                    <IconButton onClick={() => handleView(row.id)} sx={{ color: colors.greenAccent[600] }}>
                        <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(row.id)} sx={{ color: colors.blueAccent[600] }}>
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
                        "& .name-column--cell": { color: colors.greenAccent[300] },
                        "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                        "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                    }}
                >
                    <DataGrid rows={promotions} columns={columns} pageSize={10} />
                </Box>
            )}
        </Box>
    );
}
