import{ 
    Box,
    Typography,
    useTheme
} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/navbar";
import AddJobPost from "scenes/widgets/AddJobPost";
import CalendarComponent from "components/Calendar";
import JobPostList from "scenes/widgets/JobPostList";


const HomePage = () => {
    const theme = useTheme();
    const primaryLight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;

    return (
        <Box>
            <Navbar />

            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box
                    width="100%"
                    padding="2rem 6%"
                    display="flex"
                    gap="0.5rem"
                    justifyContent="space-between"
                >
                    <JobPostList/>
                </Box>
                <Box width={"55%"}>
                    <AddJobPost />
                </Box>
                
            </Box>
        </Box>
    )
};

export default HomePage