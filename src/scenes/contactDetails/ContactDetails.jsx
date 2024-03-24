import Navbar from "scenes/navbar/navbar";
import { 
    Typography, 
    Box,
    Button
} from "@mui/material";

const ContactDetails = () => {
    return (
        <Box>
            <Navbar page="contactDetails"/>
            <Box>
                <Typography>
                    Contact Details
                </Typography>
            </Box>
        </Box>
        
    )
}

export default ContactDetails;