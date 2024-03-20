import{ 
    Box
} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/navbar";
import AddJobPost from "scenes/widgets/AddJobPost";
import CalendarComponent from "components/Calendar";
import JobPostList from "scenes/widgets/JobPostList";


const HomePage = () => {
    const {_id, picturePath } = useSelector((state)=> state.user);

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
                <Box>
                    {/* <CalendarComponent /> */}
                </Box>
                <Box width={"55%"}>
                    <AddJobPost />
                </Box>
            </Box>
            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="0.5rem"
                justifyContent="space-between"
            >
                <JobPostList/>
            </Box>
        </Box>
    )
};

export default HomePage