import Navbar from "scenes/navbar/navbar";
import { 
    Typography, 
    Box
} from "@mui/material";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";

const ContactDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const contactId = params.contactId;
    const contacts = useSelector((state) => state.jobPostContacts);
    const contactInfo = contacts.find((contact) => contact._id === contactId);

    return (
        <Box>
            <Navbar page="contactDetails"/>
            <Box>
                <Typography>
                    Contact Details
                </Typography>
                <Typography>
                    {contactInfo.firstName} 
                    {contactInfo.lastName} 
                    {contactInfo.email} 
                    {contactInfo.phoneNumber} 
                    {contactInfo.profileLinks}
                    {contactInfo.notes}
                </Typography>
            </Box>
        </Box>
        
    )
}

export default ContactDetails;