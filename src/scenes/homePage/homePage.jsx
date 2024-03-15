import Navbar from "scenes/navbar/navbar";
import{ 
    Box
} from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
    const {_id, picturePath } = useSelector((state)=> state.user);

    return (
        <Box>
            <Navbar />
        </Box>
    )
};

export default HomePage