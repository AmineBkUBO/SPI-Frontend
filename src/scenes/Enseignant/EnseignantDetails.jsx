import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const EnseignantDetail = () => {
    const { slug } = useParams(); // <-- this catches the dynamic part of the URL

    console.log(slug)
    return (
        <Box m="20px">
            <Typography variant="h4">Détail Enseignant</Typography>
            <Typography variant="body1">Slug reçu: {slug}</Typography>
            {/* You can now fetch data based on this slug */}
        </Box>
    );
};

export default EnseignantDetail;
