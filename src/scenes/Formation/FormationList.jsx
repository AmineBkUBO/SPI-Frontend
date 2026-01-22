import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function FormationList  ({ title = "Personel", subtitle = "Managing the Team Members" })  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/team/${id}`);
    };

    const handleEdit = (id) => {
        // Add your edit logic here
        console.log("Edit team member:", id);
    };

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box display="flex" justifyContent="center" gap="10px">
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
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title={title} subtitle={subtitle} />
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
                <DataGrid rows={mockDataTeam} columns={columns} />
            </Box>
        </Box>
    );
};

