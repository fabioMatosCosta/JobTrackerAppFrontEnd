import{ 
    Box
} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/navbar";
import AddJobPost from "scenes/widgets/AddJobPost";
import CalendarComponent from "components/Calendar";


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
                <Box>
                    <AddJobPost />
                </Box>
            </Box>
        </Box>
    )
};

export default HomePage