import JobPostWrapper from "components/JobPostWrapper";
import FlexBetween from "components/FlexBetween";
import ToggleSwitch from "components/ToggleSwitch";
import { Typography, 
    Box,
    FormControlLabel,
    Fab,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import { setJobPostContact } from "state";

const ContactComponent = ({
    contactId,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const contacts = useSelector((state) => state.userContacts);
    const contactInfo = contacts.find((contact) => contact._id === contactId);

    //const handleEdit = () => {
    //    navigate(`/jobPostDetails/${jobPostId}/contacts/${contactId}`);
    //}

    return(
        <JobPostWrapper>
            <FlexBetween>
                <Box 
                    display="grid"
                    width={"100%"}
                >
                    <FlexBetween gap="3rem" >
                        <Typography 
                            fontWeight="bold"
                            sx={{width: "fit-content"}}
                            pr="4rem"
                        >
                            { `${contactInfo.firstName} ${contactInfo.lastName}`} 
                        </Typography>
                    </FlexBetween>
                    <FlexBetween gap="3rem">
                        <Typography>
                            {contactInfo.email}
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            {contactInfo.company}
                        </Typography>
                    </FlexBetween>

                    {/* Edit Button */}
                    
                    <FlexBetween gap="3rem">
                        <Fab size="medium" variant="extended" color="primary" >
                            <EditIcon />
                            Details
                        </Fab>
                    </FlexBetween>
                </Box>
            </FlexBetween>
        </JobPostWrapper>
    )
};

export default ContactComponent;