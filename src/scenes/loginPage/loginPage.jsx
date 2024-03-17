import {
    Box,
    Typography,
    useTheme
} from "@mui/material";
import Form from "./Form.jsx";

const LoginPage = () => {
    const theme = useTheme();

    return (
        <Box>
            <Box
            width="100%" 
            backgroundColor={theme.palette.background} 
            p="1rem 6%" 
            textAlign="center"
            >
                <Typography 
                    fontWeight="bold" 
                    fontSize="32px"
                    color="secondary"
                >
                    Jobbing Memory
                </Typography>
            </Box>

            <Box
                width="75%"  
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                maxWidth = "610px"
                backgroundColor={theme.palette.background}
            >
                <Typography 
                    fontWeight="500" 
                    variant="h5"
                    sx={{ mb : "1.5rem" }}
                >
                    Welcome to Jobbing Memory, the job application tracking website 
                </Typography>
                <Form />
            </Box>
        </Box>
    )
};

export default LoginPage;