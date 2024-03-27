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

const Contact = ({
    contactId,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const jobPostId = useParams().jobPostId;
    const contacts = useSelector((state) => state.jobPostContacts);
    const contactInfo = contacts.find((contact) => contact._id === contactId);



    /* Toggles */
    const handleChangeToggle = async () => {
        const response = await fetch(`http://localhost:3001/contacts/isContacted/${contactId}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setJobPostContact({ jobPostContact: data }));
    } 

    const handleEdit = () => {
        navigate(`/jobPostDetails/${jobPostId}/contacts/${contactId}`);
    }

    return(
        <JobPostWrapper>
            <FlexBetween>
                <Box 
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 2fr))"
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

                    {/* Toggle */}

                    <FlexBetween>
                        <FormControlLabel
                                control={
                                    <ToggleSwitch checked={contactInfo.isContacted} onChange={handleChangeToggle}  name="isContacted" />
                                }
                                label= "Contacted"
                                labelPlacement="top"
                        >
                        </FormControlLabel>
                    </FlexBetween>

                    {/* Edit Button */}
                    
                    <FlexBetween gap="3rem">
                        <Fab size="medium" variant="extended" color="primary" onClick={handleEdit}>
                            <EditIcon />
                            Details
                        </Fab>
                    </FlexBetween>
                </Box>
            </FlexBetween>
        </JobPostWrapper>
    )
};

export default Contact;